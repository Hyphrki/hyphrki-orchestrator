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
var DashboardMetricsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardMetricsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
let DashboardMetricsService = DashboardMetricsService_1 = class DashboardMetricsService {
    configService;
    prisma;
    logger = new common_1.Logger(DashboardMetricsService_1.name);
    prometheusUrl;
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.prometheusUrl = this.configService.get('PROMETHEUS_URL') || 'http://localhost:9090';
    }
    async getOverviewMetrics() {
        try {
            const [totalAgents, publishedAgents, totalUsers, totalExecutions, totalDeployments,] = await Promise.all([
                this.prisma.agent.count(),
                this.prisma.agent.count({ where: { status: 'active' } }),
                this.prisma.user.count(),
                this.prisma.workflowExecution.count(),
                this.prisma.marketplaceIntegration.count(),
            ]);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const activeUsers = await this.prisma.user.count({
                where: {
                    lastLoginAt: {
                        gte: thirtyDaysAgo,
                    },
                },
            });
            const recentExecutions = await this.prisma.workflowExecution.findMany({
                where: {
                    startedAt: {
                        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    },
                },
                select: {
                    status: true,
                    startedAt: true,
                    completedAt: true,
                },
            });
            const completedExecutions = recentExecutions.filter(e => e.status === 'completed');
            const successRate = recentExecutions.length > 0
                ? (completedExecutions.length / recentExecutions.length) * 100
                : 0;
            const completedWithTimes = completedExecutions.filter(e => e.completedAt && e.startedAt);
            const avgExecutionTime = completedWithTimes.length > 0
                ? completedWithTimes.reduce((sum, exec) => {
                    const duration = exec.completedAt.getTime() - exec.startedAt.getTime();
                    return sum + duration;
                }, 0) / completedWithTimes.length / 1000
                : 0;
            return {
                totalAgents,
                publishedAgents,
                totalUsers,
                activeUsers,
                totalExecutions,
                totalDeployments,
                successRate: Math.round(successRate * 100) / 100,
                avgExecutionTime: Math.round(avgExecutionTime * 100) / 100,
            };
        }
        catch (error) {
            this.logger.error('Error fetching overview metrics:', error);
            throw error;
        }
    }
    async getAgentMetrics(timeRange) {
        try {
            const now = new Date();
            const timeRangeMs = this.parseTimeRange(timeRange);
            const startTime = new Date(now.getTime() - timeRangeMs);
            const executionRate = this.generateMockTimeSeries(startTime, now, 5 * 60 * 1000, () => Math.random() * 10 + 5);
            const successRate = this.generateMockTimeSeries(startTime, now, 5 * 60 * 1000, () => Math.random() * 20 + 80);
            const frameworkStats = await this.prisma.agent.groupBy({
                by: ['framework'],
                _count: {
                    id: true,
                },
            });
            const frameworkBreakdown = frameworkStats.map(stat => ({
                framework: stat.framework,
                count: stat._count.id,
            }));
            const statusStats = await this.prisma.agent.groupBy({
                by: ['status'],
                _count: {
                    id: true,
                },
            });
            const statusBreakdown = statusStats.map(stat => ({
                status: stat.status,
                count: stat._count.id,
            }));
            return {
                executionRate,
                successRate,
                frameworkBreakdown,
                statusBreakdown,
            };
        }
        catch (error) {
            this.logger.error('Error fetching agent metrics:', error);
            throw error;
        }
    }
    async getSystemMetrics(timeRange) {
        try {
            const now = new Date();
            const timeRangeMs = this.parseTimeRange(timeRange);
            const startTime = new Date(now.getTime() - timeRangeMs);
            const cpuUsage = this.generateMockTimeSeries(startTime, now, 1 * 60 * 1000, () => Math.random() * 30 + 20).map(d => ({ timestamp: d.timestamp, usage: d.rate }));
            const memoryUsage = this.generateMockTimeSeries(startTime, now, 1 * 60 * 1000, () => Math.random() * 40 + 30).map(d => ({ timestamp: d.timestamp, usage: d.rate }));
            const databaseConnections = this.generateMockTimeSeries(startTime, now, 1 * 60 * 1000, () => Math.floor(Math.random() * 10 + 5)).map(d => ({ timestamp: d.timestamp, connections: d.rate }));
            const httpRequestRate = this.generateMockTimeSeries(startTime, now, 1 * 60 * 1000, () => Math.random() * 50 + 10);
            return {
                cpuUsage,
                memoryUsage,
                databaseConnections,
                httpRequestRate,
            };
        }
        catch (error) {
            this.logger.error('Error fetching system metrics:', error);
            throw error;
        }
    }
    async getExecutionMetrics(timeRange) {
        try {
            const now = new Date();
            const timeRangeMs = this.parseTimeRange(timeRange);
            const startTime = new Date(now.getTime() - timeRangeMs);
            const executions = await this.prisma.workflowExecution.findMany({
                where: {
                    startedAt: {
                        gte: startTime,
                    },
                },
                select: {
                    status: true,
                    startedAt: true,
                    completedAt: true,
                },
                orderBy: {
                    startedAt: 'asc',
                },
            });
            const intervalMs = Math.max(timeRangeMs / 20, 5 * 60 * 1000);
            const intervals = this.createTimeIntervals(startTime, now, intervalMs);
            const totalExecutions = intervals.map(interval => ({
                timestamp: interval.start.toISOString(),
                count: executions.filter(e => e.startedAt >= interval.start && e.startedAt < interval.end).length,
            }));
            const completedExecutions = intervals.map(interval => ({
                timestamp: interval.start.toISOString(),
                count: executions.filter(e => e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'completed').length,
            }));
            const failedExecutions = intervals.map(interval => ({
                timestamp: interval.start.toISOString(),
                count: executions.filter(e => e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'failed').length,
            }));
            const avgResponseTime = intervals.map(interval => {
                const intervalExecutions = executions.filter(e => e.startedAt >= interval.start && e.startedAt < interval.end &&
                    e.status === 'completed' && e.completedAt);
                const avgTime = intervalExecutions.length > 0
                    ? intervalExecutions.reduce((sum, exec) => {
                        const duration = exec.completedAt.getTime() - exec.startedAt.getTime();
                        return sum + duration;
                    }, 0) / intervalExecutions.length / 1000
                    : 0;
                return {
                    timestamp: interval.start.toISOString(),
                    time: Math.round(avgTime * 100) / 100,
                };
            });
            return {
                totalExecutions,
                completedExecutions,
                failedExecutions,
                avgResponseTime,
            };
        }
        catch (error) {
            this.logger.error('Error fetching execution metrics:', error);
            throw error;
        }
    }
    parseTimeRange(timeRange) {
        const unit = timeRange.slice(-1);
        const value = parseInt(timeRange.slice(0, -1));
        switch (unit) {
            case 'm': return value * 60 * 1000;
            case 'h': return value * 60 * 60 * 1000;
            case 'd': return value * 24 * 60 * 60 * 1000;
            default: return 60 * 60 * 1000;
        }
    }
    generateMockTimeSeries(startTime, endTime, intervalMs, valueGenerator) {
        const series = [];
        let currentTime = new Date(startTime);
        while (currentTime < endTime) {
            series.push({
                timestamp: currentTime.toISOString(),
                rate: valueGenerator(),
            });
            currentTime = new Date(currentTime.getTime() + intervalMs);
        }
        return series;
    }
    createTimeIntervals(startTime, endTime, intervalMs) {
        const intervals = [];
        let currentTime = new Date(startTime);
        while (currentTime < endTime) {
            const nextTime = new Date(currentTime.getTime() + intervalMs);
            intervals.push({
                start: new Date(currentTime),
                end: nextTime > endTime ? endTime : nextTime,
            });
            currentTime = nextTime;
        }
        return intervals;
    }
};
exports.DashboardMetricsService = DashboardMetricsService;
exports.DashboardMetricsService = DashboardMetricsService = DashboardMetricsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], DashboardMetricsService);
//# sourceMappingURL=dashboard-metrics.service.js.map