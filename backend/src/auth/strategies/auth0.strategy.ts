import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const domain = configService.get<string>('AUTH0_DOMAIN') || '';
    const clientID = configService.get<string>('AUTH0_CLIENT_ID') || '';
    const clientSecret = configService.get<string>('AUTH0_CLIENT_SECRET') || '';
    const frontendUrl =
      configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

    super({
      domain,
      clientID,
      clientSecret,
      callbackURL: `${frontendUrl}/auth/callback`,
      state: true,
      passReqToCallback: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: any,
    done: Function,
  ) {
    try {
      const { id, emails, name } = profile;

      // Find or create user based on Auth0 profile
      let user = await this.prisma.user.findUnique({
        where: { email: emails[0].value },
      });

      if (!user) {
        // Create new user from Auth0 profile
        const [firstName, ...lastNameParts] = name?.givenName
          ? [name.givenName, name.familyName]
          : name?.displayName?.split(' ') || ['Unknown', 'User'];

        user = await this.prisma.user.create({
          data: {
            email: emails[0].value,
            firstName,
            lastName: lastNameParts.join(' ') || 'User',
            passwordHash: '', // Auth0 users don't need local passwords
            emailVerified: emails[0].verified || false,
          },
        });
      }

      // Update last login
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      const userWithOrgs = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: {
          organizationMembers: {
            include: {
              organization: true,
            },
          },
        },
      });

      if (!userWithOrgs) {
        return done(new Error('User not found'), null);
      }

      return done(null, {
        id: userWithOrgs.id,
        email: userWithOrgs.email,
        firstName: userWithOrgs.firstName,
        lastName: userWithOrgs.lastName,
        subscriptionTier: userWithOrgs.subscriptionTier,
        organizations: userWithOrgs.organizationMembers.map((member: any) => ({
          id: member.organization.id,
          name: member.organization.name,
          role: member.role,
        })),
        auth0Id: id,
        accessToken,
      });
    } catch (error) {
      return done(error, null);
    }
  }
}
