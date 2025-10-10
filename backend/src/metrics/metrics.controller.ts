import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardMetricsService } from './services/dashboard-metrics.service';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('metrics')
@UseGuards(AdminGuard)
export class MetricsController {
  constructor(private readonly dashboardMetricsService: DashboardMetricsService) {}

  @Get('overview')
  async getOverviewMetrics() {
    return this.dashboardMetricsService.getOverviewMetrics();
  }

  @Get('agents')
  async getAgentMetrics(@Query('timeRange') timeRange: string = '1h') {
    return this.dashboardMetricsService.getAgentMetrics(timeRange);
  }

  @Get('system')
  async getSystemMetrics(@Query('timeRange') timeRange: string = '1h') {
    return this.dashboardMetricsService.getSystemMetrics(timeRange);
  }

  @Get('executions')
  async getExecutionMetrics(@Query('timeRange') timeRange: string = '1h') {
    return this.dashboardMetricsService.getExecutionMetrics(timeRange);
  }
}