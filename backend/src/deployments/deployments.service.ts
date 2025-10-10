import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DeploymentStatus, ExecutionStatus } from '@prisma/client';
import { CreateDeploymentDto, ExecuteDeploymentDto } from './dto/create-deployment.dto';

@Injectable()
export class DeploymentsService {
  constructor(private prisma: PrismaService) {}

  async createDeployment(userId: string, dto: CreateDeploymentDto) {
    const agentTemplate = await this.prisma.agentTemplate.findUnique({
      where: { id: dto.agentTemplateId },
    });

    if (!agentTemplate) {
      throw new NotFoundException('Agent template not found');
    }

    const deployment = await this.prisma.userAgentDeployment.create({
      data: {
        userId,
        agentTemplateId: dto.agentTemplateId,
        deploymentName: dto.deploymentName,
        parameterValues: dto.parameterValues as any,
        deploymentStatus: DeploymentStatus.active,
        agentTemplateVersion: agentTemplate.version,
      },
      include: {
        agentTemplate: {
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            version: true,
          },
        },
      },
    });

    return deployment;
  }

  async listDeployments(userId?: string, status?: DeploymentStatus) {
    const where: any = {};
    if (userId) where.userId = userId;
    if (status) where.deploymentStatus = status;

    return this.prisma.userAgentDeployment.findMany({
      where,
      include: {
        agentTemplate: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDeployment(id: string) {
    const deployment = await this.prisma.userAgentDeployment.findUnique({
      where: { id },
      include: {
        agentTemplate: {
          include: {
            parameters: { orderBy: { order: 'asc' } },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        executions: {
          take: 10,
          orderBy: { startedAt: 'desc' },
        },
      },
    });

    if (!deployment) {
      throw new NotFoundException('Deployment not found');
    }

    return deployment;
  }

  async executeDeployment(deploymentId: string, userId: string, dto: ExecuteDeploymentDto) {
    const deployment = await this.prisma.userAgentDeployment.findUnique({
      where: { id: deploymentId },
      include: { agentTemplate: true },
    });

    if (!deployment) {
      throw new NotFoundException('Deployment not found');
    }

    // Merge deployment params with execution-time params
    const finalParams = {
      ...(deployment.parameterValues as Record<string, any> || {}),
      ...(dto.inputParameters || {}),
    };

    // Create execution record
    const execution = await this.prisma.agentExecution.create({
      data: {
        deploymentId,
        userId,
        n8nExecutionId: `exec-${Date.now()}`, // Mock for now
        status: ExecutionStatus.completed, // Mock success
        inputParameters: finalParams as any,
        executionOutput: {
          success: true,
          message: 'Execution completed successfully (mock)',
          timestamp: new Date().toISOString(),
        } as any,
      },
    });

    // Update deployment stats
    await this.prisma.userAgentDeployment.update({
      where: { id: deploymentId },
      data: {
        lastExecutionAt: new Date(),
        totalExecutions: { increment: 1 },
      },
    });

    return execution;
  }

  async deleteDeployment(id: string) {
    return this.prisma.userAgentDeployment.delete({
      where: { id },
    });
  }

  async listExecutions(userId?: string, deploymentId?: string) {
    const where: any = {};
    if (userId) where.userId = userId;
    if (deploymentId) where.deploymentId = deploymentId;

    return this.prisma.agentExecution.findMany({
      where,
      include: {
        deployment: {
          include: {
            agentTemplate: {
              select: { id: true, name: true, category: true },
            },
          },
        },
      },
      orderBy: { startedAt: 'desc' },
      take: 50,
    });
  }

  async getExecution(id: string) {
    const execution = await this.prisma.agentExecution.findUnique({
      where: { id },
      include: {
        deployment: {
          include: {
            agentTemplate: {
              select: {
                id: true,
                name: true,
                description: true,
                category: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!execution) {
      throw new NotFoundException('Execution not found');
    }

    return execution;
  }
}
