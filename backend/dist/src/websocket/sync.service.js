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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const websocket_gateway_1 = require("./websocket.gateway");
let SyncService = SyncService_1 = class SyncService {
    websocketGateway;
    logger = new common_1.Logger(SyncService_1.name);
    constructor(websocketGateway) {
        this.websocketGateway = websocketGateway;
    }
    emitSyncEvent(event) {
        this.logger.log(`Emitting sync event: ${event.operation} ${event.entityType}:${event.entityId}`);
        this.websocketGateway.emitToAll('data_updated', {
            ...event,
            timestamp: new Date().toISOString(),
        });
    }
    emitToOrganization(organizationId, event) {
        this.logger.log(`Emitting sync event to org ${organizationId}: ${event.operation} ${event.entityType}:${event.entityId}`);
        this.websocketGateway.emitToOrganization(organizationId, 'data_updated', {
            ...event,
            timestamp: new Date().toISOString(),
        });
    }
    emitToUser(userId, event) {
        this.logger.log(`Emitting sync event to user ${userId}: ${event.operation} ${event.entityType}:${event.entityId}`);
        this.websocketGateway.emitToUser(userId, 'data_updated', {
            ...event,
            timestamp: new Date().toISOString(),
        });
    }
    emitAgentCreated(agent, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'agent',
            entityId: agent.id,
            operation: 'create',
            changes: agent,
            sourcePortal: 'admin',
        });
    }
    emitAgentUpdated(agent, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'agent',
            entityId: agent.id,
            operation: 'update',
            changes: agent,
            sourcePortal: 'admin',
        });
    }
    emitAgentDeleted(agentId, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'agent',
            entityId: agentId,
            operation: 'delete',
            sourcePortal: 'admin',
        });
    }
    emitExecutionStarted(execution, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'execution',
            entityId: execution.id,
            operation: 'create',
            changes: execution,
        });
    }
    emitExecutionUpdated(execution, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'execution',
            entityId: execution.id,
            operation: 'update',
            changes: execution,
        });
    }
    emitExecutionCompleted(execution, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'execution',
            entityId: execution.id,
            operation: 'update',
            changes: execution,
        });
    }
    emitUserProfileUpdated(userId, changes) {
        this.emitToUser(userId, {
            entityType: 'user_profile',
            entityId: userId,
            operation: 'update',
            changes,
        });
    }
    emitUserCreated(user, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'user',
            entityId: user.id,
            operation: 'create',
            changes: user,
            sourcePortal: 'admin',
        });
    }
    emitOrganizationUpdated(organization) {
        this.emitToOrganization(organization.id, {
            entityType: 'organization',
            entityId: organization.id,
            operation: 'update',
            changes: organization,
            sourcePortal: 'admin',
        });
    }
    emitWorkflowCreated(workflow, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'workflow',
            entityId: workflow.id,
            operation: 'create',
            changes: workflow,
        });
    }
    emitWorkflowUpdated(workflow, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'workflow',
            entityId: workflow.id,
            operation: 'update',
            changes: workflow,
        });
    }
    emitMarketplaceAgentInstalled(installation, userId) {
        this.emitToUser(userId, {
            entityType: 'marketplace_installation',
            entityId: installation.id,
            operation: 'create',
            changes: installation,
            sourcePortal: 'user',
        });
    }
    emitBillingTransaction(transaction, organizationId) {
        this.emitToOrganization(organizationId, {
            entityType: 'billing_transaction',
            entityId: transaction.id,
            operation: 'create',
            changes: transaction,
        });
    }
    getConnectedClients() {
        return this.websocketGateway.getConnectedClients();
    }
    emitSystemNotification(message, type = 'info') {
        this.logger.log(`Broadcasting system notification: ${message}`);
        this.websocketGateway.emitToAll('system_notification', {
            message,
            type,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.SyncService = SyncService;
exports.SyncService = SyncService = SyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => websocket_gateway_1.WebSocketGateway))),
    __metadata("design:paramtypes", [websocket_gateway_1.WebSocketGateway])
], SyncService);
//# sourceMappingURL=sync.service.js.map