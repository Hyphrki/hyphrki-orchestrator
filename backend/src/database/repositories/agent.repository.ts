import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Agent, Prisma } from '@prisma/client';

@Injectable()
export class AgentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Agent | null> {
    return this.prisma.agent.findUnique({
      where: { id },
      include: {
        userOwner: true,
        orgOwner: true,
        workflows: true,
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        marketplaceIntegrations: true,
        containerResources: true,
      },
    });
  }

  async findByOwner(ownerType: string, ownerId: string): Promise<Agent[]> {
    return this.prisma.agent.findMany({
      where: {
        ownerType,
        ownerId,
      },
      include: {
        userOwner: true,
        orgOwner: true,
        workflows: true,
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.AgentCreateInput): Promise<Agent> {
    return this.prisma.agent.create({
      data,
      include: {
        userOwner: true,
        orgOwner: true,
        workflows: true,
        executions: true,
        marketplaceIntegrations: true,
        containerResources: true,
      },
    });
  }

  async update(id: string, data: Prisma.AgentUpdateInput): Promise<Agent> {
    return this.prisma.agent.update({
      where: { id },
      data,
      include: {
        userOwner: true,
        orgOwner: true,
        workflows: true,
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        marketplaceIntegrations: true,
        containerResources: true,
      },
    });
  }

  async delete(id: string): Promise<Agent> {
    return this.prisma.agent.delete({
      where: { id },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.AgentWhereInput;
    orderBy?: Prisma.AgentOrderByWithRelationInput;
  }): Promise<Agent[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.agent.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        userOwner: true,
        orgOwner: true,
        workflows: true,
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
  }

  async count(where?: Prisma.AgentWhereInput): Promise<number> {
    return this.prisma.agent.count({ where });
  }

  // Framework-specific methods
  async findByFramework(framework: string): Promise<Agent[]> {
    return this.prisma.agent.findMany({
      where: { framework },
      include: {
        userOwner: true,
        orgOwner: true,
        workflows: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Status management
  async updateStatus(
    id: string,
    status: string,
    metadata?: any,
  ): Promise<Agent> {
    return this.prisma.agent.update({
      where: { id },
      data: {
        status,
        ...(metadata && { metadata }),
        ...(status === 'deployed' && { deployedAt: new Date() }),
      },
      include: {
        userOwner: true,
        orgOwner: true,
      },
    });
  }

  // Container management
  async updateContainerInfo(
    id: string,
    containerId: string,
    resourceLimits?: any,
  ): Promise<Agent> {
    return this.prisma.agent.update({
      where: { id },
      data: {
        containerId,
        ...(resourceLimits && { resourceLimits }),
        status: 'active',
        deployedAt: new Date(),
      },
      include: {
        containerResources: true,
      },
    });
  }

  // Statistics
  async getAgentStats(agentId: string): Promise<{
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    avgExecutionTime: number;
  }> {
    const executions = await this.prisma.workflowExecution.findMany({
      where: { agentId },
      select: {
        status: true,
        startedAt: true,
        completedAt: true,
        performanceMetrics: true,
      },
    });

    const totalExecutions = executions.length;
    const successfulExecutions = executions.filter(
      (e: { status: string }) => e.status === 'completed',
    ).length;
    const failedExecutions = executions.filter((e: { status: string }) =>
      ['failed', 'timeout'].includes(e.status),
    ).length;

    const completedExecutions = executions.filter(
      (e: { completedAt: Date | null; startedAt: Date }) => e.completedAt && e.startedAt,
    ) as { completedAt: Date; startedAt: Date }[];
    const avgExecutionTime =
      completedExecutions.length > 0
        ? completedExecutions.reduce(
            (acc: number, e: { completedAt: Date; startedAt: Date }) =>
              acc +
              (new Date(e.completedAt!).getTime() -
                new Date(e.startedAt).getTime()),
            0,
          ) / completedExecutions.length
        : 0;

    return {
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      avgExecutionTime,
    };
  }
}
