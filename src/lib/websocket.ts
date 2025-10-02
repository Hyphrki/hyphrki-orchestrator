import { WebSocket } from 'ws';
import { JWTService } from './jwt';

export interface WebSocketMessage {
  type: string;
  data: unknown;
  timestamp: string;
}

export interface WebSocketClient {
  id: string;
  ws: WebSocket;
  userId?: string;
  role?: string;
  subscriptions: string[];
}

export class WebSocketService {
  private clients: Map<string, WebSocketClient> = new Map();
  private wss: unknown = null;

  constructor() {
    this.setupWebSocketServer();
  }

  private setupWebSocketServer() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { WebSocketServer } = require('ws');
      const port = parseInt(process.env.WS_PORT || '8080');
      
      this.wss = new WebSocketServer({ port });
      
      (this.wss as { on: (event: string, handler: (ws: WebSocket, request: unknown) => void) => void }).on('connection', (ws: WebSocket, request: unknown) => {
        this.handleConnection(ws);
      });

      console.log(`WebSocket server running on port ${port}`);
    } catch (error) {
      console.error('Failed to setup WebSocket server:', error);
    }
  }

  private handleConnection(ws: WebSocket) {
    const clientId = this.generateClientId();
    const client: WebSocketClient = {
      id: clientId,
      ws,
      subscriptions: []
    };

    this.clients.set(clientId, client);

    ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(clientId, message);
      } catch (error) {
        console.error('Invalid WebSocket message:', error);
        this.sendError(clientId, 'Invalid message format');
      }
    });

    ws.on('close', () => {
      this.clients.delete(clientId);
      console.log(`Client ${clientId} disconnected`);
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
      this.clients.delete(clientId);
    });

    // Send welcome message
    this.sendMessage(clientId, {
      type: 'connected',
      data: { clientId },
      timestamp: new Date().toISOString()
    });

    console.log(`Client ${clientId} connected`);
  }

  private handleMessage(clientId: string, message: unknown) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const msg = message as { type: string; token?: string; topic?: string };
    
    switch (msg.type) {
      case 'authenticate':
        this.handleAuthentication(clientId, msg.token || '');
        break;
      case 'subscribe':
        this.handleSubscription(clientId, msg.topic || '');
        break;
      case 'unsubscribe':
        this.handleUnsubscription(clientId, msg.topic || '');
        break;
      case 'ping':
        this.sendMessage(clientId, {
          type: 'pong',
          data: {},
          timestamp: new Date().toISOString()
        });
        break;
      default:
        this.sendError(clientId, `Unknown message type: ${msg.type}`);
    }
  }

  private handleAuthentication(clientId: string, token: string) {
    const client = this.clients.get(clientId);
    if (!client) return;

    try {
      const payload = JWTService.verifyToken(token);
      if (payload) {
        client.userId = payload.userId;
        client.role = payload.role;
        
        this.sendMessage(clientId, {
          type: 'authenticated',
          data: { userId: payload.userId, role: payload.role },
          timestamp: new Date().toISOString()
        });
      } else {
        this.sendError(clientId, 'Invalid authentication token');
      }
    } catch {
      this.sendError(clientId, 'Authentication failed');
    }
  }

  private handleSubscription(clientId: string, topic: string) {
    const client = this.clients.get(clientId);
    if (!client) return;

    if (!client.subscriptions.includes(topic)) {
      client.subscriptions.push(topic);
      this.sendMessage(clientId, {
        type: 'subscribed',
        data: { topic },
        timestamp: new Date().toISOString()
      });
    }
  }

  private handleUnsubscription(clientId: string, topic: string) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const index = client.subscriptions.indexOf(topic);
    if (index > -1) {
      client.subscriptions.splice(index, 1);
      this.sendMessage(clientId, {
        type: 'unsubscribed',
        data: { topic },
        timestamp: new Date().toISOString()
      });
    }
  }

  private sendMessage(clientId: string, message: WebSocketMessage) {
    const client = this.clients.get(clientId);
    if (!client || client.ws.readyState !== WebSocket.OPEN) return;

    try {
      client.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error(`Failed to send message to client ${clientId}:`, error);
    }
  }

  private sendError(clientId: string, error: string) {
    this.sendMessage(clientId, {
      type: 'error',
      data: { error },
      timestamp: new Date().toISOString()
    });
  }

  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public methods for broadcasting
  public broadcast(topic: string, data: unknown) {
    const message: WebSocketMessage = {
      type: 'broadcast',
      data,
      timestamp: new Date().toISOString()
    };

    this.clients.forEach((client) => {
      if (client.subscriptions.includes(topic)) {
        this.sendMessage(client.id, message);
      }
    });
  }

  public broadcastToRole(role: string, data: unknown) {
    const message: WebSocketMessage = {
      type: 'role_broadcast',
      data,
      timestamp: new Date().toISOString()
    };

    this.clients.forEach((client) => {
      if (client.role === role) {
        this.sendMessage(client.id, message);
      }
    });
  }

  public sendToUser(userId: string, data: unknown) {
    const message: WebSocketMessage = {
      type: 'user_message',
      data,
      timestamp: new Date().toISOString()
    };

    this.clients.forEach((client) => {
      if (client.userId === userId) {
        this.sendMessage(client.id, message);
      }
    });
  }

  public getConnectedClients(): number {
    return this.clients.size;
  }

  public getClientInfo(): Array<{ id: string; userId?: string; role?: string; subscriptions: string[] }> {
    return Array.from(this.clients.values()).map(client => ({
      id: client.id,
      userId: client.userId,
      role: client.role,
      subscriptions: client.subscriptions
    }));
  }
}

export const wsService = new WebSocketService();
