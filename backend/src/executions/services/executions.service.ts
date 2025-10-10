import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { WorkflowExecutionRepository } from '../../database/repositories/workflow-execution.repository';
import { WorkflowRepository } from '../../database/repositories/workflow.repository';
import { AgentRepository } from '../../database/repositories/agent.repository';
import { UserRepository } from '../../database/repositories/user.repository';
import { FrameworkAbstractionService } from '../../frameworks/abstraction/framework-abstraction.service';
import { ExecuteWorkflowDto } from '../dto/execute-workflow.dto';
import { SyncService } from '../../websocket/sync.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExecutionsService {
  constructor(
    private readonly executionRepository: WorkflowExecutionRepository,
    private readonly workflowRepository: WorkflowRepository,
    private readonly agentRepository: AgentRepository,
    private readonly userRepository: UserRepository,
    private readonly frameworkAbstraction: FrameworkAbstractionService,
    private readonly syncService: SyncService,
  ) {}

  async executeWorkflow(
    userId: string,
    workflowId: string,
    executeData: ExecuteWorkflowDto = {},
  ) {
    // Verify workflow exists and user has access
    const workflow = await this.workflowRepository.findById(workflowId);
    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    if (!this.canAccessAgent(userId, (workflow as any).agent)) {
      throw new ForbiddenException('Access denied to workflow');
    }

    // Create execution record
    const correlationId = uuidv4();
    const execution = await this.executionRepository.create({
      workflow: { connect: { id: workflowId } },
      agent: { connect: { id: workflow.agentId } },
      status: 'queued',
      executionData: {
        input: executeData.input_data || {},
        options: executeData.execution_options || {},
      },
      correlationId,
    });

    // Format execution for sync event
    const formattedExecution = this.formatExecution(execution);

    // Emit cross-portal synchronization event
    this.syncService.emitExecutionStarted(formattedExecution, (workflow as any).agent.ownerType === 'organization' ? (workflow as any).agent.ownerId : userId);

    // Start async execution
    setTimeout(() => {
      this.processExecution(execution.id, userId);
    }, 100);

    return {
      execution_id: execution.id,
      status: execution.status,
      started_at: execution.startedAt,
      correlation_id: execution.correlationId,
    };
  }

  async getExecutionById(userId: string, executionId: string) {
    const execution = await this.executionRepository.findById(executionId);
    if (!execution) {
      throw new NotFoundException('Execution not found');
    }

    if (!this.canAccessAgent(userId, (execution as any).agent)) {
      throw new ForbiddenException('Access denied to execution');
    }

    return this.formatExecutionDetails(execution);
  }

  async getExecutions(userId: string, query: any = {}) {
    const {
      workflow_id,
      agent_id,
      status,
      start_date,
      end_date,
      page = 1,
      limit = 20,
    } = query;

    // Build where clause
    const where: any = {};

    if (workflow_id) where.workflowId = workflow_id;
    if (agent_id) where.agentId = agent_id;
    if (status) where.status = status;

    if (start_date || end_date) {
      where.startedAt = {};
      if (start_date) where.startedAt.gte = new Date(start_date);
      if (end_date) where.startedAt.lte = new Date(end_date);
    }

    // Get user agents for access control
    const userAgents = await this.getUserAccessibleAgentIds(userId);
    where.agentId = { in: userAgents };

    const executions = await this.executionRepository.findMany({
      where,
      orderBy: { startedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.executionRepository.count(where);

    return {
      executions: executions.map((execution) =>
        this.formatExecution(execution),
      ),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  private async processExecution(executionId: string, userId: string) {
    try {
      // Get execution details
      const execution = await this.executionRepository.findById(executionId);
      if (!execution) {
        throw new Error('Execution not found');
      }

      // Get workflow and agent details
      const workflow = await this.workflowRepository.findById(
        execution.workflowId,
      );
      if (!workflow) {
        throw new Error('Workflow not found');
      }

      const agent = await this.agentRepository.findById(execution.agentId);
      if (!agent) {
        throw new Error('Agent not found');
      }

      // Update status to running
      await this.executionRepository.update(executionId, {
        status: 'running',
      });

      // Emit status update event
      const runningExecution = await this.executionRepository.findById(executionId);
      if (runningExecution) {
        this.syncService.emitExecutionUpdated(
          this.formatExecution(runningExecution),
          agent.ownerType === 'organization' ? agent.ownerId : userId
        );
      }

      // Execute workflow using framework abstraction layer
      const executionData = execution.executionData as any;
      const result = await this.frameworkAbstraction.executeWorkflow(
        workflow.framework as any,
        {
          workflowData: workflow.workflowData,
          inputData: executionData?.input || {},
          executionOptions: {
            timeout: 30000, // 30 seconds default
            retryCount: execution.maxRetries,
          },
        },
        {
          executionId,
          workflowId: workflow.id,
          agentId: workflow.agentId,
          userId,
          correlationId: execution.correlationId,
          containerId: agent.containerId || undefined,
          resourceLimits: (agent.resourceLimits as any) || undefined,
        },
      );

      // Update execution with results
      const baseExecutionData = (execution.executionData as any) || {};
      if (result.success) {
        await this.executionRepository.update(executionId, {
          status: 'completed',
          completedAt: new Date(),
          executionData: {
            ...baseExecutionData,
            output: result.output,
            steps: result.steps,
          },
          resourceUsage: {
            cpu_time: result.resourceUsage.cpuTime,
            memory_peak: result.resourceUsage.memoryPeak,
            execution_time: result.executionTime,
          },
          performanceMetrics: {
            total_duration: result.executionTime,
            steps_count: result.steps.length,
            success_rate: 1.0,
          },
        });

        // Emit completion event
        const completedExecution = await this.executionRepository.findById(executionId);
        if (completedExecution) {
          this.syncService.emitExecutionCompleted(
            this.formatExecutionDetails(completedExecution),
            agent.ownerType === 'organization' ? agent.ownerId : userId
          );
        }
      } else {
        await this.executionRepository.update(executionId, {
          status: 'failed',
          completedAt: new Date(),
          errorMessage: result.error?.message || 'Workflow execution failed',
          errorCode: result.error?.code || 'EXECUTION_FAILED',
          executionData: {
            ...baseExecutionData,
            error: result.error?.details,
          },
          resourceUsage: {
            cpu_time: result.resourceUsage.cpuTime,
            memory_peak: result.resourceUsage.memoryPeak,
            execution_time: result.executionTime,
          },
        });

        // Emit failure event
        const failedExecution = await this.executionRepository.findById(executionId);
        if (failedExecution) {
          this.syncService.emitExecutionUpdated(
            this.formatExecutionDetails(failedExecution),
            agent.ownerType === 'organization' ? agent.ownerId : userId
          );
        }
      }
    } catch (error) {
      await this.executionRepository.update(executionId, {
        status: 'failed',
        completedAt: new Date(),
        errorMessage: `Execution failed: ${error.message}`,
        errorCode: 'INTERNAL_ERROR',
        executionData: {
          error: error,
        },
      });

      // Emit failure event for internal errors
      const failedExecution = await this.executionRepository.findById(executionId);
      if (failedExecution) {
        this.syncService.emitExecutionUpdated(
          this.formatExecutionDetails(failedExecution),
          userId // For internal errors, use userId directly
        );
      }
    }
  }

  private canAccessAgent(userId: string, agent: any): boolean {
    if (agent.ownerType === 'user') {
      return agent.ownerId === userId;
    } else if (agent.ownerType === 'organization') {
      // Check if user is a member of the organization
      return (
        agent.orgOwner?.members?.some(
          (member: any) => member.userId === userId,
        ) || false
      );
    }
    return false;
  }

  private async getUserAccessibleAgentIds(userId: string): Promise<string[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) return [];

    const agentIds: string[] = [];

    // Add user-owned agents
    const userAgents = await this.agentRepository.findMany({
      where: { ownerType: 'user', ownerId: userId },
    });
    agentIds.push(...userAgents.map((a) => a.id));

    // Add organization-owned agents where user is a member
    for (const member of user.organizationMembers || []) {
      const orgAgents = await this.agentRepository.findMany({
        where: { ownerType: 'organization', ownerId: member.organization.id },
      });
      agentIds.push(...orgAgents.map((a) => a.id));
    }

    return agentIds;
  }

  private formatExecution(execution: any) {
    return {
      id: execution.id,
      workflow_id: execution.workflowId,
      agent_id: execution.agentId,
      status: execution.status,
      started_at: execution.startedAt,
      completed_at: execution.completedAt,
      correlation_id: execution.correlationId,
    };
  }

  private formatExecutionDetails(execution: any) {
    return {
      ...this.formatExecution(execution),
      status_message: execution.statusMessage,
      completed_at: execution.completedAt,
      paused_at: execution.pausedAt,
      resumed_at: execution.resumedAt,
      execution_data: execution.executionData,
      execution_logs: execution.executionLogs,
      error_message: execution.errorMessage,
      error_code: execution.errorCode,
      retry_count: execution.retryCount,
      max_retries: execution.maxRetries,
      resource_usage: execution.resourceUsage,
      performance_metrics: execution.performanceMetrics,
      correlation_id: execution.correlationId,
      parent_execution_id: execution.parentExecutionId,
      created_at: execution.createdAt,
      updated_at: execution.updatedAt,
    };
  }
}
