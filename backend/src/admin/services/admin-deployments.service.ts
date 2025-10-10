import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { DeploymentStatus } from '@prisma/client';

@Injectable()
export class AdminDeploymentsService {
  constructor(private prisma: PrismaService) {}

  async listDeployments(filters: {
    userId?: string;
    agentTemplateId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const { userId, agentTemplateId, status, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (agentTemplateId) {
      where.agentTemplateId = agentTemplateId;
    }

    if (status) {
      where.deploymentStatus = status as DeploymentStatus;
    }

    const [deployments, total] = await Promise.all([
      this.prisma.userAgentDeployment.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          agentTemplate: {
            select: {
              id: true,
              name: true,
              category: true,
              version: true,
            },
          },
          executions: {
            take: 1,
            orderBy: { startedAt: 'desc' },
            select: {
              id: true,
              status: true,
              startedAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.userAgentDeployment.count({ where }),
    ]);

    return {
      deployments: deployments.map(d => ({
        id: d.id,
        deployment_name: d.deploymentName,
        status: d.deploymentStatus,
        created_at: d.createdAt.toISOString(),
        total_executions: d.totalExecutions,
        last_execution_at: d.lastExecutionAt?.toISOString(),
        user: d.user,
        agent: d.agentTemplate,
        latest_execution: d.executions[0] || null,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getDeploymentDetail(id: string) {
    const deployment = await this.prisma.userAgentDeployment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        agentTemplate: {
          include: {
            parameters: {
              orderBy: { order: 'asc' },
            },
            outputConfig: true,
          },
        },
        executions: {
          take: 10,
          orderBy: { startedAt: 'desc' },
        },
      },
    });

    if (!deployment) {
      throw new NotFoundException(`Deployment with ID ${id} not found`);
    }

    return {
      id: deployment.id,
      deployment_name: deployment.deploymentName,
      status: deployment.deploymentStatus,
      created_at: deployment.createdAt.toISOString(),
      total_executions: deployment.totalExecutions,
      last_execution_at: deployment.lastExecutionAt?.toISOString(),
      parameter_values: deployment.parameterValues,
      agent_template_version: deployment.agentTemplateVersion,
      user: deployment.user,
      agent: deployment.agentTemplate,
      recent_executions: deployment.executions.map(e => ({
        id: e.id,
        status: e.status,
        started_at: e.startedAt.toISOString(),
        stopped_at: e.stoppedAt?.toISOString(),
        error_message: e.errorMessage,
      })),
    };
  }

  async getDeploymentExecutions(
    deploymentId: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const [executions, total] = await Promise.all([
      this.prisma.agentExecution.findMany({
        where: { deploymentId },
        skip,
        take: limit,
        orderBy: { startedAt: 'desc' },
      }),
      this.prisma.agentExecution.count({ where: { deploymentId } }),
    ]);

    return {
      executions: executions.map(e => ({
        id: e.id,
        n8n_execution_id: e.n8nExecutionId,
        status: e.status,
        started_at: e.startedAt.toISOString(),
        stopped_at: e.stoppedAt?.toISOString(),
        input_parameters: e.inputParameters,
        execution_output: e.executionOutput,
        error_message: e.errorMessage,
        retry_count: e.retryCount,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async executeDeployment(deploymentId: string, inputParameters: Record<string, any>) {
    // Get deployment details
    const deployment = await this.prisma.userAgentDeployment.findUnique({
      where: { id: deploymentId },
      include: {
        agentTemplate: true,
      },
    });

    if (!deployment) {
      throw new NotFoundException(`Deployment with ID ${deploymentId} not found`);
    }

    // Create execution record
    const execution = await this.prisma.agentExecution.create({
      data: {
        deploymentId,
        userId: deployment.userId,
        n8nExecutionId: `manual-${Date.now()}`, // Will be updated by N8N
        status: 'queued',
        inputParameters: inputParameters as any,
      },
    });

    // Update deployment last execution
    await this.prisma.userAgentDeployment.update({
      where: { id: deploymentId },
      data: {
        lastExecutionAt: new Date(),
        totalExecutions: { increment: 1 },
      },
    });

    return {
      execution_id: execution.id,
      status: execution.status,
      message: 'Execution queued successfully',
    };
  }
}
