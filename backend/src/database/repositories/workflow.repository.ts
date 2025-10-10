import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Workflow, Prisma } from '@prisma/client';

@Injectable()
export class WorkflowRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Workflow | null> {
    return this.prisma.workflow.findUnique({
      where: { id },
      include: {
        agent: {
          include: {
            userOwner: true,
            orgOwner: true,
          },
        },
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });
  }

  async findByAgentId(agentId: string): Promise<Workflow[]> {
    return this.prisma.workflow.findMany({
      where: { agentId },
      include: {
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.WorkflowCreateInput): Promise<Workflow> {
    return this.prisma.workflow.create({
      data,
      include: {
        agent: {
          include: {
            userOwner: true,
            orgOwner: true,
          },
        },
        executions: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.WorkflowUpdateInput,
  ): Promise<Workflow> {
    return this.prisma.workflow.update({
      where: { id },
      data,
      include: {
        agent: {
          include: {
            userOwner: true,
            orgOwner: true,
          },
        },
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async delete(id: string): Promise<Workflow> {
    return this.prisma.workflow.delete({
      where: { id },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.WorkflowWhereInput;
    orderBy?: Prisma.WorkflowOrderByWithRelationInput;
  }): Promise<Workflow[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.workflow.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        agent: {
          include: {
            userOwner: true,
            orgOwner: true,
          },
        },
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
  }

  async count(where?: Prisma.WorkflowWhereInput): Promise<number> {
    return this.prisma.workflow.count({ where });
  }

  // Version management
  async createVersion(
    workflowId: string,
    workflowData: any,
    version?: string,
  ): Promise<Workflow> {
    const currentVersion = version || this.generateVersion();

    return this.prisma.workflow.create({
      data: {
        agentId: (await this.findById(workflowId))!.agentId,
        name: (await this.findById(workflowId))!.name,
        description: (await this.findById(workflowId))!.description,
        workflowData,
        workflowType: (await this.findById(workflowId))!.workflowType,
        framework: (await this.findById(workflowId))!.framework,
        version: currentVersion,
      },
      include: {
        agent: true,
        executions: true,
      },
    });
  }

  async getVersions(agentId: string): Promise<Workflow[]> {
    return this.prisma.workflow.findMany({
      where: { agentId },
      orderBy: { version: 'desc' },
      include: {
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  // Active workflow management
  async setActiveVersion(workflowId: string): Promise<void> {
    const workflow = await this.findById(workflowId);
    if (!workflow) return;

    // First, set all workflows for this agent to inactive
    await this.prisma.workflow.updateMany({
      where: { agentId: workflow.agentId },
      data: { isActive: false },
    });

    // Then set the specified workflow as active
    await this.prisma.workflow.update({
      where: { id: workflowId },
      data: { isActive: true },
    });
  }

  async getActiveWorkflow(agentId: string): Promise<Workflow | null> {
    return this.prisma.workflow.findFirst({
      where: {
        agentId,
        isActive: true,
      },
      include: {
        agent: {
          include: {
            userOwner: true,
            orgOwner: true,
          },
        },
        executions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async findLatestByAgentId(agentId: string): Promise<Workflow | null> {
    return this.prisma.workflow.findFirst({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  private generateVersion(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = now.getTime();

    return `${year}.${month}.${day}.${timestamp}`;
  }
}
