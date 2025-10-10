import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PublicationStatus, PricingTier, FieldType } from '@prisma/client';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { PublishAgentDto } from '../dto/publish-agent.dto';
import { N8NWorkflowParserService } from '../../n8n/services/parser.service';
import { ParameterTypeInferenceService } from '../../parameters/services/type-inference.service';
import { EventBusService } from '../../common/services/event-bus.service';

@Injectable()
export class AgentsService {
  constructor(
    private prisma: PrismaService,
    private workflowParser: N8NWorkflowParserService,
    private typeInference: ParameterTypeInferenceService,
    private eventBus: EventBusService,
  ) {}

  /**
   * Create a new agent template from N8N workflow JSON
   */
  async createAgent(createAgentDto: CreateAgentDto) {
    // Validate workflow JSON
    this.workflowParser.validateWorkflowSize(JSON.stringify(createAgentDto.n8nWorkflowJson));
    this.workflowParser.validateWorkflowStructure(createAgentDto.n8nWorkflowJson);

    // Parse workflow to detect parameters
    const parsedWorkflow = this.workflowParser.parseWorkflow(JSON.stringify(createAgentDto.n8nWorkflowJson));

    // Create agent template with parameters and output config in a transaction
    const agentTemplate = await this.prisma.agentTemplate.create({
      data: {
        name: createAgentDto.name,
        description: createAgentDto.description,
        category: createAgentDto.category,
        tags: createAgentDto.tags || [],
        n8nWorkflowJson: createAgentDto.n8nWorkflowJson as any,
        version: createAgentDto.version || '1.0.0',
        publicationStatus: PublicationStatus.draft,
        pricingTier: (createAgentDto.pricingTier as PricingTier) || PricingTier.free,
        createdById: createAgentDto.createdById,
        parameters: {
          create: parsedWorkflow.parameters.map((param: any, index: number) => {
            const fieldType = this.typeInference.inferFieldType(param);
            const validationRules = this.typeInference.generateValidationRules(fieldType, param);
            const displayLabel = this.typeInference.generateDisplayLabel(param.name);
            const helpText = this.typeInference.generateHelpText(fieldType, param.name);

            return {
              parameterName: param.name,
              parameterPath: param.path,
              fieldType: fieldType as FieldType,
              displayLabel,
              helpText,
              defaultValue: param.defaultValue?.toString(),
              isRequired: param.isRequired ?? true,
              isSensitive: fieldType === 'password',
              validationRules: validationRules as any,
              order: index + 1,
            };
          }),
        },
        outputConfig: {
          create: {
            outputSource: 'finalResult' as any,
            displayFormat: 'formatted' as any,
            nodeIds: [],
            fieldMappings: {} as any,
            filterRules: {
              exclude: ['__internal', '_meta'],
              maxDepth: 3,
              maxItems: 100,
            } as any,
          },
        },
      },
      include: {
        parameters: { orderBy: { order: 'asc' } },
        outputConfig: true,
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    return agentTemplate;
  }

  /**
   * Get agent template by ID
   */
  async getAgent(id: string) {
    const agent = await this.prisma.agentTemplate.findUnique({
      where: { id },
      include: {
        parameters: { orderBy: { order: 'asc' } },
        outputConfig: true,
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    if (!agent) {
      throw new NotFoundException(`Agent template with ID ${id} not found`);
    }

    return agent;
  }

  /**
   * List all agent templates
   */
  async listAgents(
    status?: PublicationStatus,
    category?: string,
    createdById?: string,
  ) {
    const where: any = {};

    if (status) {
      where.publicationStatus = status;
    }

    if (category) {
      where.category = category;
    }

    if (createdById) {
      where.createdById = createdById;
    }

    return this.prisma.agentTemplate.findMany({
      where,
      include: {
        parameters: { orderBy: { order: 'asc' } },
        outputConfig: true,
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Update agent template
   */
  async updateAgent(id: string, updateData: Partial<CreateAgentDto>) {
    // Verify agent exists
    await this.getAgent(id);

    // If updating workflow JSON, re-parse and update parameters
    if (updateData.n8nWorkflowJson) {
      this.workflowParser.validateWorkflowSize(JSON.stringify(updateData.n8nWorkflowJson));
      this.workflowParser.validateWorkflowStructure(updateData.n8nWorkflowJson);

      const parsedWorkflow = this.workflowParser.parseWorkflow(JSON.stringify(updateData.n8nWorkflowJson));

      // Use transaction to update workflow and parameters
      const updatedAgent = await this.prisma.$transaction(async (tx) => {
        // Delete existing parameters
        await tx.agentParameterConfig.deleteMany({
          where: { agentTemplateId: id },
        });

        // Update agent and create new parameters
        return tx.agentTemplate.update({
          where: { id },
          data: {
            ...updateData,
            n8nWorkflowJson: updateData.n8nWorkflowJson as any,
            parameters: {
              create: parsedWorkflow.parameters.map((param: any, index: number) => {
                const fieldType = this.typeInference.inferFieldType(param);
                const validationRules = this.typeInference.generateValidationRules(fieldType, param);
                const displayLabel = this.typeInference.generateDisplayLabel(param.name);
                const helpText = this.typeInference.generateHelpText(fieldType, param.name);

                return {
                  parameterName: param.name,
                  parameterPath: param.path,
                  fieldType: fieldType as FieldType,
                  displayLabel,
                  helpText,
                  defaultValue: param.defaultValue?.toString(),
                  isRequired: param.isRequired ?? true,
                  isSensitive: fieldType === 'password',
                  validationRules: validationRules as any,
                  order: index + 1,
                };
              }),
            },
          },
          include: {
            parameters: { orderBy: { order: 'asc' } },
            outputConfig: true,
            createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
          },
        });
      });

      return updatedAgent;
    }

    // Update without changing workflow
    const updatedAgent = await this.prisma.agentTemplate.update({
      where: { id },
      data: updateData,
      include: {
        parameters: { orderBy: { order: 'asc' } },
        outputConfig: true,
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    return updatedAgent;
  }

  /**
   * Delete agent template
   */
  async deleteAgent(id: string): Promise<void> {
    // Verify agent exists
    await this.getAgent(id);

    // Check if agent has deployments
    const deploymentCount = await this.prisma.userAgentDeployment.count({
      where: { agentTemplateId: id },
    });

    if (deploymentCount > 0) {
      throw new BadRequestException('Cannot delete agent template with active deployments. Unpublish first.');
    }

    await this.prisma.agentTemplate.delete({
      where: { id },
    });
  }

  /**
   * Publish agent to marketplace
   */
  async publishAgent(id: string, publishDto: PublishAgentDto) {
    const agent = await this.getAgent(id);

    if (agent.publicationStatus === PublicationStatus.published) {
      throw new BadRequestException('Agent is already published');
    }

    // Update publication status
    const updatedAgent = await this.prisma.agentTemplate.update({
      where: { id },
      data: {
        publicationStatus: PublicationStatus.published,
        publishedAt: new Date(),
        unpublishedAt: null,
      },
      include: {
        parameters: { orderBy: { order: 'asc' } },
        outputConfig: true,
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    // Emit marketplace event
    await this.eventBus.publish('marketplace:agent:published', {
      agentId: id,
      action: 'published',
      timestamp: new Date().toISOString(),
      metadata: {
        isBreakingUpdate: publishDto.isBreakingUpdate || false,
        releaseNotes: publishDto.releaseNotes,
      },
    });

    return updatedAgent;
  }

  /**
   * Unpublish agent from marketplace
   */
  async unpublishAgent(id: string) {
    const agent = await this.getAgent(id);

    if (agent.publicationStatus !== PublicationStatus.published) {
      throw new BadRequestException('Agent is not published');
    }

    // Update publication status
    const updatedAgent = await this.prisma.agentTemplate.update({
      where: { id },
      data: {
        publicationStatus: PublicationStatus.unpublished,
        unpublishedAt: new Date(),
      },
      include: {
        parameters: { orderBy: { order: 'asc' } },
        outputConfig: true,
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    // Emit marketplace event
    await this.eventBus.publish('marketplace:agent:unpublished', {
      agentId: id,
      action: 'unpublished',
      timestamp: new Date().toISOString(),
      metadata: {
        deprecationTimestamp: new Date().toISOString(),
        archivalTimestamp: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      },
    });

    return updatedAgent;
  }

  /**
   * Assign agent template to specific user with custom configuration
   */
  async assignAgentToUser(agentId: string, userId: string, customConfig?: any) {
    const agent = await this.getAgent(agentId);
    
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if already assigned
    const existingAssignment = await this.prisma.userAssignedAgent.findFirst({
      where: {
        userId,
        agentTemplateId: agentId,
      },
    });

    if (existingAssignment) {
      throw new BadRequestException('Agent is already assigned to this user');
    }

    // Create assignment
    const assignment = await this.prisma.userAssignedAgent.create({
      data: {
        userId,
        agentTemplateId: agentId,
        customConfig: customConfig || {},
        assignedAt: new Date(),
      },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        agentTemplate: { select: { id: true, name: true, description: true } },
      },
    });

    return assignment;
  }

  /**
   * Get agents assigned to a specific user
   */
  async getUserAssignedAgents(userId: string) {
    const assignments = await this.prisma.userAssignedAgent.findMany({
      where: { userId },
      include: {
        agentTemplate: {
          include: {
            parameters: { orderBy: { order: 'asc' } },
            outputConfig: true,
            createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { assignedAt: 'desc' },
    });

    return assignments.map(assignment => ({
      id: assignment.id,
      assignedAt: assignment.assignedAt,
      customConfig: assignment.customConfig,
      agentTemplate: assignment.agentTemplate,
    }));
  }

  /**
   * Remove agent assignment from user
   */
  async removeAgentAssignment(assignmentId: string) {
    const assignment = await this.prisma.userAssignedAgent.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      throw new NotFoundException('Agent assignment not found');
    }

    await this.prisma.userAssignedAgent.delete({
      where: { id: assignmentId },
    });

    return { success: true };
  }

  /**
   * Get agent analytics and usage statistics
   */
  async getAgentAnalytics(agentId: string, timeRange: string = '30d') {
    const agent = await this.getAgent(agentId);
    
    const timeRangeMs = this.parseTimeRange(timeRange);
    const startTime = new Date(Date.now() - timeRangeMs);

    // Get deployment statistics
    const totalDeployments = await this.prisma.userAgentDeployment.count({
      where: { agentTemplateId: agentId },
    });

    const activeDeployments = await this.prisma.userAgentDeployment.count({
      where: {
        agentTemplateId: agentId,
        deploymentStatus: 'active',
      },
    });

    // Get execution statistics via deployment
    const deployments = await this.prisma.userAgentDeployment.findMany({
      where: { agentTemplateId: agentId },
      select: {
        executions: {
          where: {
            startedAt: { gte: startTime },
          },
          select: {
            status: true,
            startedAt: true,
            stoppedAt: true,
            userId: true,
          },
        },
      },
    });

    const executions = deployments.flatMap(d => d.executions);
    const totalExecutions = executions.length;
    const completedExecutions = executions.filter(e => e.status === 'completed').length;
    const failedExecutions = executions.filter(e => e.status === 'failed').length;
    const successRate = totalExecutions > 0 ? (completedExecutions / totalExecutions) * 100 : 0;

    // Calculate average execution time using stoppedAt
    const completedWithTimes = executions.filter(e => e.status === 'completed' && e.stoppedAt && e.startedAt);
    const avgExecutionTime = completedWithTimes.length > 0
      ? completedWithTimes.reduce((sum, exec) => {
          const duration = exec.stoppedAt!.getTime() - exec.startedAt!.getTime();
          return sum + duration;
        }, 0) / completedWithTimes.length / 1000 // Convert to seconds
      : 0;

    // Get unique users
    const uniqueUsers = new Set(executions.map(e => e.userId)).size;

    // Get assignment statistics
    const totalAssignments = await this.prisma.userAssignedAgent.count({
      where: { agentTemplateId: agentId },
    });

    // Get execution trends (grouped by day)
    const intervalMs = Math.max(timeRangeMs / 20, 24 * 60 * 60 * 1000); // At least daily intervals
    const intervals = this.createTimeIntervals(startTime, new Date(), intervalMs);

    const executionTrends = intervals.map(interval => ({
      date: interval.start.toISOString().split('T')[0],
      executions: executions.filter(e => 
        e.startedAt >= interval.start && e.startedAt < interval.end
      ).length,
      completed: executions.filter(e => 
        e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'completed'
      ).length,
      failed: executions.filter(e => 
        e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'failed'
      ).length,
    }));

    // Get top users by execution count
    const userExecutionCounts = executions.reduce((acc, exec) => {
      acc[exec.userId] = (acc[exec.userId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topUsers = Object.entries(userExecutionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([userId, count]) => ({ userId, executionCount: count }));

    return {
      agentId,
      agentName: agent.name,
      timeRange,
      summary: {
        totalDeployments,
        activeDeployments,
        totalAssignments,
        totalExecutions,
        completedExecutions,
        failedExecutions,
        successRate: Math.round(successRate * 100) / 100,
        avgExecutionTime: Math.round(avgExecutionTime * 100) / 100,
        uniqueUsers,
      },
      trends: {
        executionTrends,
        topUsers,
      },
    };
  }

  /**
   * Get all agents with their analytics summary
   */
  async getAgentsWithAnalytics() {
    const agents = await this.listAgents();
    
    const agentsWithAnalytics = await Promise.all(
      agents.map(async (agent) => {
        const totalDeployments = await this.prisma.userAgentDeployment.count({
          where: { agentTemplateId: agent.id },
        });

        const activeDeployments = await this.prisma.userAgentDeployment.count({
          where: {
            agentTemplateId: agent.id,
            deploymentStatus: 'active',
          },
        });

        const totalAssignments = await this.prisma.userAssignedAgent.count({
          where: { agentTemplateId: agent.id },
        });

        // Count recent executions via deployments
        const recentDeployments = await this.prisma.userAgentDeployment.findMany({
          where: { agentTemplateId: agent.id },
          select: {
            executions: {
              where: {
                startedAt: {
                  gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
                },
              },
            },
          },
        });
        const recentExecutions = recentDeployments.reduce((sum, d) => sum + d.executions.length, 0);

        return {
          ...agent,
          analytics: {
            totalDeployments,
            activeDeployments,
            totalAssignments,
            recentExecutions,
          },
        };
      })
    );

    return agentsWithAnalytics;
  }

  private parseTimeRange(timeRange: string): number {
    const unit = timeRange.slice(-1);
    const value = parseInt(timeRange.slice(0, -1));
    
    switch (unit) {
      case 'd': return value * 24 * 60 * 60 * 1000;
      case 'w': return value * 7 * 24 * 60 * 60 * 1000;
      case 'm': return value * 30 * 24 * 60 * 60 * 1000;
      default: return 30 * 24 * 60 * 60 * 1000; // Default to 30 days
    }
  }

  private createTimeIntervals(startTime: Date, endTime: Date, intervalMs: number) {
    const intervals = [];
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      const nextTime = new Date(currentTime.getTime() + intervalMs);
      intervals.push({
        start: new Date(currentTime),
        end: nextTime > endTime ? endTime : nextTime,
      });
      currentTime = nextTime;
    }
    
    return intervals;
  }
}
