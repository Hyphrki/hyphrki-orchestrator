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
var EventService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const sync_service_1 = require("./sync.service");
const prisma_service_1 = require("../database/prisma.service");
let EventService = EventService_1 = class EventService {
    syncService;
    prismaService;
    logger = new common_1.Logger(EventService_1.name);
    constructor(syncService, prismaService) {
        this.syncService = syncService;
        this.prismaService = prismaService;
    }
    async onModuleInit() {
        this.setupDatabaseEventListeners();
    }
    setupDatabaseEventListeners() {
        this.logger.log('Database event listeners initialized');
    }
    async handleEntityChange(entityType, entityId, operation, changes, sourcePortal) {
        try {
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
        }
        catch (error) {
            this.logger.error(`Error handling entity change: ${entityType}:${entityId}`, error);
        }
    }
    async handleAgentChange(agentId, operation, changes, sourcePortal) {
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
            this.syncService.emitToOrganization(agent.ownerId, event);
        }
        else {
            this.syncService.emitToUser(agent.ownerId, event);
        }
        if (sourcePortal === 'user') {
            if (agent.ownerType === 'organization') {
                this.syncService.emitToOrganization(agent.ownerId, {
                    ...event,
                });
            }
        }
    }
    async handleExecutionChange(executionId, operation, changes, sourcePortal) {
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
            this.syncService.emitToOrganization(execution.agent.ownerId, event);
        }
        else {
            this.syncService.emitToUser(execution.agent.ownerId, event);
        }
    }
    async handleWorkflowChange(workflowId, operation, changes, sourcePortal) {
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
            this.syncService.emitToOrganization(workflow.agent.ownerId, event);
        }
        else {
            this.syncService.emitToUser(workflow.agent.ownerId, event);
        }
    }
    async handleUserProfileChange(userId, operation, changes, sourcePortal) {
        const event = {
            entityType: 'user_profile',
            entityId: userId,
            operation,
            changes,
            sourcePortal,
        };
        this.syncService.emitToUser(userId, event);
        const userOrgs = await this.prismaService.organizationMember.findMany({
            where: { userId },
            include: { organization: true },
        });
        for (const member of userOrgs) {
            this.syncService.emitToOrganization(member.organizationId, {
                ...event,
            });
        }
    }
    async handleOrganizationChange(organizationId, operation, changes, sourcePortal) {
        const event = {
            entityType: 'organization',
            entityId: organizationId,
            operation,
            changes,
            sourcePortal,
        };
        this.syncService.emitToOrganization(organizationId, event);
        this.syncService.emitToOrganization(organizationId, {
            ...event,
        });
    }
    async broadcastSystemEvent(message, type = 'info') {
        this.syncService.emitSystemNotification(message, type);
    }
    async handleMetricsUpdate(userId, metrics) {
        this.syncService.emitToUser(userId, {
            entityType: 'metrics',
            entityId: userId,
            operation: 'update',
            changes: metrics,
        });
    }
    async handleBillingUpdate(organizationId, billingData) {
        this.syncService.emitToOrganization(organizationId, {
            entityType: 'billing',
            entityId: organizationId,
            operation: 'update',
            changes: billingData,
        });
    }
};
exports.EventService = EventService;
exports.EventService = EventService = EventService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sync_service_1.SyncService,
        prisma_service_1.PrismaService])
], EventService);
//# sourceMappingURL=event.service.js.map