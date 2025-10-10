import { Logger } from '@nestjs/common';
import {
  IFrameworkAdapter,
  FrameworkType,
  FrameworkMetadata,
  ExecutionResult,
  ExecutionStep,
  FrameworkExecutionContext,
} from '../types/framework.types';

export abstract class BaseFrameworkAdapter implements IFrameworkAdapter {
  protected readonly logger: Logger;

  constructor(
    public readonly frameworkType: FrameworkType,
    public readonly metadata: FrameworkMetadata,
  ) {
    this.logger = new Logger(`${this.constructor.name}(${frameworkType})`);
  }

  abstract initialize(config: any): Promise<void>;
  abstract shutdown(): Promise<void>;
  abstract validateWorkflow(
    workflowData: any,
  ): Promise<{ valid: boolean; errors?: string[] }>;
  abstract executeWorkflow(
    workflowData: any,
    inputData: any,
    context: FrameworkExecutionContext,
  ): Promise<ExecutionResult>;
  abstract getExecutionStatus(executionId: string): Promise<ExecutionStep[]>;
  abstract cancelExecution(executionId: string): Promise<void>;
  abstract getResourceRequirements(workflowData: any): Promise<{
    cpu: number;
    memory: number;
    gpu?: number;
  }>;

  // Common error handling
  protected createErrorResult(
    message: string,
    code: string,
    executionTime: number = 0,
  ): ExecutionResult {
    return {
      success: false,
      output: null,
      executionTime,
      resourceUsage: {
        cpuTime: 0,
        memoryPeak: 0,
      },
      steps: [],
      error: {
        message,
        code,
      },
    };
  }

  protected createSuccessResult(
    output: any,
    executionTime: number,
    steps: ExecutionStep[],
    resourceUsage: { cpuTime: number; memoryPeak: number; gpuTime?: number },
  ): ExecutionResult {
    return {
      success: true,
      output,
      executionTime,
      resourceUsage,
      steps,
    };
  }

  // Common validation helpers
  protected validateRequiredFields(
    workflowData: any,
    requiredFields: string[],
  ): string[] {
    const errors: string[] = [];

    for (const field of requiredFields) {
      if (!workflowData || !(field in workflowData)) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    return errors;
  }

  protected validateWorkflowStructure(workflowData: any): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!workflowData) {
      errors.push('Workflow data is required');
      return { valid: false, errors };
    }

    if (typeof workflowData !== 'object') {
      errors.push('Workflow data must be an object');
      return { valid: false, errors };
    }

    return { valid: errors.length === 0, errors };
  }

  // Common execution helpers
  protected async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number,
    executionId: string,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Execution timeout after ${timeoutMs}ms`));
      }, timeoutMs);

      operation()
        .then((result) => {
          clearTimeout(timeout);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  protected logExecutionStart(context: FrameworkExecutionContext): void {
    this.logger.log(`Starting execution ${context.executionId}`, {
      workflowId: context.workflowId,
      agentId: context.agentId,
      correlationId: context.correlationId,
    });
  }

  protected logExecutionComplete(
    context: FrameworkExecutionContext,
    success: boolean,
    executionTime: number,
  ): void {
    this.logger.log(`Completed execution ${context.executionId}`, {
      success,
      executionTime,
      correlationId: context.correlationId,
    });
  }

  protected logExecutionError(
    context: FrameworkExecutionContext,
    error: any,
  ): void {
    this.logger.error(`Execution ${context.executionId} failed`, {
      error: error.message,
      correlationId: context.correlationId,
      stack: error.stack,
    });
  }
}
