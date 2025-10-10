import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export interface MarketplaceEvent {
    eventId: string;
    eventType: 'agent.published' | 'agent.updated' | 'agent.unpublished';
    agentId: string;
    timestamp: string;
    metadata?: {
        isBreakingUpdate?: boolean;
        version?: string;
        deprecationTimestamp?: string;
        archivalTimestamp?: string;
    };
}
export declare class EventBusService {
    private configService;
    private readonly logger;
    private readonly redis;
    private readonly eventPrefix;
    constructor(configService: ConfigService);
    publishMarketplaceEvent(event: MarketplaceEvent): Promise<void>;
    publishAgentPublished(agentId: string, version: string): Promise<void>;
    publishAgentUpdated(agentId: string, version: string, isBreakingUpdate?: boolean): Promise<void>;
    publishAgentUnpublished(agentId: string): Promise<void>;
    publish(channel: string, data: any): Promise<void>;
    getRedisClient(): Redis;
    disconnect(): Promise<void>;
    private generateEventId;
}
