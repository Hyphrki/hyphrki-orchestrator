import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { DashboardMetricsService } from './services/dashboard-metrics.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MetricsController],
  providers: [DashboardMetricsService],
  exports: [DashboardMetricsService],
})
export class MetricsModule {}