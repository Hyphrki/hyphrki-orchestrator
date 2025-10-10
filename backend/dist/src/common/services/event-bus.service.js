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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EventBusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
let EventBusService = EventBusService_1 = class EventBusService {
    configService;
    logger = new common_1.Logger(EventBusService_1.name);
    redis;
    eventPrefix;
    constructor(configService) {
        this.configService = configService;
        this.eventPrefix = this.configService.get('REDIS_EVENT_PREFIX', 'marketplace');
        this.redis = new ioredis_1.default({
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
    async publishMarketplaceEvent(event) {
        try {
            const channel = `${this.eventPrefix}:agent:${event.eventType.split('.')[1]}`;
            const payload = JSON.stringify(event);
            await this.redis.publish(channel, payload);
            this.logger.log(`Published event to ${channel}:`, {
                eventId: event.eventId,
                agentId: event.agentId,
                eventType: event.eventType,
            });
            const eventKey = `event:${event.eventId}`;
            await this.redis.setex(eventKey, 3600, payload);
        }
        catch (error) {
            this.logger.error('Failed to publish marketplace event:', error);
            throw error;
        }
    }
    async publishAgentPublished(agentId, version) {
        const event = {
            eventId: this.generateEventId(),
            eventType: 'agent.published',
            agentId,
            timestamp: new Date().toISOString(),
            metadata: { version },
        };
        await this.publishMarketplaceEvent(event);
    }
    async publishAgentUpdated(agentId, version, isBreakingUpdate = false) {
        const event = {
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
    async publishAgentUnpublished(agentId) {
        const deprecationTimestamp = new Date().toISOString();
        const archivalTimestamp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        const event = {
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
    async publish(channel, data) {
        try {
            const payload = JSON.stringify(data);
            await this.redis.publish(channel, payload);
            this.logger.log(`Published to ${channel}`);
        }
        catch (error) {
            this.logger.error(`Failed to publish to ${channel}:`, error);
            throw error;
        }
    }
    getRedisClient() {
        return this.redis;
    }
    async disconnect() {
        await this.redis.disconnect();
    }
    generateEventId() {
        return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
};
exports.EventBusService = EventBusService;
exports.EventBusService = EventBusService = EventBusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EventBusService);
//# sourceMappingURL=event-bus.service.js.map