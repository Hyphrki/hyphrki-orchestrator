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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth0Strategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_auth0_1 = require("passport-auth0");
const prisma_service_1 = require("../../database/prisma.service");
let Auth0Strategy = class Auth0Strategy extends (0, passport_1.PassportStrategy)(passport_auth0_1.Strategy, 'auth0') {
    configService;
    prisma;
    constructor(configService, prisma) {
        const domain = configService.get('AUTH0_DOMAIN') || '';
        const clientID = configService.get('AUTH0_CLIENT_ID') || '';
        const clientSecret = configService.get('AUTH0_CLIENT_SECRET') || '';
        const frontendUrl = configService.get('FRONTEND_URL') || 'http://localhost:3000';
        super({
            domain,
            clientID,
            clientSecret,
            callbackURL: `${frontendUrl}/auth/callback`,
            state: true,
            passReqToCallback: true,
        });
        this.configService = configService;
        this.prisma = prisma;
    }
    async validate(accessToken, refreshToken, extraParams, profile, done) {
        try {
            const { id, emails, name } = profile;
            let user = await this.prisma.user.findUnique({
                where: { email: emails[0].value },
            });
            if (!user) {
                const [firstName, ...lastNameParts] = name?.givenName
                    ? [name.givenName, name.familyName]
                    : name?.displayName?.split(' ') || ['Unknown', 'User'];
                user = await this.prisma.user.create({
                    data: {
                        email: emails[0].value,
                        firstName,
                        lastName: lastNameParts.join(' ') || 'User',
                        passwordHash: '',
                        emailVerified: emails[0].verified || false,
                    },
                });
            }
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
                organizations: userWithOrgs.organizationMembers.map((member) => ({
                    id: member.organization.id,
                    name: member.organization.name,
                    role: member.role,
                })),
                auth0Id: id,
                accessToken,
            });
        }
        catch (error) {
            return done(error, null);
        }
    }
};
exports.Auth0Strategy = Auth0Strategy;
exports.Auth0Strategy = Auth0Strategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], Auth0Strategy);
//# sourceMappingURL=auth0.strategy.js.map