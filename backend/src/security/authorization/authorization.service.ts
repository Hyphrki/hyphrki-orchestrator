import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  UserRole,
  Permission,
  ResourceType,
  AuthorizationContext,
  AuthorizationResult,
  DEFAULT_ROLE_PERMISSIONS,
  ROLE_HIERARCHY,
  AccessControlEntry,
} from './authorization.types';

@Injectable()
export class AuthorizationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Check if a user has permission to perform an action on a resource
   */
  async checkPermission(
    userId: string,
    permission: Permission,
    resourceType?: ResourceType,
    resourceId?: string,
  ): Promise<AuthorizationResult> {
    try {
      // Get user with roles and organization context
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

      // Get user roles
      const userRoles = await this.getUserRoles(userId);

      // Check if user has the required permission
      const hasPermission = await this.hasPermission(
        userRoles,
        permission,
        resourceType,
        resourceId,
        userId,
      );

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
    } catch (error) {
      return {
        allowed: false,
        reason: `Authorization check failed: ${error.message}`,
      };
    }
  }

  /**
   * Get all permissions for a user
   */
  async getUserPermissions(userId: string): Promise<Permission[]> {
    const userRoles = await this.getUserRoles(userId);

    const permissions = new Set<Permission>();

    // Add permissions from all user roles
    userRoles.forEach((role) => {
      const rolePermissions = DEFAULT_ROLE_PERMISSIONS[role] || [];
      rolePermissions.forEach((permission) => permissions.add(permission));
    });

    return Array.from(permissions);
  }

  /**
   * Get user roles
   */
  async getUserRoles(userId: string): Promise<UserRole[]> {
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

    const roles: UserRole[] = [UserRole.USER]; // Everyone has basic user role

    // Check for organization roles
    for (const membership of user.organizationMembers) {
      if (membership.role === 'owner' || membership.role === 'admin') {
        roles.push(UserRole.ORG_ADMIN);
      } else if (membership.role === 'member') {
        roles.push(UserRole.ORG_MEMBER);
      }
    }

    // Check for super admin (could be based on email or special flag)
    if (
      user.email?.endsWith('@orchestrator-platform.com') ||
      user.subscriptionTier === 'enterprise'
    ) {
      roles.push(UserRole.SUPER_ADMIN);
    }

    return [...new Set(roles)]; // Remove duplicates
  }

  /**
   * Check if user roles include the required permission
   */
  private async hasPermission(
    userRoles: UserRole[],
    permission: Permission,
    resourceType?: ResourceType,
    resourceId?: string,
    userId?: string,
  ): Promise<boolean> {
    // Check if any of the user's roles have the permission
    for (const role of userRoles) {
      const rolePermissions = DEFAULT_ROLE_PERMISSIONS[role] || [];

      // Direct permission check
      if (rolePermissions.includes(permission)) {
        // Additional resource-specific checks
        if (
          await this.checkResourceAccess(
            userId!,
            role,
            permission,
            resourceType,
            resourceId,
          )
        ) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check resource-specific access (ownership, organization membership, etc.)
   */
  private async checkResourceAccess(
    userId: string,
    userRole: UserRole,
    permission: Permission,
    resourceType?: ResourceType,
    resourceId?: string,
  ): Promise<boolean> {
    if (!resourceType || !resourceId) {
      return true; // No resource-specific restrictions
    }

    switch (resourceType) {
      case ResourceType.ORGANIZATION:
        return this.checkOrganizationAccess(userId, userRole, resourceId);

      case ResourceType.USER:
        return this.checkUserAccess(userId, userRole, resourceId);

      case ResourceType.AGENT:
        return this.checkAgentAccess(userId, userRole, resourceId);

      case ResourceType.WORKFLOW:
        return this.checkWorkflowAccess(userId, userRole, resourceId);

      case ResourceType.EXECUTION:
        return this.checkExecutionAccess(userId, userRole, resourceId);

      default:
        return true;
    }
  }

  private async checkOrganizationAccess(
    userId: string,
    userRole: UserRole,
    organizationId: string,
  ): Promise<boolean> {
    if (userRole === UserRole.SUPER_ADMIN) {
      return true;
    }

    // Check if user is a member of the organization
    const membership = await this.prisma.organizationMember.findFirst({
      where: {
        userId,
        organizationId,
      },
    });

    return !!membership;
  }

  private async checkUserAccess(
    userId: string,
    userRole: UserRole,
    targetUserId: string,
  ): Promise<boolean> {
    if (userRole === UserRole.SUPER_ADMIN) {
      return true;
    }

    // Users can access their own data
    if (userId === targetUserId) {
      return true;
    }

    // Check if both users are in the same organization and user has admin role
    const userMemberships = await this.prisma.organizationMember.findMany({
      where: { userId },
    });

    const targetMemberships = await this.prisma.organizationMember.findMany({
      where: { userId: targetUserId },
    });

    const commonOrgIds = userMemberships
      .map((m: any) => m.organizationId)
      .filter((orgId: any) =>
        targetMemberships.some((m: any) => m.organizationId === orgId),
      );

    return commonOrgIds.length > 0 && userRole === UserRole.ORG_ADMIN;
  }

  private async checkAgentAccess(
    userId: string,
    userRole: UserRole,
    agentId: string,
  ): Promise<boolean> {
    if (userRole === UserRole.SUPER_ADMIN) {
      return true;
    }

    const agent = await this.prisma.agent.findUnique({
      where: { id: agentId },
    });

    if (!agent) {
      return false;
    }

    // If agent is owned by user directly
    if (agent.ownerType === 'user' && agent.ownerId === userId) {
      return true;
    }

    // If agent is owned by organization, check membership
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

      // Organization admins can access all agents in their org
      if (userRole === UserRole.ORG_ADMIN) {
        return true;
      }

      // Org members can access agents in their org
      if (userRole === UserRole.ORG_MEMBER) {
        return true;
      }
    }

    return false;
  }

  private async checkWorkflowAccess(
    userId: string,
    userRole: UserRole,
    workflowId: string,
  ): Promise<boolean> {
    if (userRole === UserRole.SUPER_ADMIN) {
      return true;
    }

    const workflow = await this.prisma.workflow.findUnique({
      where: { id: workflowId },
      include: { agent: true },
    });

    if (!workflow) {
      return false;
    }

    // Check access to the agent that owns this workflow
    return this.checkAgentAccess(userId, userRole, workflow.agentId);
  }

  private async checkExecutionAccess(
    userId: string,
    userRole: UserRole,
    executionId: string,
  ): Promise<boolean> {
    if (userRole === UserRole.SUPER_ADMIN) {
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

    // Check access to the agent that owns this execution's workflow
    return this.checkAgentAccess(userId, userRole, execution.agentId);
  }

  /**
   * Create authorization guard middleware
   */
  createGuard(permission: Permission, resourceType?: ResourceType) {
    return async (userId: string, resourceId?: string) => {
      const result = await this.checkPermission(
        userId,
        permission,
        resourceType,
        resourceId,
      );

      if (!result.allowed) {
        throw new ForbiddenException(result.reason || 'Access denied');
      }

      return true;
    };
  }

  /**
   * Validate role hierarchy
   */
  validateRoleHierarchy(userRole: UserRole, requiredRole: UserRole): boolean {
    const userRoleHierarchy = ROLE_HIERARCHY[userRole] || [];
    return userRoleHierarchy.includes(requiredRole);
  }

  /**
   * Get role capabilities
   */
  getRoleCapabilities(role: UserRole) {
    return {
      role,
      permissions: DEFAULT_ROLE_PERMISSIONS[role] || [],
      hierarchy: ROLE_HIERARCHY[role] || [],
    };
  }
}
