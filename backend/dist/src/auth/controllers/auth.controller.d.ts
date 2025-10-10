import { AuthService } from '../auth.service';
import { LoginDto, RefreshTokenDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
        token_type: string;
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            subscription_tier: string;
        };
        error?: undefined;
    } | {
        error: {
            code: string;
            message: any;
        };
        access_token?: undefined;
        refresh_token?: undefined;
        expires_in?: undefined;
        token_type?: undefined;
        user?: undefined;
    }>;
    login(loginDto: LoginDto): Promise<{
        error: {
            code: string;
            message: string;
        };
        access_token?: undefined;
        refresh_token?: undefined;
        expires_in?: undefined;
        token_type?: undefined;
        user?: undefined;
    } | {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        token_type: string;
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            subscription_tier: string;
        };
        error?: undefined;
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        error: {
            code: string;
            message: string;
        };
        access_token?: undefined;
        expires_in?: undefined;
        token_type?: undefined;
    } | {
        access_token: string;
        expires_in: number;
        token_type: string;
        error?: undefined;
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
