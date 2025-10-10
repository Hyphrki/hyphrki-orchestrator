import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      console.log('Connecting to database...');
      await this.$connect();
      console.log('Database connected successfully');

      // TODO: Set up middleware for metrics collection after connection
      // this.setupMetricsMiddleware();
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Metrics middleware removed to avoid circular dependencies
  // TODO: Re-implement metrics collection without circular dependency

  // Health check method for database connectivity
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Connection pool status
  getConnectionInfo() {
    return {
      isConnected: true, // Prisma manages connections internally
      connectionString: 'configured', // Connection string is configured in environment
    };
  }
}
