"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const login_dto_1 = require("../dto/login.dto");
const register_dto_1 = require("../dto/register.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const authorization_decorators_1 = require("../../security/authorization/authorization.decorators");
const authorization_types_1 = require("../../security/authorization/authorization.types");
const skip_auth_decorator_1 = require("../decorators/skip-auth.decorator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        try {
            const user = await this.authService.registerUser(registerDto.email, registerDto.password, registerDto.firstName, registerDto.lastName);
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
        catch (error) {
            return {
                error: {
                    code: 'REGISTRATION_ERROR',
                    message: error.message || 'Registration failed',
                },
            };
        }
    }
    async login(loginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
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
    async refresh(refreshTokenDto) {
        const tokens = await this.authService.refreshTokens(refreshTokenDto.refresh_token);
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
    async logout() {
        return { message: 'Successfully logged out' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.AUTH_MANAGEMENT[0]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, authorization_decorators_1.Resource)(authorization_types_1.ResourceType.AUTH),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map