import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Header,
  UseGuards,
  Response,
} from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { AnalyticsService, AnalyticsData, UsageMetrics } from './analytics.service';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getAnalytics(
    @User('id') userId: string,
    @Query('period') period: '7d' | '30d' | '90d' = '30d',
  ) {
    return this.analyticsService.getUserAnalytics(userId, period);
  }

  @Get('metrics')
  async getUsageMetrics(
    @User('id') userId: string,
    @Query('period') period: '7d' | '30d' | '90d' = '30d',
  ) {
    return this.analyticsService.getUsageMetrics(userId, period);
  }

  @Post('export')
  async exportAnalytics(
    @User('id') userId: string,
    @Query('format') format: 'json' | 'csv' = 'json',
    @Query('period') period: '7d' | '30d' | '90d' = '30d',
    @Response() res: ExpressResponse,
  ) {
    const data = await this.analyticsService.exportAnalytics(userId, format, period);

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="analytics-${userId}-${period}.csv"`);
      res.send(data);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="analytics-${userId}-${period}.json"`);
      res.json(data);
    }
  }

  @Get('dashboard')
  async getDashboardData(@User('id') userId: string) {
    // Get combined dashboard analytics
    const [analytics, metrics] = await Promise.all([
      this.analyticsService.getUserAnalytics(userId, '30d'),
      this.analyticsService.getUsageMetrics(userId, '7d'),
    ]);

    return {
      summary: analytics,
      recentActivity: metrics.slice(-7), // Last 7 days
      trends: this.calculateTrends(metrics),
    };
  }

  private calculateTrends(metrics: any[]) {
    if (metrics.length < 2) return { executions: 0, computeTime: 0 };

    const recent = metrics.slice(-7);
    const previous = metrics.slice(-14, -7);

    const recentAvg = {
      executions: recent.reduce((sum, m) => sum + m.executions, 0) / recent.length,
      computeTime: recent.reduce((sum, m) => sum + m.computeTime, 0) / recent.length,
    };

    const previousAvg = {
      executions: previous.reduce((sum, m) => sum + m.executions, 0) / Math.max(previous.length, 1),
      computeTime: previous.reduce((sum, m) => sum + m.computeTime, 0) / Math.max(previous.length, 1),
    };

    return {
      executions: previousAvg.executions > 0
        ? ((recentAvg.executions - previousAvg.executions) / previousAvg.executions) * 100
        : 0,
      computeTime: previousAvg.computeTime > 0
        ? ((recentAvg.computeTime - previousAvg.computeTime) / previousAvg.computeTime) * 100
        : 0,
    };
  }
}
