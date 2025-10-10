import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WorkflowExecution, Prisma } from '@prisma/client';

@Injectable()
export class WorkflowExecutionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<WorkflowExecution | null> {
    return this.prisma.workflowExecution.findUnique({
      where: { id },
      include: {
        workflow: {
          include: {
            agent: {
              include: {
                userOwner: true,
                orgOwner: true,
              },
            },
          },
        },
        agent: {
          include: {
            userOwner: true,
            orgOwner: true,
          },
        },
        parentExecution: true,
        childExecutions: true,
      },
    });
  }

  async findByWorkflowId(workflowId: string): Promise<WorkflowExecution[]> {
    return this.prisma.workflowExecution.findMany({
      where: { workflowId },
      include: {
        agent: true,
        workflow: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByAgentId(agentId: string): Promise<WorkflowExecution[]> {
    return this.prisma.workflowExecution.findMany({
      where: { agentId },
      include: {
        workflow: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCorrelationId(
    correlationId: string,
  ): Promise<WorkflowExecution[]> {
    return this.prisma.workflowExecution.findMany({
      where: { correlationId },
      include: {
        workflow: {
          include: {
            agent: true,
          },
        },
        agent: true,
        parentExecution: true,
        childExecutions: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    data: Prisma.WorkflowExecutionCreateInput,
  ): Promise<WorkflowExecution> {
    return this.prisma.workflowExecution.create({
      data,
      include: {
        workflow: {
          include: {
            agent: true,
          },
        },
        agent: true,
        parentExecution: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.WorkflowExecutionUpdateInput,
  ): Promise<WorkflowExecution> {
    return this.prisma.workflowExecution.update({
      where: { id },
      data,
      include: {
        workflow: {
          include: {
            agent: true,
          },
        },
        agent: true,
        parentExecution: true,
        childExecutions: true,
      },
    });
  }

  async delete(id: string): Promise<WorkflowExecution> {
    return this.prisma.workflowExecution.delete({
      where: { id },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.WorkflowExecutionWhereInput;
    orderBy?: Prisma.WorkflowExecutionOrderByWithRelationInput;
  }): Promise<WorkflowExecution[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.workflowExecution.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        workflow: {
          include: {
            agent: true,
          },
        },
        agent: true,
      },
    });
  }

  async count(where?: Prisma.WorkflowExecutionWhereInput): Promise<number> {
    return this.prisma.workflowExecution.count({ where });
  }

  // Status management
  async updateStatus(
    id: string,
    status: string,
    statusMessage?: string,
    additionalData?: any,
  ): Promise<WorkflowExecution> {
    const updateData: Prisma.WorkflowExecutionUpdateInput = {
      status,
      ...(statusMessage && { statusMessage }),
      ...(status === 'running' && { startedAt: new Date() }),
      ...(status === 'completed' && { completedAt: new Date() }),
      ...(status === 'failed' && { completedAt: new Date() }),
      ...(status === 'paused' && { pausedAt: new Date() }),
      ...(status === 'timeout' && { completedAt: new Date() }),
      ...(additionalData && { executionData: additionalData }),
    };

    return this.update(id, updateData);
  }

  // Execution lifecycle methods
  async startExecution(
    id: string,
    executionData?: any,
  ): Promise<WorkflowExecution> {
    return this.updateStatus(id, 'running', 'Execution started', executionData);
  }

  async completeExecution(
    id: string,
    result: any,
    performanceMetrics?: any,
    resourceUsage?: any,
  ): Promise<WorkflowExecution> {
    const updateData: Prisma.WorkflowExecutionUpdateInput = {
      status: 'completed',
      completedAt: new Date(),
      executionData: result,
      ...(performanceMetrics && { performanceMetrics }),
      ...(resourceUsage && { resourceUsage }),
    };

    return this.prisma.workflowExecution.update({
      where: { id },
      data: updateData,
      include: {
        workflow: true,
        agent: true,
      },
    });
  }

  async failExecution(
    id: string,
    errorMessage: string,
    errorCode?: string,
    executionData?: any,
  ): Promise<WorkflowExecution> {
    const updateData: Prisma.WorkflowExecutionUpdateInput = {
      status: 'failed',
      completedAt: new Date(),
      errorMessage,
      ...(errorCode && { errorCode }),
      ...(executionData && { executionData }),
    };

    return this.prisma.workflowExecution.update({
      where: { id },
      data: updateData,
      include: {
        workflow: true,
        agent: true,
      },
    });
  }

  async pauseExecution(id: string): Promise<WorkflowExecution> {
    return this.updateStatus(id, 'paused', 'Execution paused');
  }

  async resumeExecution(id: string): Promise<WorkflowExecution> {
    const updateData: Prisma.WorkflowExecutionUpdateInput = {
      status: 'running',
      pausedAt: null,
      resumedAt: new Date(),
    };

    return this.prisma.workflowExecution.update({
      where: { id },
      data: updateData,
      include: {
        workflow: true,
        agent: true,
      },
    });
  }

  async cancelExecution(id: string): Promise<WorkflowExecution> {
    return this.updateStatus(id, 'cancelled', 'Execution cancelled by user');
  }

  // Retry logic
  async retryExecution(id: string): Promise<WorkflowExecution> {
    const execution = await this.findById(id);
    if (!execution) throw new Error('Execution not found');

    if (execution.retryCount >= execution.maxRetries) {
      throw new Error('Maximum retry attempts exceeded');
    }

    // Create new execution for retry
    const retryData: Prisma.WorkflowExecutionCreateInput = {
      workflow: { connect: { id: execution.workflowId } },
      agent: { connect: { id: execution.agentId } },
      status: 'queued',
      correlationId: execution.correlationId,
      retryCount: execution.retryCount + 1,
      maxRetries: execution.maxRetries,
      parentExecution: { connect: { id: execution.id } },
      executionData: execution.executionData || undefined,
    };

    return this.create(retryData);
  }

  // Statistics and analytics
  async getExecutionStats(
    workflowId?: string,
    agentId?: string,
  ): Promise<{
    total: number;
    completed: number;
    failed: number;
    running: number;
    queued: number;
    avgExecutionTime: number;
    successRate: number;
  }> {
    const where: Prisma.WorkflowExecutionWhereInput = {};
    if (workflowId) where.workflowId = workflowId;
    if (agentId) where.agentId = agentId;

    const executions = await this.prisma.workflowExecution.findMany({
      where,
      select: {
        status: true,
        startedAt: true,
        completedAt: true,
      },
    });

    const total = executions.length;
    const completed = executions.filter((e: { status: string }) => e.status === 'completed').length;
    const failed = executions.filter((e: { status: string }) =>
      ['failed', 'timeout', 'cancelled'].includes(e.status),
    ).length;
    const running = executions.filter((e: { status: string }) => e.status === 'running').length;
    const queued = executions.filter((e: { status: string }) =>
      ['queued', 'pending'].includes(e.status),
    ).length;

    const completedExecutions = executions.filter(
      (e: { status: string; completedAt: Date | null; startedAt: Date }) => e.status === 'completed' && e.completedAt && e.startedAt,
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

    const successRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      failed,
      running,
      queued,
      avgExecutionTime,
      successRate,
    };
  }
}
