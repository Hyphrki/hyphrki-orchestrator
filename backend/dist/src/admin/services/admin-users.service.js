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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let AdminUsersService = class AdminUsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listUsers(filters) {
        const { search, role, status, subscriptionTier, page = 1, limit = 20 } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (role) {
            where.role = role;
        }
        if (status) {
            if (status === 'active') {
                where.isActive = true;
                where.suspendedAt = null;
            }
            else if (status === 'suspended') {
                where.suspendedAt = { not: null };
            }
        }
        if (subscriptionTier) {
            where.subscriptionTier = subscriptionTier;
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    subscriptionTier: true,
                    role: true,
                    isActive: true,
                    suspendedAt: true,
                    createdAt: true,
                    lastLoginAt: true,
                    emailVerified: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);
        const formattedUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            subscription_tier: user.subscriptionTier,
            role: user.role,
            status: user.suspendedAt ? 'suspended' : 'active',
            created_at: user.createdAt.toISOString(),
            last_login_at: user.lastLoginAt?.toISOString(),
            email_verified: user.emailVerified,
            suspended_at: user.suspendedAt?.toISOString(),
        }));
        return {
            users: formattedUsers,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUserDetail(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                assignedWorkflows: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        createdAt: true,
                    },
                },
                activities: {
                    take: 10,
                    orderBy: { timestamp: 'desc' },
                },
                assignedAgents: {
                    include: {
                        agentTemplate: {
                            select: {
                                id: true,
                                name: true,
                                category: true,
                                publicationStatus: true,
                            },
                        },
                    },
                },
                deployments: {
                    include: {
                        agentTemplate: {
                            select: {
                                id: true,
                                name: true,
                                category: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            subscription_tier: user.subscriptionTier,
            role: user.role,
            status: user.suspendedAt ? 'suspended' : 'active',
            created_at: user.createdAt.toISOString(),
            last_login_at: user.lastLoginAt?.toISOString(),
            email_verified: user.emailVerified,
            suspended_at: user.suspendedAt?.toISOString(),
            assigned_workflows: user.assignedWorkflows.map(w => ({
                id: w.id,
                name: w.name,
                description: w.description,
                created_at: w.createdAt.toISOString(),
            })),
            recent_activities: user.activities.map(a => ({
                id: a.id,
                action: a.action,
                timestamp: a.timestamp.toISOString(),
                metadata: a.metadata,
            })),
            assigned_agents: user.assignedAgents.map(a => ({
                id: a.id,
                agent: a.agentTemplate,
                assigned_at: a.assignedAt.toISOString(),
                custom_config: a.customConfig,
            })),
            deployments: user.deployments.map(d => ({
                id: d.id,
                agent: d.agentTemplate,
                deployment_name: d.deploymentName,
                status: d.deploymentStatus,
                created_at: d.createdAt.toISOString(),
                total_executions: d.totalExecutions,
                last_execution_at: d.lastExecutionAt?.toISOString(),
            })),
        };
    }
    async updateUser(id, updateData) {
        const user = await this.prisma.user.update({
            where: { id },
            data: updateData,
        });
        await this.prisma.userActivity.create({
            data: {
                userId: id,
                action: 'profile_updated',
                metadata: { updated_fields: Object.keys(updateData) },
            },
        });
        return this.formatUser(user);
    }
    async suspendUser(id) {
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                suspendedAt: new Date(),
                isActive: false,
            },
        });
        await this.prisma.userActivity.create({
            data: {
                userId: id,
                action: 'user_suspended',
                metadata: { suspended_by: 'admin' },
            },
        });
        return this.formatUser(user);
    }
    async activateUser(id) {
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                suspendedAt: null,
                isActive: true,
            },
        });
        await this.prisma.userActivity.create({
            data: {
                userId: id,
                action: 'user_activated',
                metadata: { activated_by: 'admin' },
            },
        });
        return this.formatUser(user);
    }
    async updateUserRole(id, role) {
        const user = await this.prisma.user.update({
            where: { id },
            data: { role },
        });
        await this.prisma.userActivity.create({
            data: {
                userId: id,
                action: 'role_changed',
                metadata: { new_role: role, changed_by: 'admin' },
            },
        });
        return this.formatUser(user);
    }
    async assignWorkflow(userId, workflowId) {
        const workflow = await this.prisma.workflow.update({
            where: { id: workflowId },
            data: { assignedToUserId: userId },
        });
        await this.prisma.userActivity.create({
            data: {
                userId,
                action: 'workflow_assigned',
                metadata: { workflow_id: workflowId, workflow_name: workflow.name },
            },
        });
        return { success: true, workflow };
    }
    async getUserWorkflows(userId) {
        return this.prisma.workflow.findMany({
            where: { assignedToUserId: userId },
            select: {
                id: true,
                name: true,
                description: true,
                workflowType: true,
                framework: true,
                version: true,
                createdAt: true,
                isActive: true,
            },
        });
    }
    async getUserAssignedAgents(userId) {
        return this.prisma.userAssignedAgent.findMany({
            where: { userId },
            include: {
                agentTemplate: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true,
                        tags: true,
                        version: true,
                        publicationStatus: true,
                    },
                },
            },
        });
    }
    async getUserDeployments(userId) {
        return this.prisma.userAgentDeployment.findMany({
            where: { userId },
            include: {
                agentTemplate: {
                    select: {
                        id: true,
                        name: true,
                        category: true,
                        version: true,
                    },
                },
                executions: {
                    take: 5,
                    orderBy: { startedAt: 'desc' },
                    select: {
                        id: true,
                        status: true,
                        startedAt: true,
                        stoppedAt: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    formatUser(user) {
        return {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            subscription_tier: user.subscriptionTier,
            role: user.role,
            status: user.suspendedAt ? 'suspended' : 'active',
            created_at: user.createdAt.toISOString(),
            last_login_at: user.lastLoginAt?.toISOString(),
            email_verified: user.emailVerified,
            suspended_at: user.suspendedAt?.toISOString(),
        };
    }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map