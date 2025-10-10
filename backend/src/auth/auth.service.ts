import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../database/prisma.service';
import { JwtPayload } from './strategies/jwt.strategy';

interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionTier: string;
  organizations: Array<{
    id: string;
    name: string;
    role: string;
  }>;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Hash password using bcrypt
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT access token
  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  // Generate JWT refresh token
  generateRefreshToken(payload: JwtPayload): string {
    const refreshPayload = { ...payload };
    const refreshExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_EXPIRES_IN',
      '7d',
    );
    return this.jwtService.sign(refreshPayload, {
      expiresIn: refreshExpiresIn,
    });
  }

  // Generate both access and refresh tokens
  async generateTokens(user: UserInfo): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600, // 1 hour
    };
  }

  // Register a new user
  async registerUser(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<UserInfo> {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user (all users in admin portal are admins by default)
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName: firstName || '',
        lastName: lastName || '',
        isActive: true,
        subscriptionTier: 'FREE',
        role: 'admin', // All orchestrator-admin users are admins
      },
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });

    return this.transformUserToUserInfo(user);
  }

  // Validate user credentials
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserInfo | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user || !user.passwordHash) {
      return null;
    }

    const isPasswordValid = await this.verifyPassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      return null;
    }

    if (!user.isActive) {
      return null;
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionTier: user.subscriptionTier,
      organizations: user.organizationMembers.map((member: any) => ({
        id: member.organization.id,
        name: member.organization.name,
        role: member.role,
      })),
    };
  }

  // Transform user object to UserInfo format
  private transformUserToUserInfo(user: any): UserInfo {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionTier: user.subscriptionTier,
      organizations: user.organizationMembers.map((member: any) => ({
        id: member.organization.id,
        name: member.organization.name,
        role: member.role,
      })),
    };
  }

  // Validate refresh token and get new tokens
  async refreshTokens(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  } | null> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          organizationMembers: {
            include: {
              organization: true,
            },
          },
        },
      });

      if (!user || !user.isActive) {
        return null;
      }

      const userInfo = this.transformUserToUserInfo(user);
      return this.generateTokens(userInfo);
    } catch (error) {
      return null;
    }
  }
}
