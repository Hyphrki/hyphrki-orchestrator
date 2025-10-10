import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class TracingService implements OnModuleInit {
    private configService;
    private sdk;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    private initializeTracing;
    onModuleDestroy(): Promise<void>;
}
