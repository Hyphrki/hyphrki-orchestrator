import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { PrismaService } from '../database/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Auth0Strategy } from './strategies/auth0.strategy';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        DatabaseModule,
        PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'fallback-secret',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h') as any,
        },
      }),
      inject: [ConfigService],
    }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        // Conditionally provide Auth0Strategy only if credentials are configured
        {
          provide: Auth0Strategy,
          useFactory: (configService: ConfigService, prisma: PrismaService) => {
            const clientId = configService.get<string>('AUTH0_CLIENT_ID');

            // Only instantiate Auth0Strategy if Auth0 is configured
            if (clientId && clientId.trim() !== '') {
              return new Auth0Strategy(configService, prisma);
            }

            // Return null if Auth0 is not configured - this makes the strategy optional
            return null;
          },
          inject: [ConfigService, PrismaService],
        },
      ],
      exports: [AuthService, JwtStrategy],
    };
  }
}
