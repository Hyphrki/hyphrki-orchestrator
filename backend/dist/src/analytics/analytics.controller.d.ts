import type { Response as ExpressResponse } from 'express';
import { AnalyticsService, AnalyticsData, UsageMetrics } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getAnalytics(userId: string, period?: '7d' | '30d' | '90d'): Promise<AnalyticsData>;
    getUsageMetrics(userId: string, period?: '7d' | '30d' | '90d'): Promise<UsageMetrics[]>;
    exportAnalytics(userId: string, format: "json" | "csv" | undefined, period: "7d" | "30d" | "90d" | undefined, res: ExpressResponse): Promise<void>;
    getDashboardData(userId: string): Promise<{
        summary: AnalyticsData;
        recentActivity: UsageMetrics[];
        trends: {
            executions: number;
            computeTime: number;
        };
    }>;
    private calculateTrends;
}
