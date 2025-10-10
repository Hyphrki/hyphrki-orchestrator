import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
export interface OverviewMetrics {
    totalAgents: number;
    publishedAgents: number;
    totalUsers: number;
    activeUsers: number;
    totalExecutions: number;
    totalDeployments: number;
    successRate: number;
    avgExecutionTime: number;
}
export interface AgentMetrics {
    executionRate: Array<{
        timestamp: string;
        rate: number;
    }>;
    successRate: Array<{
        timestamp: string;
        rate: number;
    }>;
    frameworkBreakdown: Array<{
        framework: string;
        count: number;
    }>;
    statusBreakdown: Array<{
        status: string;
        count: number;
    }>;
}
export interface SystemMetrics {
    cpuUsage: Array<{
        timestamp: string;
        usage: number;
    }>;
    memoryUsage: Array<{
        timestamp: string;
        usage: number;
    }>;
    databaseConnections: Array<{
        timestamp: string;
        connections: number;
    }>;
    httpRequestRate: Array<{
        timestamp: string;
        rate: number;
    }>;
}
export interface ExecutionMetrics {
    totalExecutions: Array<{
        timestamp: string;
        count: number;
    }>;
    completedExecutions: Array<{
        timestamp: string;
        count: number;
    }>;
    failedExecutions: Array<{
        timestamp: string;
        count: number;
    }>;
    avgResponseTime: Array<{
        timestamp: string;
        time: number;
    }>;
}
export declare class DashboardMetricsService {
    private readonly configService;
    private readonly prisma;
    private readonly logger;
    private readonly prometheusUrl;
    constructor(configService: ConfigService, prisma: PrismaService);
    getOverviewMetrics(): Promise<OverviewMetrics>;
    getAgentMetrics(timeRange: string): Promise<AgentMetrics>;
    getSystemMetrics(timeRange: string): Promise<SystemMetrics>;
    getExecutionMetrics(timeRange: string): Promise<ExecutionMetrics>;
    private parseTimeRange;
    private generateMockTimeSeries;
    private createTimeIntervals;
}
