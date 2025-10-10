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
var WebSocketGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let WebSocketGateway = WebSocketGateway_1 = class WebSocketGateway {
    jwtService;
    configService;
    server;
    logger = new common_1.Logger(WebSocketGateway_1.name);
    connectedClients = new Map();
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token || client.handshake.query?.token;
            if (!token || typeof token !== 'string') {
                this.logger.warn(`Connection rejected: No token provided from ${client.id}`);
                client.disconnect();
                return;
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            client.userId = payload.sub;
            client.organizationId = payload.organizationId;
            client.portal = client.handshake.auth?.portal || 'user';
            this.connectedClients.set(client.id, client);
            this.logger.log(`Client connected: ${client.id} (User: ${client.userId}, Portal: ${client.portal})`);
            client.emit('connected', {
                message: 'Successfully connected to sync server',
                userId: client.userId,
                portal: client.portal,
            });
            this.broadcastToOtherPortals(client, 'user_online', {
                userId: client.userId,
                organizationId: client.organizationId,
                portal: client.portal,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            this.logger.error(`Connection failed for ${client.id}:`, error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.connectedClients.delete(client.id);
        if (client.userId) {
            this.broadcastToOtherPortals(client, 'user_offline', {
                userId: client.userId,
                organizationId: client.organizationId,
                portal: client.portal,
                timestamp: new Date().toISOString(),
            });
        }
    }
    handleDataChange(data, client) {
        const { entityType, entityId, operation, changes, sourcePortal } = data;
        this.logger.log(`Data change: ${operation} ${entityType}:${entityId} from ${sourcePortal}`);
        client.broadcast.emit('data_updated', {
            entityType,
            entityId,
            operation,
            changes,
            sourcePortal,
            timestamp: new Date().toISOString(),
            sourceUserId: client.userId,
        });
        this.broadcastToOtherPortals(client, 'cross_portal_sync', {
            entityType,
            entityId,
            operation,
            changes,
            sourcePortal,
            timestamp: new Date().toISOString(),
            sourceUserId: client.userId,
        });
    }
    handleAgentStatusUpdate(data, client) {
        const { agentId, status, metadata } = data;
        this.logger.log(`Agent status update: ${agentId} -> ${status}`);
        this.server.emit('agent_status_changed', {
            agentId,
            status,
            metadata,
            sourcePortal: client.portal,
            timestamp: new Date().toISOString(),
            sourceUserId: client.userId,
        });
    }
    handleExecutionUpdate(data, client) {
        const { executionId, status, agentId, result } = data;
        this.logger.log(`Execution update: ${executionId} -> ${status}`);
        this.server.emit('execution_status_changed', {
            executionId,
            status,
            agentId,
            result,
            sourcePortal: client.portal,
            timestamp: new Date().toISOString(),
            sourceUserId: client.userId,
        });
    }
    handleUserActivity(data, client) {
        const { action, details } = data;
        this.broadcastToPortal('admin', 'user_activity_log', {
            userId: client.userId,
            organizationId: client.organizationId,
            action,
            details,
            timestamp: new Date().toISOString(),
        });
    }
    handleRequestSync(data, client) {
        const { entityType, entityId, targetPortal } = data;
        this.broadcastToPortal(targetPortal, 'sync_request', {
            entityType,
            entityId,
            requestingPortal: client.portal,
            requestingUserId: client.userId,
            timestamp: new Date().toISOString(),
        });
    }
    broadcastToOtherPortals(sender, event, data) {
        this.connectedClients.forEach((client) => {
            if (client.id !== sender.id && client.portal !== sender.portal) {
                client.emit(event, data);
            }
        });
    }
    broadcastToPortal(portal, event, data) {
        this.connectedClients.forEach((client) => {
            if (client.portal === portal) {
                client.emit(event, data);
            }
        });
    }
    broadcastToOrganization(organizationId, event, data, excludeClient) {
        this.connectedClients.forEach((client) => {
            if (client.organizationId === organizationId && client !== excludeClient) {
                client.emit(event, data);
            }
        });
    }
    emitToUser(userId, event, data) {
        this.connectedClients.forEach((client) => {
            if (client.userId === userId) {
                client.emit(event, data);
            }
        });
    }
    emitToOrganization(organizationId, event, data) {
        this.broadcastToOrganization(organizationId, event, data);
    }
    emitToAll(event, data) {
        this.server.emit(event, data);
    }
    getConnectedClients() {
        return Array.from(this.connectedClients.values()).map(client => ({
            id: client.id,
            userId: client.userId,
            organizationId: client.organizationId,
            portal: client.portal,
        }));
    }
};
exports.WebSocketGateway = WebSocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebSocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sync_data_change'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebSocketGateway.prototype, "handleDataChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('agent_status_update'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebSocketGateway.prototype, "handleAgentStatusUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('execution_update'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebSocketGateway.prototype, "handleExecutionUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('user_activity'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebSocketGateway.prototype, "handleUserActivity", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('request_sync'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebSocketGateway.prototype, "handleRequestSync", null);
exports.WebSocketGateway = WebSocketGateway = WebSocketGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3003', 'http://localhost:3001'],
            credentials: true,
        },
        namespace: '/sync',
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], WebSocketGateway);
//# sourceMappingURL=websocket.gateway.js.map