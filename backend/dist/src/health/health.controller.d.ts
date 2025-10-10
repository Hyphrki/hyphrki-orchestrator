import { PrismaService } from '../database/prisma.service';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        services: {
            database: string;
        };
        uptime: number;
    }>;
    getDatabaseHealth(): Promise<{
        healthy: boolean;
        connection: {
            isConnected: boolean;
            connectionString: string;
        };
        timestamp: string;
    }>;
}
