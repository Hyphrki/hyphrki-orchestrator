"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const database_module_1 = require("../database/database.module");
const prisma_service_1 = require("../database/prisma.service");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./controllers/auth.controller");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const auth0_strategy_1 = require("./strategies/auth0.strategy");
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot() {
        return {
            module: AuthModule_1,
            imports: [
                database_module_1.DatabaseModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.registerAsync({
                    useFactory: (configService) => ({
                        secret: configService.get('JWT_SECRET') || 'fallback-secret',
                        signOptions: {
                            expiresIn: configService.get('JWT_EXPIRES_IN', '1h'),
                        },
                    }),
                    inject: [config_1.ConfigService],
                }),
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [
                auth_service_1.AuthService,
                jwt_strategy_1.JwtStrategy,
                {
                    provide: auth0_strategy_1.Auth0Strategy,
                    useFactory: (configService, prisma) => {
                        const clientId = configService.get('AUTH0_CLIENT_ID');
                        if (clientId && clientId.trim() !== '') {
                            return new auth0_strategy_1.Auth0Strategy(configService, prisma);
                        }
                        return null;
                    },
                    inject: [config_1.ConfigService, prisma_service_1.PrismaService],
                },
            ],
            exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        };
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({})
], AuthModule);
//# sourceMappingURL=auth.module.js.map