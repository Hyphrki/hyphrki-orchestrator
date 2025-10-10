import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto, RefreshTokenDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  AuthorizationGuard,
  Resource,
  RequirePermissions,
  PermissionGroups,
} from '../../security/authorization/authorization.decorators';
import { ResourceType } from '../../security/authorization/authorization.types';
import { SkipAuth } from '../decorators/skip-auth.decorator';

@Controller('auth')
@UseGuards(JwtAuthGuard)
@Resource(ResourceType.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.authService.registerUser(
        registerDto.email,
        registerDto.password,
        registerDto.firstName,
        registerDto.lastName,
      );

      const tokens = await this.authService.generateTokens(user);

      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
        token_type: 'Bearer',
        user: {
          id: user.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          subscription_tier: user.subscriptionTier,
        },
      };
    } catch (error) {
      return {
        error: {
          code: 'REGISTRATION_ERROR',
          message: error.message || 'Registration failed',
        },
      };
    }
  }

  @Post('login')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      return {
        error: { code: 'AUTHENTICATION_ERROR', message: 'Invalid credentials' },
      };
    }

    const tokens = await this.authService.generateTokens(user);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
      token_type: 'Bearer',
      user: {
        id: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        subscription_tier: user.subscriptionTier,
      },
    };
  }

  @Post('refresh')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refreshTokens(
      refreshTokenDto.refresh_token,
    );
    if (!tokens) {
      return {
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Invalid refresh token',
        },
      };
    }

    return {
      access_token: tokens.access_token,
      expires_in: tokens.expires_in,
      token_type: 'Bearer',
    };
  }

  @Post('logout')
  @RequirePermissions(PermissionGroups.AUTH_MANAGEMENT[0]) // auth:logout
  @HttpCode(HttpStatus.OK)
  async logout() {
    // In a stateless JWT system, logout is handled client-side
    // by removing the token from storage
    return { message: 'Successfully logged out' };
  }
}
