import { PrismaService } from '../database/prisma.service';
import { WorkflowExecutionRepository } from '../database/repositories/workflow-execution.repository';
import { AgentRepository } from '../database/repositories/agent.repository';
import { UserRepository } from '../database/repositories/user.repository';
export interface AnalyticsData {
    period: string;
    executions: {
        total: number;
        completed: number;
        failed: number;
        running: number;
        queued: number;
        avgDuration: number;
        successRate: number;
    };
    agents: {
        total: number;
        active: number;
        byFramework: {
            [key: string]: number;
        };
    };
    usage: {
        totalComputeTime: number;
        totalMemoryUsage: number;
        apiCalls: number;
    };
}
export interface UsageMetrics {
    date: string;
    executions: number;
    computeTime: number;
    memoryUsage: number;
    apiCalls: number;
}
export declare class AnalyticsService {
    private readonly prisma;
    private readonly executionRepository;
    private readonly agentRepository;
    private readonly userRepository;
    constructor(prisma: PrismaService, executionRepository: WorkflowExecutionRepository, agentRepository: AgentRepository, userRepository: UserRepository);
    getUserAnalytics(userId: string, period?: '7d' | '30d' | '90d'): Promise<AnalyticsData>;
    getUsageMetrics(userId: string, period?: '7d' | '30d' | '90d'): Promise<UsageMetrics[]>;
    exportAnalytics(userId: string, format?: 'json' | 'csv', period?: '7d' | '30d' | '90d'): Promise<string | {
        generatedAt: string;
        userId: string;
        period: "7d" | "30d" | "90d";
        summary: AnalyticsData;
        dailyMetrics: UsageMetrics[];
    }>;
    private getUserAgentIds;
    private getExecutionStats;
    private getAgentStats;
    private getUsageStats;
    private convertToCSV;
}
