import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @SkipAuth()
  async getHealth() {
    const dbHealth = await this.prisma.healthCheck();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealth ? 'healthy' : 'unhealthy',
      },
      uptime: process.uptime(),
    };
  }

  @Get('db')
  @SkipAuth()
  async getDatabaseHealth() {
    const isHealthy = await this.prisma.healthCheck();
    const connectionInfo = this.prisma.getConnectionInfo();

    return {
      healthy: isHealthy,
      connection: connectionInfo,
      timestamp: new Date().toISOString(),
    };
  }
}
