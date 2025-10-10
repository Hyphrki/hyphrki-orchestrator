import { Injectable } from '@nestjs/common';
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
    byFramework: { [key: string]: number };
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

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly executionRepository: WorkflowExecutionRepository,
    private readonly agentRepository: AgentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserAnalytics(userId: string, period: '7d' | '30d' | '90d' = '30d'): Promise<AnalyticsData> {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get user's agents
    const userAgents = await this.getUserAgentIds(userId);

    // Get execution statistics
    const executionStats = await this.getExecutionStats(userAgents, startDate);

    // Get agent statistics
    const agentStats = await this.getAgentStats(userId);

    // Get usage metrics
    const usageStats = await this.getUsageStats(userAgents, startDate);

    return {
      period,
      executions: executionStats,
      agents: agentStats,
      usage: usageStats,
    };
  }

  async getUsageMetrics(userId: string, period: '7d' | '30d' | '90d' = '30d'): Promise<UsageMetrics[]> {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const userAgents = await this.getUserAgentIds(userId);

    const metrics: UsageMetrics[] = [];

    // Generate daily metrics for the period
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
      const computeTime = dailyExecutions.reduce((sum: number, exec: any) => {
        const usage = exec.resourceUsage as any;
        return sum + (usage?.cpu_time || 0);
      }, 0);

      const memoryUsage = dailyExecutions.reduce((sum: number, exec: any) => {
        const usage = exec.resourceUsage as any;
        return sum + (usage?.memory_peak || 0);
      }, 0);

      // For now, API calls are approximated by executions
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

  async exportAnalytics(userId: string, format: 'json' | 'csv' = 'json', period: '7d' | '30d' | '90d' = '30d') {
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

  private async getUserAgentIds(userId: string): Promise<string[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) return [];

    const agentIds: string[] = [];

    // Add user-owned agents
    const userAgents = await this.agentRepository.findMany({
      where: { ownerType: 'user', ownerId: userId },
    });
    agentIds.push(...userAgents.map((a: any) => a.id));

    // Add organization-owned agents where user is a member
    for (const member of user.organizationMembers || []) {
      const orgAgents = await this.agentRepository.findMany({
        where: { ownerType: 'organization', ownerId: member.organization.id },
      });
      agentIds.push(...orgAgents.map((a: any) => a.id));
    }

    return agentIds;
  }

  private async getExecutionStats(agentIds: string[], startDate: Date) {
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
    const completed = executions.filter((e: any) => e.status === 'completed').length;
    const failed = executions.filter((e: any) => e.status === 'failed').length;
    const running = executions.filter((e: any) => e.status === 'running').length;
    const queued = executions.filter((e: any) => e.status === 'queued').length;

    // Calculate average execution time
    const completedExecutions = executions.filter((e: any) => e.status === 'completed' && e.completedAt && e.startedAt);
    const avgExecutionTime = completedExecutions.length > 0
      ? completedExecutions.reduce((sum: number, exec: any) => {
          const duration = exec.completedAt!.getTime() - exec.startedAt!.getTime();
          return sum + duration;
        }, 0) / completedExecutions.length / 1000 // Convert to seconds
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

  private async getAgentStats(userId: string) {
    const userAgents = await this.getUserAgentIds(userId);

    const agents = await this.prisma.agent.findMany({
      where: { id: { in: userAgents } },
      select: {
        framework: true,
        status: true,
      },
    });

    const total = agents.length;
    const active = agents.filter((a: any) => a.status === 'active').length;

    const byFramework: { [key: string]: number } = {};
    agents.forEach((agent: any) => {
      byFramework[agent.framework] = (byFramework[agent.framework] || 0) + 1;
    });

    return {
      total,
      active,
      byFramework,
    };
  }

  private async getUsageStats(agentIds: string[], startDate: Date) {
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

    const totalComputeTime = executions.reduce((sum: number, exec: any) => {
      const usage = exec.resourceUsage as any;
      return sum + (usage?.cpu_time || 0);
    }, 0);

    const totalMemoryUsage = executions.reduce((sum: number, exec: any) => {
      const usage = exec.resourceUsage as any;
      return sum + (usage?.memory_peak || 0);
    }, 0);

    // For now, approximate API calls as executions
    const apiCalls = executions.length;

    return {
      totalComputeTime,
      totalMemoryUsage,
      apiCalls,
    };
  }

  private convertToCSV(data: any): string {
    const headers = ['Date', 'Executions', 'Compute Time (ms)', 'Memory Usage (MB)', 'API Calls'];
    const rows = data.dailyMetrics.map((metric: UsageMetrics) => [
      metric.date,
      metric.executions,
      metric.computeTime,
      (metric.memoryUsage / 1024 / 1024).toFixed(2), // Convert to MB
      metric.apiCalls,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: any[]) => row.join(',')),
    ].join('\n');

    return csvContent;
  }
}
