import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { WebSocketGateway } from './websocket.gateway';

export interface SyncEvent {
  entityType: string;
  entityId: string;
  operation: 'create' | 'update' | 'delete';
  changes?: any;
  sourcePortal?: 'user' | 'admin';
  metadata?: any;
}

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    @Inject(forwardRef(() => WebSocketGateway))
    private readonly websocketGateway: WebSocketGateway,
  ) {}

  /**
   * Emit a synchronization event to all connected clients
   */
  emitSyncEvent(event: SyncEvent) {
    this.logger.log(
      `Emitting sync event: ${event.operation} ${event.entityType}:${event.entityId}`
    );

    this.websocketGateway.emitToAll('data_updated', {
      ...event,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Emit an event to specific organization clients
   */
  emitToOrganization(organizationId: string, event: SyncEvent) {
    this.logger.log(
      `Emitting sync event to org ${organizationId}: ${event.operation} ${event.entityType}:${event.entityId}`
    );

    this.websocketGateway.emitToOrganization(organizationId, 'data_updated', {
      ...event,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Emit an event to a specific user
   */
  emitToUser(userId: string, event: SyncEvent) {
    this.logger.log(
      `Emitting sync event to user ${userId}: ${event.operation} ${event.entityType}:${event.entityId}`
    );

    this.websocketGateway.emitToUser(userId, 'data_updated', {
      ...event,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Agent-related synchronization events
   */
  emitAgentCreated(agent: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'agent',
      entityId: agent.id,
      operation: 'create',
      changes: agent,
      sourcePortal: 'admin',
    });
  }

  emitAgentUpdated(agent: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'agent',
      entityId: agent.id,
      operation: 'update',
      changes: agent,
      sourcePortal: 'admin',
    });
  }

  emitAgentDeleted(agentId: string, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'agent',
      entityId: agentId,
      operation: 'delete',
      sourcePortal: 'admin',
    });
  }

  /**
   * Execution-related synchronization events
   */
  emitExecutionStarted(execution: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'execution',
      entityId: execution.id,
      operation: 'create',
      changes: execution,
    });
  }

  emitExecutionUpdated(execution: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'execution',
      entityId: execution.id,
      operation: 'update',
      changes: execution,
    });
  }

  emitExecutionCompleted(execution: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'execution',
      entityId: execution.id,
      operation: 'update',
      changes: execution,
    });
  }

  /**
   * User-related synchronization events
   */
  emitUserProfileUpdated(userId: string, changes: any) {
    this.emitToUser(userId, {
      entityType: 'user_profile',
      entityId: userId,
      operation: 'update',
      changes,
    });
  }

  emitUserCreated(user: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'user',
      entityId: user.id,
      operation: 'create',
      changes: user,
      sourcePortal: 'admin',
    });
  }

  /**
   * Organization-related synchronization events
   */
  emitOrganizationUpdated(organization: any) {
    this.emitToOrganization(organization.id, {
      entityType: 'organization',
      entityId: organization.id,
      operation: 'update',
      changes: organization,
      sourcePortal: 'admin',
    });
  }

  /**
   * Workflow-related synchronization events
   */
  emitWorkflowCreated(workflow: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'workflow',
      entityId: workflow.id,
      operation: 'create',
      changes: workflow,
    });
  }

  emitWorkflowUpdated(workflow: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'workflow',
      entityId: workflow.id,
      operation: 'update',
      changes: workflow,
    });
  }

  /**
   * Marketplace-related synchronization events
   */
  emitMarketplaceAgentInstalled(installation: any, userId: string) {
    this.emitToUser(userId, {
      entityType: 'marketplace_installation',
      entityId: installation.id,
      operation: 'create',
      changes: installation,
      sourcePortal: 'user',
    });
  }

  /**
   * Billing-related synchronization events
   */
  emitBillingTransaction(transaction: any, organizationId: string) {
    this.emitToOrganization(organizationId, {
      entityType: 'billing_transaction',
      entityId: transaction.id,
      operation: 'create',
      changes: transaction,
    });
  }

  /**
   * Get connected clients information
   */
  getConnectedClients() {
    return this.websocketGateway.getConnectedClients();
  }

  /**
   * Broadcast system-wide notifications
   */
  emitSystemNotification(message: string, type: 'info' | 'warning' | 'error' = 'info') {
    this.logger.log(`Broadcasting system notification: ${message}`);

    this.websocketGateway.emitToAll('system_notification', {
      message,
      type,
      timestamp: new Date().toISOString(),
    });
  }
}
