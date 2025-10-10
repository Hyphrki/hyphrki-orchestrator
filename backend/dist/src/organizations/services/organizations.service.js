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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../database/repositories/user.repository");
const prisma_service_1 = require("../../database/prisma.service");
let OrganizationsService = class OrganizationsService {
    prisma;
    userRepository;
    constructor(prisma, userRepository) {
        this.prisma = prisma;
        this.userRepository = userRepository;
    }
    async getUserOrganizations(userId) {
        const organizations = await this.userRepository.getUserOrganizations(userId);
        return {
            organizations: organizations.map((org) => ({
                id: org.id,
                name: org.name,
                slug: org.slug,
                subscription_tier: 'basic',
                role: org.role,
                created_at: org.joinedAt,
            })),
        };
    }
    async createOrganization(userId, createData) {
        const existingOrg = await this.prisma.organization.findUnique({
            where: { slug: createData.slug },
        });
        if (existingOrg) {
            throw new common_1.ConflictException('Organization slug already exists');
        }
        const organization = await this.prisma.organization.create({
            data: {
                name: createData.name,
                slug: createData.slug,
                subscriptionTier: createData.subscription_tier || 'basic',
            },
        });
        await this.prisma.organizationMember.create({
            data: {
                organizationId: organization.id,
                userId: userId,
                role: 'owner',
            },
        });
        return {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
            subscription_tier: organization.subscriptionTier,
            created_at: organization.createdAt,
        };
    }
    async getOrganizationById(userId, organizationId) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: {
                organizationId: organizationId,
                userId: userId,
            },
            include: {
                organization: {
                    include: {
                        members: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        email: true,
                                        firstName: true,
                                        lastName: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!membership) {
            throw new common_1.NotFoundException('Organization not found or access denied');
        }
        const org = membership.organization;
        return {
            id: org.id,
            name: org.name,
            slug: org.slug,
            subscription_tier: org.subscriptionTier,
            members: org.members.map((member) => ({
                id: member.user.id,
                email: member.user.email,
                first_name: member.user.firstName,
                last_name: member.user.lastName,
                role: member.role,
                joined_at: member.joinedAt,
            })),
            created_at: org.createdAt,
        };
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_repository_1.UserRepository])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map