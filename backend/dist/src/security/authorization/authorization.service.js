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
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const authorization_types_1 = require("./authorization.types");
let AuthorizationService = class AuthorizationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkPermission(userId, permission, resourceType, resourceId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    organizationMembers: {
                        include: {
                            organization: true,
                        },
                    },
                },
            });
            if (!user) {
                return {
                    allowed: false,
                    reason: 'User not found',
                };
            }
            const userRoles = await this.getUserRoles(userId);
            const hasPermission = await this.hasPermission(userRoles, permission, resourceType, resourceId, userId);
            if (!hasPermission) {
                const userPermissions = await this.getUserPermissions(userId);
                return {
                    allowed: false,
                    reason: 'Insufficient permissions',
                    requiredPermissions: [permission],
                    userPermissions,
                };
            }
            return { allowed: true };
        }
        catch (error) {
            return {
                allowed: false,
                reason: `Authorization check failed: ${error.message}`,
            };
        }
    }
    async getUserPermissions(userId) {
        const userRoles = await this.getUserRoles(userId);
        const permissions = new Set();
        userRoles.forEach((role) => {
            const rolePermissions = authorization_types_1.DEFAULT_ROLE_PERMISSIONS[role] || [];
            rolePermissions.forEach((permission) => permissions.add(permission));
        });
        return Array.from(permissions);
    }
    async getUserRoles(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                organizationMembers: {
                    include: {
                        organization: true,
                    },
                },
            },
        });
        if (!user) {
            return [];
        }
        const roles = [authorization_types_1.UserRole.USER];
        for (const membership of user.organizationMembers) {
            if (membership.role === 'owner' || membership.role === 'admin') {
                roles.push(authorization_types_1.UserRole.ORG_ADMIN);
            }
            else if (membership.role === 'member') {
                roles.push(authorization_types_1.UserRole.ORG_MEMBER);
            }
        }
        if (user.email?.endsWith('@orchestrator-platform.com') ||
            user.subscriptionTier === 'enterprise') {
            roles.push(authorization_types_1.UserRole.SUPER_ADMIN);
        }
        return [...new Set(roles)];
    }
    async hasPermission(userRoles, permission, resourceType, resourceId, userId) {
        for (const role of userRoles) {
            const rolePermissions = authorization_types_1.DEFAULT_ROLE_PERMISSIONS[role] || [];
            if (rolePermissions.includes(permission)) {
                if (await this.checkResourceAccess(userId, role, permission, resourceType, resourceId)) {
                    return true;
                }
            }
        }
        return false;
    }
    async checkResourceAccess(userId, userRole, permission, resourceType, resourceId) {
        if (!resourceType || !resourceId) {
            return true;
        }
        switch (resourceType) {
            case authorization_types_1.ResourceType.ORGANIZATION:
                return this.checkOrganizationAccess(userId, userRole, resourceId);
            case authorization_types_1.ResourceType.USER:
                return this.checkUserAccess(userId, userRole, resourceId);
            case authorization_types_1.ResourceType.AGENT:
                return this.checkAgentAccess(userId, userRole, resourceId);
            case authorization_types_1.ResourceType.WORKFLOW:
                return this.checkWorkflowAccess(userId, userRole, resourceId);
            case authorization_types_1.ResourceType.EXECUTION:
                return this.checkExecutionAccess(userId, userRole, resourceId);
            default:
                return true;
        }
    }
    async checkOrganizationAccess(userId, userRole, organizationId) {
        if (userRole === authorization_types_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        const membership = await this.prisma.organizationMember.findFirst({
            where: {
                userId,
                organizationId,
            },
        });
        return !!membership;
    }
    async checkUserAccess(userId, userRole, targetUserId) {
        if (userRole === authorization_types_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        if (userId === targetUserId) {
            return true;
        }
        const userMemberships = await this.prisma.organizationMember.findMany({
            where: { userId },
        });
        const targetMemberships = await this.prisma.organizationMember.findMany({
            where: { userId: targetUserId },
        });
        const commonOrgIds = userMemberships
            .map((m) => m.organizationId)
            .filter((orgId) => targetMemberships.some((m) => m.organizationId === orgId));
        return commonOrgIds.length > 0 && userRole === authorization_types_1.UserRole.ORG_ADMIN;
    }
    async checkAgentAccess(userId, userRole, agentId) {
        if (userRole === authorization_types_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        const agent = await this.prisma.agent.findUnique({
            where: { id: agentId },
        });
        if (!agent) {
            return false;
        }
        if (agent.ownerType === 'user' && agent.ownerId === userId) {
            return true;
        }
        if (agent.ownerType === 'organization') {
            const membership = await this.prisma.organizationMember.findFirst({
                where: {
                    userId,
                    organizationId: agent.ownerId,
                },
            });
            if (!membership) {
                return false;
            }
            if (userRole === authorization_types_1.UserRole.ORG_ADMIN) {
                return true;
            }
            if (userRole === authorization_types_1.UserRole.ORG_MEMBER) {
                return true;
            }
        }
        return false;
    }
    async checkWorkflowAccess(userId, userRole, workflowId) {
        if (userRole === authorization_types_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        const workflow = await this.prisma.workflow.findUnique({
            where: { id: workflowId },
            include: { agent: true },
        });
        if (!workflow) {
            return false;
        }
        return this.checkAgentAccess(userId, userRole, workflow.agentId);
    }
    async checkExecutionAccess(userId, userRole, executionId) {
        if (userRole === authorization_types_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        const execution = await this.prisma.workflowExecution.findUnique({
            where: { id: executionId },
            include: {
                workflow: {
                    include: {
                        agent: true,
                    },
                },
            },
        });
        if (!execution) {
            return false;
        }
        return this.checkAgentAccess(userId, userRole, execution.agentId);
    }
    createGuard(permission, resourceType) {
        return async (userId, resourceId) => {
            const result = await this.checkPermission(userId, permission, resourceType, resourceId);
            if (!result.allowed) {
                throw new common_1.ForbiddenException(result.reason || 'Access denied');
            }
            return true;
        };
    }
    validateRoleHierarchy(userRole, requiredRole) {
        const userRoleHierarchy = authorization_types_1.ROLE_HIERARCHY[userRole] || [];
        return userRoleHierarchy.includes(requiredRole);
    }
    getRoleCapabilities(role) {
        return {
            role,
            permissions: authorization_types_1.DEFAULT_ROLE_PERMISSIONS[role] || [],
            hierarchy: authorization_types_1.ROLE_HIERARCHY[role] || [],
        };
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map