import { Injectable, Logger } from '@nestjs/common';
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
  executionRate: Array<{ timestamp: string; rate: number }>;
  successRate: Array<{ timestamp: string; rate: number }>;
  frameworkBreakdown: Array<{ framework: string; count: number }>;
  statusBreakdown: Array<{ status: string; count: number }>;
}

export interface SystemMetrics {
  cpuUsage: Array<{ timestamp: string; usage: number }>;
  memoryUsage: Array<{ timestamp: string; usage: number }>;
  databaseConnections: Array<{ timestamp: string; connections: number }>;
  httpRequestRate: Array<{ timestamp: string; rate: number }>;
}

export interface ExecutionMetrics {
  totalExecutions: Array<{ timestamp: string; count: number }>;
  completedExecutions: Array<{ timestamp: string; count: number }>;
  failedExecutions: Array<{ timestamp: string; count: number }>;
  avgResponseTime: Array<{ timestamp: string; time: number }>;
}

@Injectable()
export class DashboardMetricsService {
  private readonly logger = new Logger(DashboardMetricsService.name);
  private readonly prometheusUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.prometheusUrl = this.configService.get<string>('PROMETHEUS_URL') || 'http://localhost:9090';
  }

  async getOverviewMetrics(): Promise<OverviewMetrics> {
    try {
      // Get counts from database
      const [
        totalAgents,
        publishedAgents,
        totalUsers,
        totalExecutions,
        totalDeployments,
      ] = await Promise.all([
        this.prisma.agent.count(),
        this.prisma.agent.count({ where: { status: 'active' } }),
        this.prisma.user.count(),
        this.prisma.workflowExecution.count(),
        this.prisma.marketplaceIntegration.count(),
      ]);

      // Get active users (logged in within last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const activeUsers = await this.prisma.user.count({
        where: {
          lastLoginAt: {
            gte: thirtyDaysAgo,
          },
        },
      });

      // Calculate success rate from recent executions
      const recentExecutions = await this.prisma.workflowExecution.findMany({
        where: {
          startedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
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

      // Calculate average execution time
      const completedWithTimes = completedExecutions.filter(e => e.completedAt && e.startedAt);
      const avgExecutionTime = completedWithTimes.length > 0
        ? completedWithTimes.reduce((sum, exec) => {
            const duration = exec.completedAt!.getTime() - exec.startedAt!.getTime();
            return sum + duration;
          }, 0) / completedWithTimes.length / 1000 // Convert to seconds
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
    } catch (error) {
      this.logger.error('Error fetching overview metrics:', error);
      throw error;
    }
  }

  async getAgentMetrics(timeRange: string): Promise<AgentMetrics> {
    try {
      // For now, return mock data structure - will be replaced with Prometheus queries
      const now = new Date();
      const timeRangeMs = this.parseTimeRange(timeRange);
      const startTime = new Date(now.getTime() - timeRangeMs);

      // Mock execution rate data (will be replaced with Prometheus query)
      const executionRate = this.generateMockTimeSeries(startTime, now, 5 * 60 * 1000, () => Math.random() * 10 + 5);
      
      // Mock success rate data
      const successRate = this.generateMockTimeSeries(startTime, now, 5 * 60 * 1000, () => Math.random() * 20 + 80);

      // Get framework breakdown from database
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

      // Get status breakdown from database
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
    } catch (error) {
      this.logger.error('Error fetching agent metrics:', error);
      throw error;
    }
  }

  async getSystemMetrics(timeRange: string): Promise<SystemMetrics> {
    try {
      const now = new Date();
      const timeRangeMs = this.parseTimeRange(timeRange);
      const startTime = new Date(now.getTime() - timeRangeMs);

      // Mock system metrics (will be replaced with Prometheus queries)
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
    } catch (error) {
      this.logger.error('Error fetching system metrics:', error);
      throw error;
    }
  }

  async getExecutionMetrics(timeRange: string): Promise<ExecutionMetrics> {
    try {
      const now = new Date();
      const timeRangeMs = this.parseTimeRange(timeRange);
      const startTime = new Date(now.getTime() - timeRangeMs);

      // Get execution data from database
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

      // Group executions by time intervals
      const intervalMs = Math.max(timeRangeMs / 20, 5 * 60 * 1000); // At least 5-minute intervals
      const intervals = this.createTimeIntervals(startTime, now, intervalMs);

      const totalExecutions = intervals.map(interval => ({
        timestamp: interval.start.toISOString(),
        count: executions.filter(e => 
          e.startedAt >= interval.start && e.startedAt < interval.end
        ).length,
      }));

      const completedExecutions = intervals.map(interval => ({
        timestamp: interval.start.toISOString(),
        count: executions.filter(e => 
          e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'completed'
        ).length,
      }));

      const failedExecutions = intervals.map(interval => ({
        timestamp: interval.start.toISOString(),
        count: executions.filter(e => 
          e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'failed'
        ).length,
      }));

      const avgResponseTime = intervals.map(interval => {
        const intervalExecutions = executions.filter(e => 
          e.startedAt >= interval.start && e.startedAt < interval.end && 
          e.status === 'completed' && e.completedAt
        );
        
        const avgTime = intervalExecutions.length > 0
          ? intervalExecutions.reduce((sum, exec) => {
              const duration = exec.completedAt!.getTime() - exec.startedAt!.getTime();
              return sum + duration;
            }, 0) / intervalExecutions.length / 1000 // Convert to seconds
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
    } catch (error) {
      this.logger.error('Error fetching execution metrics:', error);
      throw error;
    }
  }

  private parseTimeRange(timeRange: string): number {
    const unit = timeRange.slice(-1);
    const value = parseInt(timeRange.slice(0, -1));
    
    switch (unit) {
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return 60 * 60 * 1000; // Default to 1 hour
    }
  }

  private generateMockTimeSeries(startTime: Date, endTime: Date, intervalMs: number, valueGenerator: () => number) {
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

  private createTimeIntervals(startTime: Date, endTime: Date, intervalMs: number) {
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
}
