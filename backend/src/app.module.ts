import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { AgentsModule } from './agents/agents.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { ExecutionsModule } from './executions/executions.module';
import { FrameworksModule } from './frameworks/frameworks.module';
import { SecurityModule } from './security/security.module';
import { LoggingModule } from './logging/logging.module';
import { MetricsModule } from './metrics/metrics.module';
import { TracingModule } from './tracing/tracing.module';
import { WebSocketModule } from './websocket/websocket.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AdminModule } from './admin/admin.module';
import { DeploymentsModule } from './deployments/deployments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    LoggingModule,
    MetricsModule,
    // TracingModule, // Temporarily disabled - needs debugging
    DatabaseModule,
    // SecurityModule,
    HealthModule,
    AuthModule.forRoot(),
    UsersModule,
    OrganizationsModule,
    AgentsModule,
    WorkflowsModule,
    ExecutionsModule,
    FrameworksModule,
    WebSocketModule,
    AnalyticsModule,
    AdminModule,
    DeploymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
