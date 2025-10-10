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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../database/repositories/user.repository");
const sync_service_1 = require("../../websocket/sync.service");
const prisma_service_1 = require("../../database/prisma.service");
let UsersService = class UsersService {
    userRepository;
    syncService;
    prisma;
    constructor(userRepository, syncService, prisma) {
        this.userRepository = userRepository;
        this.syncService = syncService;
        this.prisma = prisma;
    }
    async getCurrentUser(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            subscription_tier: user.subscriptionTier,
            created_at: user.createdAt,
            last_login_at: user.lastLoginAt,
            email_verified: user.emailVerified,
        };
    }
    async updateCurrentUser(userId, updateData) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatePayload = {
            ...(updateData.first_name && { firstName: updateData.first_name }),
            ...(updateData.last_name && { lastName: updateData.last_name }),
        };
        const updatedUser = await this.userRepository.update(userId, updatePayload);
        const formattedUser = {
            id: updatedUser.id,
            email: updatedUser.email,
            first_name: updatedUser.firstName,
            last_name: updatedUser.lastName,
            subscription_tier: updatedUser.subscriptionTier,
            updated_at: updatedUser.updatedAt,
        };
        this.syncService.emitToUser(userId, {
            entityType: 'user_profile',
            entityId: userId,
            operation: 'update',
            changes: formattedUser,
            sourcePortal: 'user',
        });
        return formattedUser;
    }
    async listAllUsers(filters) {
        const page = filters.page || 1;
        const limit = Math.min(filters.limit || 20, 100);
        const skip = (page - 1) * limit;
        const where = {};
        if (filters.search) {
            where.OR = [
                { firstName: { contains: filters.search, mode: 'insensitive' } },
                { lastName: { contains: filters.search, mode: 'insensitive' } },
                { email: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        if (filters.role) {
            where.role = filters.role;
        }
        if (filters.status) {
            if (filters.status === 'active') {
                where.suspendedAt = null;
            }
            else if (filters.status === 'suspended') {
                where.suspendedAt = { not: null };
            }
        }
        if (filters.subscriptionTier) {
            where.subscriptionTier = filters.subscriptionTier;
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    subscriptionTier: true,
                    createdAt: true,
                    lastLoginAt: true,
                    emailVerified: true,
                    suspendedAt: true,
                    role: true,
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        const formattedUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            subscription_tier: user.subscriptionTier,
            created_at: user.createdAt,
            last_login_at: user.lastLoginAt,
            email_verified: user.emailVerified,
            suspended_at: user.suspendedAt,
            role: user.role || 'user',
            status: user.suspendedAt ? 'suspended' : 'active',
        }));
        return {
            users: formattedUsers,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                subscriptionTier: true,
                createdAt: true,
                lastLoginAt: true,
                emailVerified: true,
                suspendedAt: true,
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const assignedWorkflows = await this.prisma.workflow.findMany({
            where: { assignedToUserId: id },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
            },
        });
        const activities = await this.prisma.userActivity.findMany({
            where: { userId: id },
            orderBy: { timestamp: 'desc' },
            take: 10,
        });
        return {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            subscription_tier: user.subscriptionTier,
            created_at: user.createdAt,
            last_login_at: user.lastLoginAt,
            email_verified: user.emailVerified,
            suspended_at: user.suspendedAt,
            role: user.role || 'user',
            status: user.suspendedAt ? 'suspended' : 'active',
            assigned_workflows: assignedWorkflows,
            recent_activities: activities,
        };
    }
    async updateUser(id, updateData) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatePayload = {};
        if (updateData.first_name !== undefined)
            updatePayload.firstName = updateData.first_name;
        if (updateData.last_name !== undefined)
            updatePayload.lastName = updateData.last_name;
        if (updateData.subscription_tier !== undefined)
            updatePayload.subscriptionTier = updateData.subscription_tier;
        if (updateData.role !== undefined)
            updatePayload.role = updateData.role;
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updatePayload,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                subscriptionTier: true,
                role: true,
                updatedAt: true,
            },
        });
        await this.logUserActivity(id, 'profile_updated', {
            updatedFields: Object.keys(updatePayload),
            updatedBy: 'admin',
        });
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            first_name: updatedUser.firstName,
            last_name: updatedUser.lastName,
            subscription_tier: updatedUser.subscriptionTier,
            role: updatedUser.role,
            updated_at: updatedUser.updatedAt,
        };
    }
    async suspendUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.suspendedAt) {
            throw new common_1.BadRequestException('User is already suspended');
        }
        const suspendedUser = await this.prisma.user.update({
            where: { id },
            data: { suspendedAt: new Date() },
        });
        await this.logUserActivity(id, 'user_suspended', {
            suspendedAt: suspendedUser.suspendedAt,
            suspendedBy: 'admin',
        });
        return {
            id: suspendedUser.id,
            email: suspendedUser.email,
            suspended_at: suspendedUser.suspendedAt,
        };
    }
    async activateUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.suspendedAt) {
            throw new common_1.BadRequestException('User is not suspended');
        }
        const activatedUser = await this.prisma.user.update({
            where: { id },
            data: { suspendedAt: null },
        });
        await this.logUserActivity(id, 'user_activated', {
            activatedAt: new Date(),
            activatedBy: 'admin',
        });
        return {
            id: activatedUser.id,
            email: activatedUser.email,
            suspended_at: null,
        };
    }
    async updateUserRole(id, role) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!['user', 'admin'].includes(role)) {
            throw new common_1.BadRequestException('Invalid role. Must be "user" or "admin"');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { role },
        });
        await this.logUserActivity(id, 'role_changed', {
            oldRole: user.role,
            newRole: role,
            changedBy: 'admin',
        });
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
        };
    }
    async assignPersonalizedWorkflow(userId, workflowId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const workflow = await this.prisma.workflow.findUnique({ where: { id: workflowId } });
        if (!workflow) {
            throw new common_1.NotFoundException('Workflow not found');
        }
        const existingAssignment = await this.prisma.workflow.findFirst({
            where: { id: workflowId, assignedToUserId: userId },
        });
        if (existingAssignment) {
            throw new common_1.BadRequestException('Workflow is already assigned to this user');
        }
        const updatedWorkflow = await this.prisma.workflow.update({
            where: { id: workflowId },
            data: { assignedToUserId: userId },
        });
        await this.logUserActivity(userId, 'workflow_assigned', {
            workflowId: workflowId,
            workflowName: workflow.name,
            assignedBy: 'admin',
        });
        return {
            workflow_id: updatedWorkflow.id,
            workflow_name: updatedWorkflow.name,
            assigned_to_user: userId,
        };
    }
    async getUserAssignedWorkflows(userId) {
        const workflows = await this.prisma.workflow.findMany({
            where: { assignedToUserId: userId },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return workflows;
    }
    async logUserActivity(userId, action, metadata) {
        try {
            await this.prisma.userActivity.create({
                data: {
                    userId,
                    action,
                    metadata,
                    timestamp: new Date(),
                },
            });
        }
        catch (error) {
            console.error('Failed to log user activity:', error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        sync_service_1.SyncService,
        prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map