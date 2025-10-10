import { Injectable, Logger } from '@nestjs/common';
import { BaseFrameworkAdapter } from '../abstraction/base-framework.adapter';
import {
  FrameworkType,
  FrameworkMetadata,
  ExecutionResult,
  ExecutionStep,
  FrameworkExecutionContext,
} from '../types/framework.types';

@Injectable()
export class CrewAIAdapter extends BaseFrameworkAdapter {
  private readonly executions = new Map<string, any>();

  constructor() {
    super('crewai' as FrameworkType, {
      name: 'CrewAI',
      version: '0.1.0',
      description: 'Multi-agent collaboration and orchestration framework',
      capabilities: {
        supportsMultiAgent: true,
        supportsVisualBuilder: false,
        supportsCodeEditor: true,
        supportsAsyncExecution: true,
        supportsStatePersistence: true,
        gpuRequired: false,
        maxConcurrentExecutions: 8,
        resourceRequirements: {
          cpu: 3,
          memory: 3072,
          gpu: 0,
        },
      },
      supportedLanguages: ['python'],
      dependencies: ['crewai', 'langchain'],
    });
  }

  async initialize(config: any): Promise<void> {
    this.logger.log('Initializing CrewAI adapter', { config });
    // Initialize Python runtime for multi-agent coordination
    // Set up communication protocols and memory management
    this.logger.log('CrewAI adapter initialized successfully');
  }

  async shutdown(): Promise<void> {
    this.logger.log('Shutting down CrewAI adapter');
    // Cleanup agent processes and communication channels
    this.executions.clear();
    this.logger.log('CrewAI adapter shutdown complete');
  }

  async validateWorkflow(
    workflowData: any,
  ): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];

    // Validate crew configuration
    if (!workflowData.crew || typeof workflowData.crew !== 'object') {
      errors.push('Workflow must contain a crew configuration');
    }

    if (!workflowData.crew.agents || !Array.isArray(workflowData.crew.agents)) {
      errors.push('Crew must contain an agents array');
    }

    if (workflowData.crew.agents.length === 0) {
      errors.push('Crew must have at least one agent');
    }

    if (!workflowData.crew.tasks || !Array.isArray(workflowData.crew.tasks)) {
      errors.push('Crew must contain a tasks array');
    }

    // Validate agents
    for (const agent of workflowData.crew.agents) {
      if (!agent.role || !agent.goal || !agent.backstory) {
        errors.push(
          `Agent ${agent.name || 'unknown'} is missing required fields (role, goal, backstory)`,
        );
      }
    }

    // Validate tasks
    for (const task of workflowData.crew.tasks) {
      if (!task.description) {
        errors.push(`Task ${task.name || 'unknown'} is missing description`);
      }
    }

    // Validate task dependencies
    if (workflowData.crew.taskDependencies) {
      for (const dep of workflowData.crew.taskDependencies) {
        if (!dep.task || !dep.dependsOn) {
          errors.push('Task dependency is missing task or dependsOn field');
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async executeWorkflow(
    workflowData: any,
    inputData: any,
    context: FrameworkExecutionContext,
  ): Promise<ExecutionResult> {
    this.logExecutionStart(context);

    try {
      const startTime = Date.now();
      const crew = workflowData.crew;
      const agentCount = crew.agents.length;
      const taskCount = crew.tasks.length;

      // Create execution steps for multi-agent coordination
      const steps: ExecutionStep[] = [
        {
          id: 'init_crew',
          name: 'Initialize Crew',
          status: 'completed',
          startedAt: new Date(),
          completedAt: new Date(),
          duration: 200,
          output: { agentCount, taskCount },
        },
      ];

      // Add steps for each agent initialization
      crew.agents.forEach((agent: any, index: number) => {
        steps.push({
          id: `init_agent_${index}`,
          name: `Initialize ${agent.role}`,
          status: 'completed',
          startedAt: new Date(),
          completedAt: new Date(),
          duration: 100,
          output: { role: agent.role, status: 'ready' },
        });
      });

      // Add task execution steps
      crew.tasks.forEach((task: any, index: number) => {
        steps.push({
          id: `task_${index}`,
          name: `Execute: ${task.description.substring(0, 50)}...`,
          status: index === 0 ? 'running' : 'pending',
          startedAt: index === 0 ? new Date() : undefined,
        });
      });

      // Store execution state
      this.executions.set(context.executionId, {
        workflowData,
        inputData,
        context,
        steps,
        startTime,
        currentTaskIndex: 0,
      });

      // Simulate multi-agent execution with task dependencies
      await this.executeWithTimeout(
        async () => {
          for (let i = 0; i < taskCount; i++) {
            const step = steps.find((s) => s.id === `task_${i}`);
            if (!step) continue;

            step.status = 'running';
            if (!step.startedAt) step.startedAt = new Date();

            // Simulate task execution time based on complexity
            const executionTime = 500 + Math.random() * 1000;
            await new Promise((resolve) => setTimeout(resolve, executionTime));

            step.status = 'completed';
            step.completedAt = new Date();
            step.duration = executionTime;
            step.output = {
              task: crew.tasks[i].description,
              agent: crew.agents[i % agentCount].role,
              result: `Task ${i + 1} completed successfully`,
            };
          }
        },
        context.resourceLimits?.timeout || 60000, // Longer timeout for multi-agent
        context.executionId,
      );

      const executionTime = Date.now() - startTime;

      this.logExecutionComplete(context, true, executionTime);

      return this.createSuccessResult(
        {
          message: 'CrewAI execution completed successfully',
          crew: {
            name: crew.name || 'Unnamed Crew',
            agentCount,
            taskCount,
            totalExecutionTime: executionTime,
          },
          results: steps
            .filter((s) => s.id.startsWith('task_'))
            .map((s) => s.output),
          coordination: {
            communicationRounds: taskCount,
            agentUtilization: agentCount / taskCount,
            taskDependencies: crew.taskDependencies || [],
          },
        },
        executionTime,
        steps,
        {
          cpuTime: executionTime,
          memoryPeak: 1536 + agentCount * 256, // Memory scales with agent count
          gpuTime: 0,
        },
      );
    } catch (error) {
      this.logExecutionError(context, error);
      return this.createErrorResult(
        error.message || 'CrewAI execution failed',
        'CREWAI_EXECUTION_ERROR',
        Date.now() - Date.now(),
      );
    }
  }

  async getExecutionStatus(executionId: string): Promise<ExecutionStep[]> {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution ${executionId} not found`);
    }

    return execution.steps || [];
  }

  async cancelExecution(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution ${executionId} not found`);
    }

    execution.cancelled = true;

    if (execution.steps) {
      const runningStep = execution.steps.find(
        (step: ExecutionStep) => step.status === 'running',
      );
      if (runningStep) {
        runningStep.status = 'failed';
        runningStep.completedAt = new Date();
        runningStep.error = 'Execution cancelled';
      }
    }

    this.logger.log(`Cancelled CrewAI execution ${executionId}`);
  }

  async getResourceRequirements(workflowData: any): Promise<{
    cpu: number;
    memory: number;
    gpu?: number;
  }> {
    const crew = workflowData.crew;
    const agentCount = crew?.agents?.length || 1;
    const taskCount = crew?.tasks?.length || 1;

    // Base requirements for CrewAI
    let cpu = 3;
    let memory = 3072;

    // Scale with agent count
    cpu += Math.floor(agentCount / 2);
    memory += agentCount * 512;

    // Scale with task complexity
    if (taskCount > 5) cpu += 1;
    if (taskCount > 10) {
      cpu += 1;
      memory += 1024;
    }

    // Check for GPU requirements in agents
    const hasGPUAgents = crew?.agents?.some((agent: any) =>
      agent.tools?.some(
        (tool: any) => tool.type?.includes('gpu') || tool.type?.includes('llm'),
      ),
    );

    const gpu = hasGPUAgents ? 1 : 0;

    return { cpu, memory, gpu };
  }
}
