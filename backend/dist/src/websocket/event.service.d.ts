import { OnModuleInit } from '@nestjs/common';
import { SyncService } from './sync.service';
import { PrismaService } from '../database/prisma.service';
export declare class EventService implements OnModuleInit {
    private readonly syncService;
    private readonly prismaService;
    private readonly logger;
    constructor(syncService: SyncService, prismaService: PrismaService);
    onModuleInit(): Promise<void>;
    private setupDatabaseEventListeners;
    handleEntityChange(entityType: string, entityId: string, operation: 'create' | 'update' | 'delete', changes?: any, sourcePortal?: 'user' | 'admin'): Promise<void>;
    private handleAgentChange;
    private handleExecutionChange;
    private handleWorkflowChange;
    private handleUserProfileChange;
    private handleOrganizationChange;
    broadcastSystemEvent(message: string, type?: 'info' | 'warning' | 'error'): Promise<void>;
    handleMetricsUpdate(userId: string, metrics: any): Promise<void>;
    handleBillingUpdate(organizationId: string, billingData: any): Promise<void>;
}
