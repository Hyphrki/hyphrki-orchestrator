import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
interface AuthenticatedSocket extends Socket {
    userId?: string;
    organizationId?: string;
    portal?: 'user' | 'admin';
}
export declare class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly configService;
    server: Server;
    private readonly logger;
    private connectedClients;
    constructor(jwtService: JwtService, configService: ConfigService);
    handleConnection(client: AuthenticatedSocket): Promise<void>;
    handleDisconnect(client: AuthenticatedSocket): void;
    handleDataChange(data: any, client: AuthenticatedSocket): void;
    handleAgentStatusUpdate(data: any, client: AuthenticatedSocket): void;
    handleExecutionUpdate(data: any, client: AuthenticatedSocket): void;
    handleUserActivity(data: any, client: AuthenticatedSocket): void;
    handleRequestSync(data: any, client: AuthenticatedSocket): void;
    private broadcastToOtherPortals;
    private broadcastToPortal;
    private broadcastToOrganization;
    emitToUser(userId: string, event: string, data: any): void;
    emitToOrganization(organizationId: string, event: string, data: any): void;
    emitToAll(event: string, data: any): void;
    getConnectedClients(): {
        id: string;
        userId: string | undefined;
        organizationId: string | undefined;
        portal: "user" | "admin" | undefined;
    }[];
}
export {};
