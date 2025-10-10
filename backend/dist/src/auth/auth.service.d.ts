import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
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
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    generateAccessToken(payload: JwtPayload): string;
    generateRefreshToken(payload: JwtPayload): string;
    generateTokens(user: UserInfo): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
    }>;
    registerUser(email: string, password: string, firstName?: string, lastName?: string): Promise<UserInfo>;
    validateUser(email: string, password: string): Promise<UserInfo | null>;
    private transformUserToUserInfo;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
    } | null>;
}
export {};
