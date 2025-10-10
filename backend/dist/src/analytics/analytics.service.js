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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const workflow_execution_repository_1 = require("../database/repositories/workflow-execution.repository");
const agent_repository_1 = require("../database/repositories/agent.repository");
const user_repository_1 = require("../database/repositories/user.repository");
let AnalyticsService = class AnalyticsService {
    prisma;
    executionRepository;
    agentRepository;
    userRepository;
    constructor(prisma, executionRepository, agentRepository, userRepository) {
        this.prisma = prisma;
        this.executionRepository = executionRepository;
        this.agentRepository = agentRepository;
        this.userRepository = userRepository;
    }
    async getUserAnalytics(userId, period = '30d') {
        const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const userAgents = await this.getUserAgentIds(userId);
        const executionStats = await this.getExecutionStats(userAgents, startDate);
        const agentStats = await this.getAgentStats(userId);
        const usageStats = await this.getUsageStats(userAgents, startDate);
        return {
            period,
            executions: executionStats,
            agents: agentStats,
            usage: usageStats,
        };
    }
    async getUsageMetrics(userId, period = '30d') {
        const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const userAgents = await this.getUserAgentIds(userId);
        const metrics = [];
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);
            const dailyExecutions = await this.prisma.workflowExecution.findMany({
                where: {
                    agentId: { in: userAgents },
                    startedAt: {
                        gte: date,
                        lt: nextDate,
                    },
                },
                select: {
                    status: true,
                    resourceUsage: true,
                    startedAt: true,
                    completedAt: true,
                },
            });
            const executions = dailyExecutions.length;
            const computeTime = dailyExecutions.reduce((sum, exec) => {
                const usage = exec.resourceUsage;
                return sum + (usage?.cpu_time || 0);
            }, 0);
            const memoryUsage = dailyExecutions.reduce((sum, exec) => {
                const usage = exec.resourceUsage;
                return sum + (usage?.memory_peak || 0);
            }, 0);
            const apiCalls = executions;
            metrics.push({
                date: date.toISOString().split('T')[0],
                executions,
                computeTime,
                memoryUsage,
                apiCalls,
            });
        }
        return metrics;
    }
    async exportAnalytics(userId, format = 'json', period = '30d') {
        const analytics = await this.getUserAnalytics(userId, period);
        const usageMetrics = await this.getUsageMetrics(userId, period);
        const data = {
            generatedAt: new Date().toISOString(),
            userId,
            period,
            summary: analytics,
            dailyMetrics: usageMetrics,
        };
        if (format === 'csv') {
            return this.convertToCSV(data);
        }
        return data;
    }
    async getUserAgentIds(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            return [];
        const agentIds = [];
        const userAgents = await this.agentRepository.findMany({
            where: { ownerType: 'user', ownerId: userId },
        });
        agentIds.push(...userAgents.map((a) => a.id));
        for (const member of user.organizationMembers || []) {
            const orgAgents = await this.agentRepository.findMany({
                where: { ownerType: 'organization', ownerId: member.organization.id },
            });
            agentIds.push(...orgAgents.map((a) => a.id));
        }
        return agentIds;
    }
    async getExecutionStats(agentIds, startDate) {
        const executions = await this.prisma.workflowExecution.findMany({
            where: {
                agentId: { in: agentIds },
                startedAt: { gte: startDate },
            },
            select: {
                status: true,
                startedAt: true,
                completedAt: true,
                resourceUsage: true,
            },
        });
        const total = executions.length;
        const completed = executions.filter((e) => e.status === 'completed').length;
        const failed = executions.filter((e) => e.status === 'failed').length;
        const running = executions.filter((e) => e.status === 'running').length;
        const queued = executions.filter((e) => e.status === 'queued').length;
        const completedExecutions = executions.filter((e) => e.status === 'completed' && e.completedAt && e.startedAt);
        const avgExecutionTime = completedExecutions.length > 0
            ? completedExecutions.reduce((sum, exec) => {
                const duration = exec.completedAt.getTime() - exec.startedAt.getTime();
                return sum + duration;
            }, 0) / completedExecutions.length / 1000
            : 0;
        const successRate = total > 0 ? (completed / total) * 100 : 0;
        return {
            total,
            completed,
            failed,
            running,
            queued,
            avgDuration: avgExecutionTime,
            successRate,
        };
    }
    async getAgentStats(userId) {
        const userAgents = await this.getUserAgentIds(userId);
        const agents = await this.prisma.agent.findMany({
            where: { id: { in: userAgents } },
            select: {
                framework: true,
                status: true,
            },
        });
        const total = agents.length;
        const active = agents.filter((a) => a.status === 'active').length;
        const byFramework = {};
        agents.forEach((agent) => {
            byFramework[agent.framework] = (byFramework[agent.framework] || 0) + 1;
        });
        return {
            total,
            active,
            byFramework,
        };
    }
    async getUsageStats(agentIds, startDate) {
        const executions = await this.prisma.workflowExecution.findMany({
            where: {
                agentId: { in: agentIds },
                startedAt: { gte: startDate },
                status: 'completed',
            },
            select: {
                resourceUsage: true,
            },
        });
        const totalComputeTime = executions.reduce((sum, exec) => {
            const usage = exec.resourceUsage;
            return sum + (usage?.cpu_time || 0);
        }, 0);
        const totalMemoryUsage = executions.reduce((sum, exec) => {
            const usage = exec.resourceUsage;
            return sum + (usage?.memory_peak || 0);
        }, 0);
        const apiCalls = executions.length;
        return {
            totalComputeTime,
            totalMemoryUsage,
            apiCalls,
        };
    }
    convertToCSV(data) {
        const headers = ['Date', 'Executions', 'Compute Time (ms)', 'Memory Usage (MB)', 'API Calls'];
        const rows = data.dailyMetrics.map((metric) => [
            metric.date,
            metric.executions,
            metric.computeTime,
            (metric.memoryUsage / 1024 / 1024).toFixed(2),
            metric.apiCalls,
        ]);
        const csvContent = [
            headers.join(','),
            ...rows.map((row) => row.join(',')),
        ].join('\n');
        return csvContent;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workflow_execution_repository_1.WorkflowExecutionRepository,
        agent_repository_1.AgentRepository,
        user_repository_1.UserRepository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map