import { Injectable, Logger } from '@nestjs/common';
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

@Injectable()
export class EventBusService {
  private readonly logger = new Logger(EventBusService.name);
  private readonly redis: Redis;
  private readonly eventPrefix: string;

  constructor(private configService: ConfigService) {
    this.eventPrefix = this.configService.get('REDIS_EVENT_PREFIX', 'marketplace');
    
    this.redis = new Redis({
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: this.configService.get('REDIS_PORT', 6379),
      password: this.configService.get('REDIS_PASSWORD'),
      db: this.configService.get('REDIS_DB', 0),
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    });

    this.redis.on('error', (error) => {
      this.logger.error('Redis connection error:', error);
    });

    this.redis.on('connect', () => {
      this.logger.log('EventBus Redis connected successfully');
    });
  }

  /**
   * Publish marketplace events to Redis channels
   */
  async publishMarketplaceEvent(event: MarketplaceEvent): Promise<void> {
    try {
      const channel = `${this.eventPrefix}:agent:${event.eventType.split('.')[1]}`;
      const payload = JSON.stringify(event);
      
      await this.redis.publish(channel, payload);
      
      this.logger.log(`Published event to ${channel}:`, {
        eventId: event.eventId,
        agentId: event.agentId,
        eventType: event.eventType,
      });

      // Set TTL on event key to prevent unbounded growth
      const eventKey = `event:${event.eventId}`;
      await this.redis.setex(eventKey, 3600, payload); // 1 hour TTL
      
    } catch (error) {
      this.logger.error('Failed to publish marketplace event:', error);
      throw error;
    }
  }

  /**
   * Publish agent published event
   */
  async publishAgentPublished(agentId: string, version: string): Promise<void> {
    const event: MarketplaceEvent = {
      eventId: this.generateEventId(),
      eventType: 'agent.published',
      agentId,
      timestamp: new Date().toISOString(),
      metadata: { version },
    };

    await this.publishMarketplaceEvent(event);
  }

  /**
   * Publish agent updated event
   */
  async publishAgentUpdated(
    agentId: string, 
    version: string, 
    isBreakingUpdate: boolean = false
  ): Promise<void> {
    const event: MarketplaceEvent = {
      eventId: this.generateEventId(),
      eventType: 'agent.updated',
      agentId,
      timestamp: new Date().toISOString(),
      metadata: { 
        version, 
        isBreakingUpdate 
      },
    };

    await this.publishMarketplaceEvent(event);
  }

  /**
   * Publish agent unpublished event
   */
  async publishAgentUnpublished(agentId: string): Promise<void> {
    const deprecationTimestamp = new Date().toISOString();
    const archivalTimestamp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

    const event: MarketplaceEvent = {
      eventId: this.generateEventId(),
      eventType: 'agent.unpublished',
      agentId,
      timestamp: deprecationTimestamp,
      metadata: {
        deprecationTimestamp,
        archivalTimestamp,
      },
    };

    await this.publishMarketplaceEvent(event);
  }

  /**
   * Generic publish method for custom events
   */
  async publish(channel: string, data: any): Promise<void> {
    try {
      const payload = JSON.stringify(data);
      await this.redis.publish(channel, payload);
      this.logger.log(`Published to ${channel}`);
    } catch (error) {
      this.logger.error(`Failed to publish to ${channel}:`, error);
      throw error;
    }
  }

  /**
   * Get Redis client for direct operations
   */
  getRedisClient(): Redis {
    return this.redis;
  }

  /**
   * Disconnect from Redis
   */
  async disconnect(): Promise<void> {
    await this.redis.disconnect();
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
