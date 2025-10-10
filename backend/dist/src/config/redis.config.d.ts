import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export declare class RedisConfigService {
    private configService;
    private readonly redis;
    constructor(configService: ConfigService);
    getClient(): Redis;
    disconnect(): Promise<void>;
}
