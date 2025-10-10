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
export class N8nAdapter extends BaseFrameworkAdapter {
  private readonly executions = new Map<string, any>();

  constructor() {
    super('n8n' as FrameworkType, {
      name: 'n8n',
      version: '0.1.0',
      description: 'Visual workflow automation platform with AI capabilities',
      capabilities: {
        supportsMultiAgent: false,
        supportsVisualBuilder: true,
        supportsCodeEditor: false,
        supportsAsyncExecution: true,
        supportsStatePersistence: true,
        gpuRequired: false,
        maxConcurrentExecutions: 15,
        resourceRequirements: {
          cpu: 2,
          memory: 2048,
          gpu: 0,
        },
      },
      supportedLanguages: ['typescript', 'javascript'],
      dependencies: ['n8n-core', 'n8n-nodes-base'],
    });
  }

  async initialize(config: any): Promise<void> {
    this.logger.log('Initializing n8n adapter', { config });
    // Initialize Node.js runtime for workflow execution
    // Load n8n workflow engine and node library
    this.logger.log('n8n adapter initialized successfully');
  }

  async shutdown(): Promise<void> {
    this.logger.log('Shutting down n8n adapter');
    // Cleanup workflow executions and node processes
    this.executions.clear();
    this.logger.log('n8n adapter shutdown complete');
  }

  async validateWorkflow(
    workflowData: any,
  ): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];

    // Validate n8n workflow structure
    if (!workflowData.nodes || !Array.isArray(workflowData.nodes)) {
      errors.push('Workflow must contain a nodes array');
    }

    if (
      !workflowData.connections ||
      typeof workflowData.connections !== 'object'
    ) {
      errors.push('Workflow must contain connections object');
    }

    // Check for start node (webhook, schedule, or manual trigger)
    const hasStartNode = workflowData.nodes?.some((node: any) =>
      [
        'n8n-nodes-base.webhook',
        'n8n-nodes-base.schedule',
        'n8n-nodes-base.manual',
      ].includes(node.type),
    );

    if (!hasStartNode) {
      errors.push(
        'Workflow must have a start node (webhook, schedule, or manual trigger)',
      );
    }

    // Validate node configurations
    if (workflowData.nodes) {
      for (const node of workflowData.nodes) {
        if (!node.id || !node.type || !node.parameters) {
          errors.push(
            `Node ${node.id || 'unknown'} is missing required fields`,
          );
        }

        // Validate AI-specific nodes if present
        if (node.type?.includes('ai') || node.type?.includes('openai')) {
          if (!node.parameters.apiKey) {
            errors.push(`AI node ${node.id} is missing API key`);
          }
        }
      }
    }

    // Validate connections
    if (workflowData.connections) {
      for (const [sourceId, sourceConnections] of Object.entries(
        workflowData.connections,
      )) {
        if (!Array.isArray(sourceConnections)) continue;

        for (const connection of sourceConnections) {
          if (!connection.node || !connection.type || !connection.index) {
            errors.push(
              `Connection from ${sourceId} is missing required fields`,
            );
          }
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
      const nodeCount = workflowData.nodes?.length || 0;
      const connectionCount = Object.keys(
        workflowData.connections || {},
      ).length;

      // Create execution steps for workflow nodes
      const steps: ExecutionStep[] = [];

      // Add workflow initialization step
      steps.push({
        id: 'workflow_init',
        name: 'Initialize Workflow',
        status: 'completed',
        startedAt: new Date(),
        completedAt: new Date(),
        duration: 150,
        output: { nodeCount, connectionCount },
      });

      // Add steps for each node execution
      workflowData.nodes?.forEach((node: any, index: number) => {
        steps.push({
          id: `node_${node.id}`,
          name: `Execute ${node.name || node.type}`,
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
        currentNodeIndex: 0,
      });

      // Simulate n8n workflow execution
      await this.executeWithTimeout(
        async () => {
          // Execute nodes in workflow order
          for (let i = 0; i < (workflowData.nodes?.length || 0); i++) {
            const node = workflowData.nodes[i];
            const step = steps.find((s) => s.id === `node_${node.id}`);
            if (!step) continue;

            step.status = 'running';
            if (!step.startedAt) step.startedAt = new Date();

            // Simulate node execution time based on type
            let executionTime = 200;
            if (node.type?.includes('ai') || node.type?.includes('openai')) {
              executionTime = 1000 + Math.random() * 2000; // AI calls take longer
            } else if (node.type?.includes('http')) {
              executionTime = 500 + Math.random() * 1000; // HTTP calls vary
            }

            await new Promise((resolve) => setTimeout(resolve, executionTime));

            step.status = 'completed';
            step.completedAt = new Date();
            step.duration = executionTime;
            step.output = {
              nodeType: node.type,
              result: `Node ${node.name || node.id} executed successfully`,
              dataProcessed: inputData,
            };
          }
        },
        context.resourceLimits?.timeout || 30000,
        context.executionId,
      );

      const executionTime = Date.now() - startTime;

      this.logExecutionComplete(context, true, executionTime);

      return this.createSuccessResult(
        {
          message: 'n8n workflow executed successfully',
          workflow: {
            id: workflowData.id || 'unknown',
            name: workflowData.name || 'Unnamed Workflow',
            nodeCount,
            connectionCount,
            executionTime,
          },
          results: steps
            .filter((s) => s.id.startsWith('node_'))
            .map((s) => s.output),
          summary: {
            totalNodes: nodeCount,
            executedNodes: steps.filter(
              (s) => s.id.startsWith('node_') && s.status === 'completed',
            ).length,
            dataFlow: inputData,
          },
        },
        executionTime,
        steps,
        {
          cpuTime: executionTime,
          memoryPeak: 1024,
          gpuTime: 0,
        },
      );
    } catch (error) {
      this.logExecutionError(context, error);
      return this.createErrorResult(
        error.message || 'n8n workflow execution failed',
        'N8N_EXECUTION_ERROR',
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

    this.logger.log(`Cancelled n8n execution ${executionId}`);
  }

  async getResourceRequirements(workflowData: any): Promise<{
    cpu: number;
    memory: number;
    gpu?: number;
  }> {
    const nodeCount = workflowData.nodes?.length || 0;
    const connectionCount = Object.keys(workflowData.connections || {}).length;

    // Base requirements for n8n
    let cpu = 2;
    let memory = 2048;

    // Scale with workflow complexity
    if (nodeCount > 10) cpu += 1;
    if (nodeCount > 20) cpu += 1;

    if (connectionCount > 15) memory += 512;
    if (connectionCount > 30) memory += 512;

    // Check for AI nodes requiring GPU
    const hasAINodes = workflowData.nodes?.some(
      (node: any) =>
        node.type?.includes('ai') ||
        node.type?.includes('openai') ||
        node.type?.includes('anthropic'),
    );

    if (hasAINodes) {
      cpu += 1;
      memory += 1024;
    }

    // Check for heavy processing nodes
    const hasHeavyNodes = workflowData.nodes?.some(
      (node: any) =>
        node.type?.includes('transform') || node.type?.includes('aggregate'),
    );

    if (hasHeavyNodes) {
      cpu += 0.5;
      memory += 256;
    }

    return { cpu: Math.ceil(cpu), memory, gpu: hasAINodes ? 1 : 0 };
  }
}
