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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserRepository = class UserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                organizationMembers: {
                    include: {
                        organization: true,
                    },
                },
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                organizationMembers: {
                    include: {
                        organization: true,
                    },
                },
            },
        });
    }
    async create(data) {
        return this.prisma.user.create({
            data,
            include: {
                organizationMembers: {
                    include: {
                        organization: true,
                    },
                },
            },
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
            include: {
                organizationMembers: {
                    include: {
                        organization: true,
                    },
                },
            },
        });
    }
    async delete(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async findMany(params) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                organizationMembers: {
                    include: {
                        organization: true,
                    },
                },
            },
        });
    }
    async count(where) {
        return this.prisma.user.count({ where });
    }
    async getUserOrganizations(userId) {
        const user = await this.findById(userId);
        if (!user) {
            return [];
        }
        return user.organizationMembers.map((member) => ({
            id: member.organization.id,
            name: member.organization.name,
            slug: member.organization.slug,
            role: member.role,
            joinedAt: member.joinedAt,
        }));
    }
    async updateLastLogin(id) {
        return this.prisma.user.update({
            where: { id },
            data: { lastLoginAt: new Date() },
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map