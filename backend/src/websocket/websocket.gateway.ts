import {
  WebSocketGateway as NestWebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  organizationId?: string;
  portal?: 'user' | 'admin';
}

@NestWebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3003', 'http://localhost:3001'],
    credentials: true,
  },
  namespace: '/sync',
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebSocketGateway.name);
  private connectedClients = new Map<string, AuthenticatedSocket>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Extract token from handshake auth
      const token = client.handshake.auth?.token || client.handshake.query?.token;

      if (!token || typeof token !== 'string') {
        this.logger.warn(`Connection rejected: No token provided from ${client.id}`);
        client.disconnect();
        return;
      }

      // Verify JWT token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      // Extract user info
      client.userId = payload.sub;
      client.organizationId = payload.organizationId;
      client.portal = client.handshake.auth?.portal || 'user';

      // Store connected client
      this.connectedClients.set(client.id, client);

      this.logger.log(
        `Client connected: ${client.id} (User: ${client.userId}, Portal: ${client.portal})`
      );

      // Send welcome message
      client.emit('connected', {
        message: 'Successfully connected to sync server',
        userId: client.userId,
        portal: client.portal,
      });

      // Broadcast user online status to other portals
      this.broadcastToOtherPortals(client, 'user_online', {
        userId: client.userId,
        organizationId: client.organizationId,
        portal: client.portal,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      this.logger.error(`Connection failed for ${client.id}:`, error);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    // Remove from connected clients
    this.connectedClients.delete(client.id);

    // Broadcast user offline status
    if (client.userId) {
      this.broadcastToOtherPortals(client, 'user_offline', {
        userId: client.userId,
        organizationId: client.organizationId,
        portal: client.portal,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @SubscribeMessage('sync_data_change')
  handleDataChange(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { entityType, entityId, operation, changes, sourcePortal } = data;

    this.logger.log(
      `Data change: ${operation} ${entityType}:${entityId} from ${sourcePortal}`
    );

    // Broadcast to all clients except sender
    client.broadcast.emit('data_updated', {
      entityType,
      entityId,
      operation,
      changes,
      sourcePortal,
      timestamp: new Date().toISOString(),
      sourceUserId: client.userId,
    });

    // Also broadcast to other portals specifically
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

  @SubscribeMessage('agent_status_update')
  handleAgentStatusUpdate(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { agentId, status, metadata } = data;

    this.logger.log(`Agent status update: ${agentId} -> ${status}`);

    // Broadcast to all clients
    this.server.emit('agent_status_changed', {
      agentId,
      status,
      metadata,
      sourcePortal: client.portal,
      timestamp: new Date().toISOString(),
      sourceUserId: client.userId,
    });
  }

  @SubscribeMessage('execution_update')
  handleExecutionUpdate(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { executionId, status, agentId, result } = data;

    this.logger.log(`Execution update: ${executionId} -> ${status}`);

    // Broadcast to all clients
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

  @SubscribeMessage('user_activity')
  handleUserActivity(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { action, details } = data;

    // Only broadcast to admin portal for monitoring
    this.broadcastToPortal('admin', 'user_activity_log', {
      userId: client.userId,
      organizationId: client.organizationId,
      action,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('request_sync')
  handleRequestSync(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { entityType, entityId, targetPortal } = data;

    // Request sync from target portal
    this.broadcastToPortal(targetPortal, 'sync_request', {
      entityType,
      entityId,
      requestingPortal: client.portal,
      requestingUserId: client.userId,
      timestamp: new Date().toISOString(),
    });
  }

  // Helper methods for cross-portal communication
  private broadcastToOtherPortals(
    sender: AuthenticatedSocket,
    event: string,
    data: any
  ) {
    this.connectedClients.forEach((client) => {
      if (client.id !== sender.id && client.portal !== sender.portal) {
        client.emit(event, data);
      }
    });
  }

  private broadcastToPortal(portal: 'user' | 'admin', event: string, data: any) {
    this.connectedClients.forEach((client) => {
      if (client.portal === portal) {
        client.emit(event, data);
      }
    });
  }

  private broadcastToOrganization(
    organizationId: string,
    event: string,
    data: any,
    excludeClient?: AuthenticatedSocket
  ) {
    this.connectedClients.forEach((client) => {
      if (client.organizationId === organizationId && client !== excludeClient) {
        client.emit(event, data);
      }
    });
  }

  // Public methods for other services to emit events
  emitToUser(userId: string, event: string, data: any) {
    this.connectedClients.forEach((client) => {
      if (client.userId === userId) {
        client.emit(event, data);
      }
    });
  }

  emitToOrganization(organizationId: string, event: string, data: any) {
    this.broadcastToOrganization(organizationId, event, data);
  }

  emitToAll(event: string, data: any) {
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
}
