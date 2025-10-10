import { WebSocketGateway } from './websocket.gateway';
export interface SyncEvent {
    entityType: string;
    entityId: string;
    operation: 'create' | 'update' | 'delete';
    changes?: any;
    sourcePortal?: 'user' | 'admin';
    metadata?: any;
}
export declare class SyncService {
    private readonly websocketGateway;
    private readonly logger;
    constructor(websocketGateway: WebSocketGateway);
    emitSyncEvent(event: SyncEvent): void;
    emitToOrganization(organizationId: string, event: SyncEvent): void;
    emitToUser(userId: string, event: SyncEvent): void;
    emitAgentCreated(agent: any, organizationId: string): void;
    emitAgentUpdated(agent: any, organizationId: string): void;
    emitAgentDeleted(agentId: string, organizationId: string): void;
    emitExecutionStarted(execution: any, organizationId: string): void;
    emitExecutionUpdated(execution: any, organizationId: string): void;
    emitExecutionCompleted(execution: any, organizationId: string): void;
    emitUserProfileUpdated(userId: string, changes: any): void;
    emitUserCreated(user: any, organizationId: string): void;
    emitOrganizationUpdated(organization: any): void;
    emitWorkflowCreated(workflow: any, organizationId: string): void;
    emitWorkflowUpdated(workflow: any, organizationId: string): void;
    emitMarketplaceAgentInstalled(installation: any, userId: string): void;
    emitBillingTransaction(transaction: any, organizationId: string): void;
    getConnectedClients(): {
        id: string;
        userId: string | undefined;
        organizationId: string | undefined;
        portal: "user" | "admin" | undefined;
    }[];
    emitSystemNotification(message: string, type?: 'info' | 'warning' | 'error'): void;
}
