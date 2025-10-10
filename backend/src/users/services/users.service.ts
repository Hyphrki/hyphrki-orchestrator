import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SyncService } from '../../websocket/sync.service';
import { PrismaService } from '../../database/prisma.service';

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
  subscriptionTier?: string;
  page?: number;
  limit?: number;
}

export interface UserListResponse {
  users: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  metadata: any;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly syncService: SyncService,
    private readonly prisma: PrismaService,
  ) {}

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
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

  async updateCurrentUser(userId: string, updateData: UpdateUserDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatePayload = {
      ...(updateData.first_name && { firstName: updateData.first_name }),
      ...(updateData.last_name && { lastName: updateData.last_name }),
    };

    const updatedUser = await this.userRepository.update(userId, updatePayload);

    // Emit cross-portal synchronization event for user profile update
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

  // Admin methods
  async listAllUsers(filters: UserFilters): Promise<UserListResponse> {
    const page = filters.page || 1;
    const limit = Math.min(filters.limit || 20, 100); // Max 100 per page
    const skip = (page - 1) * limit;

    const where: any = {};

    // Search filter
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // Role filter (assuming we have a role field)
    if (filters.role) {
      where.role = filters.role;
    }

    // Status filter (active/suspended)
    if (filters.status) {
      if (filters.status === 'active') {
        where.suspendedAt = null;
      } else if (filters.status === 'suspended') {
        where.suspendedAt = { not: null };
      }
    }

    // Subscription tier filter
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

  async getUserById(id: string) {
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
      throw new NotFoundException('User not found');
    }

    // Get user's assigned workflows
    const assignedWorkflows = await this.prisma.workflow.findMany({
      where: { assignedToUserId: id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });

    // Get user activity
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

  async updateUser(id: string, updateData: any) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatePayload: any = {};
    
    if (updateData.first_name !== undefined) updatePayload.firstName = updateData.first_name;
    if (updateData.last_name !== undefined) updatePayload.lastName = updateData.last_name;
    if (updateData.subscription_tier !== undefined) updatePayload.subscriptionTier = updateData.subscription_tier;
    if (updateData.role !== undefined) updatePayload.role = updateData.role;

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

    // Log activity
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

  async suspendUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.suspendedAt) {
      throw new BadRequestException('User is already suspended');
    }

    const suspendedUser = await this.prisma.user.update({
      where: { id },
      data: { suspendedAt: new Date() },
    });

    // Log activity
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

  async activateUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.suspendedAt) {
      throw new BadRequestException('User is not suspended');
    }

    const activatedUser = await this.prisma.user.update({
      where: { id },
      data: { suspendedAt: null },
    });

    // Log activity
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

  async updateUserRole(id: string, role: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!['user', 'admin'].includes(role)) {
      throw new BadRequestException('Invalid role. Must be "user" or "admin"');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    // Log activity
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

  async assignPersonalizedWorkflow(userId: string, workflowId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const workflow = await this.prisma.workflow.findUnique({ where: { id: workflowId } });
    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    // Check if already assigned
    const existingAssignment = await this.prisma.workflow.findFirst({
      where: { id: workflowId, assignedToUserId: userId },
    });

    if (existingAssignment) {
      throw new BadRequestException('Workflow is already assigned to this user');
    }

    const updatedWorkflow = await this.prisma.workflow.update({
      where: { id: workflowId },
      data: { assignedToUserId: userId },
    });

    // Log activity
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

  async getUserAssignedWorkflows(userId: string) {
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

  async logUserActivity(userId: string, action: string, metadata: any) {
    try {
      await this.prisma.userActivity.create({
        data: {
          userId,
          action,
          metadata,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      // Log error but don't fail the main operation
      console.error('Failed to log user activity:', error);
    }
  }
}
