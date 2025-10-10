import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SyncService } from './sync.service';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class EventService implements OnModuleInit {
  private readonly logger = new Logger(EventService.name);

  constructor(
    private readonly syncService: SyncService,
    private readonly prismaService: PrismaService,
  ) {}

  async onModuleInit() {
    // Set up database event listeners for real-time synchronization
    this.setupDatabaseEventListeners();
  }

  private setupDatabaseEventListeners() {
    // Note: This would typically use database triggers, pub/sub, or change data capture
    // For this implementation, we'll rely on service-level event emission
    // In a production system, you might use:
    // - PostgreSQL NOTIFY/LISTEN
    // - Database triggers
    // - Change Data Capture (CDC) tools like Debezium
    // - Redis pub/sub for cross-instance events

    this.logger.log('Database event listeners initialized');
  }

  /**
   * Handle entity changes and broadcast to appropriate portals
   */
  async handleEntityChange(
    entityType: string,
    entityId: string,
    operation: 'create' | 'update' | 'delete',
    changes?: any,
    sourcePortal?: 'user' | 'admin',
  ) {
    try {
      // Determine the target audience based on entity type and operation
      switch (entityType) {
        case 'agent':
          await this.handleAgentChange(entityId, operation, changes, sourcePortal);
          break;
        case 'execution':
          await this.handleExecutionChange(entityId, operation, changes, sourcePortal);
          break;
        case 'workflow':
          await this.handleWorkflowChange(entityId, operation, changes, sourcePortal);
          break;
        case 'user_profile':
          await this.handleUserProfileChange(entityId, operation, changes, sourcePortal);
          break;
        case 'organization':
          await this.handleOrganizationChange(entityId, operation, changes, sourcePortal);
          break;
        default:
          this.logger.warn(`Unhandled entity type: ${entityType}`);
      }
    } catch (error) {
      this.logger.error(`Error handling entity change: ${entityType}:${entityId}`, error);
    }
  }

  private async handleAgentChange(
    agentId: string,
    operation: string,
    changes?: any,
    sourcePortal?: string,
  ) {
    // Get agent details to determine ownership
    const agent = await this.prismaService.agent.findUnique({
      where: { id: agentId },
      include: { userOwner: true, orgOwner: true },
    });

    if (!agent) {
      this.logger.warn(`Agent not found: ${agentId}`);
      return;
    }

    const event = {
      entityType: 'agent',
      entityId: agentId,
      operation,
      changes,
      sourcePortal,
    };

    if (agent.ownerType === 'organization') {
      // Broadcast to all organization members
      this.syncService.emitToOrganization(agent.ownerId, event as any);
    } else {
      // Broadcast to user
      this.syncService.emitToUser(agent.ownerId, event as any);
    }

    // Also broadcast to admin portal for monitoring
    if (sourcePortal === 'user') {
      if (agent.ownerType === 'organization') {
        this.syncService.emitToOrganization(agent.ownerId, {
        ...event,
        // targetPortal: 'admin',
      } as any);
    }
  }
}

  private async handleExecutionChange(
    executionId: string,
    operation: string,
    changes?: any,
    sourcePortal?: string,
  ) {
    // Get execution details to determine ownership
    const execution = await this.prismaService.workflowExecution.findUnique({
      where: { id: executionId },
      include: {
        agent: {
          include: { userOwner: true, orgOwner: true },
        },
      },
    });

    if (!execution) {
      this.logger.warn(`Execution not found: ${executionId}`);
      return;
    }

    const event = {
      entityType: 'execution',
      entityId: executionId,
      operation,
      changes,
      sourcePortal,
    };

    if (execution.agent.ownerType === 'organization') {
      this.syncService.emitToOrganization(execution.agent.ownerId, event as any);
    } else {
      this.syncService.emitToUser(execution.agent.ownerId, event as any);
    }
  }

  private async handleWorkflowChange(
    workflowId: string,
    operation: string,
    changes?: any,
    sourcePortal?: string,
  ) {
    // Get workflow details to determine ownership
    const workflow = await this.prismaService.workflow.findUnique({
      where: { id: workflowId },
      include: {
        agent: {
          include: { userOwner: true, orgOwner: true },
        },
      },
    });

    if (!workflow) {
      this.logger.warn(`Workflow not found: ${workflowId}`);
      return;
    }

    const event = {
      entityType: 'workflow',
      entityId: workflowId,
      operation,
      changes,
      sourcePortal,
    };

    if (workflow.agent.ownerType === 'organization') {
      this.syncService.emitToOrganization(workflow.agent.ownerId, event as any);
    } else {
      this.syncService.emitToUser(workflow.agent.ownerId, event as any);
    }
  }

  private async handleUserProfileChange(
    userId: string,
    operation: string,
    changes?: any,
    sourcePortal?: string,
  ) {
    const event = {
      entityType: 'user_profile',
      entityId: userId,
      operation,
      changes,
      sourcePortal,
    };

    // Emit to the user themselves
    this.syncService.emitToUser(userId, event as any);

    // Get user organizations and emit to organization members
    const userOrgs = await this.prismaService.organizationMember.findMany({
      where: { userId },
      include: { organization: true },
    });

    for (const member of userOrgs) {
      this.syncService.emitToOrganization(member.organizationId, {
        ...event,
        // targetPortal: 'admin', // For admin monitoring
      } as any);
    }
  }

  private async handleOrganizationChange(
    organizationId: string,
    operation: string,
    changes?: any,
    sourcePortal?: string,
  ) {
    const event = {
      entityType: 'organization',
      entityId: organizationId,
      operation,
      changes,
      sourcePortal,
    };

    // Broadcast to all organization members
    this.syncService.emitToOrganization(organizationId, event as any);

    // Also broadcast to admin portal
    this.syncService.emitToOrganization(organizationId, {
      ...event,
      // targetPortal: 'admin',
    } as any);
  }

  /**
   * Broadcast system-wide events
   */
  async broadcastSystemEvent(message: string, type: 'info' | 'warning' | 'error' = 'info') {
    this.syncService.emitSystemNotification(message, type);
  }

  /**
   * Handle real-time metrics updates
   */
  async handleMetricsUpdate(userId: string, metrics: any) {
    this.syncService.emitToUser(userId, {
      entityType: 'metrics',
      entityId: userId,
      operation: 'update',
      changes: metrics,
    });
  }

  /**
   * Handle billing updates
   */
  async handleBillingUpdate(organizationId: string, billingData: any) {
    this.syncService.emitToOrganization(organizationId, {
      entityType: 'billing',
      entityId: organizationId,
      operation: 'update',
      changes: billingData,
    });
  }
}
