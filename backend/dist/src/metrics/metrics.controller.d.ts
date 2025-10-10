import { DashboardMetricsService } from './services/dashboard-metrics.service';
export declare class MetricsController {
    private readonly dashboardMetricsService;
    constructor(dashboardMetricsService: DashboardMetricsService);
    getOverviewMetrics(): Promise<import("./services/dashboard-metrics.service").OverviewMetrics>;
    getAgentMetrics(timeRange?: string): Promise<import("./services/dashboard-metrics.service").AgentMetrics>;
    getSystemMetrics(timeRange?: string): Promise<import("./services/dashboard-metrics.service").SystemMetrics>;
    getExecutionMetrics(timeRange?: string): Promise<import("./services/dashboard-metrics.service").ExecutionMetrics>;
}
