import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  IFrameworkAdapter,
  FrameworkType,
  ExecutionInput,
  ExecutionResult,
  FrameworkExecutionContext,
  ExecutionStep,
} from '../types/framework.types';
import { FrameworkRegistry } from '../registry/framework-registry';

@Injectable()
export class FrameworkAbstractionService {
  private readonly logger = new Logger(FrameworkAbstractionService.name);

  constructor(private readonly frameworkRegistry: FrameworkRegistry) {}

  async validateWorkflow(
    frameworkType: FrameworkType,
    workflowData: any,
  ): Promise<{ valid: boolean; errors?: string[] }> {
    this.frameworkRegistry.validateFrameworkSupport(frameworkType);

    const adapter = this.frameworkRegistry.getAdapter(frameworkType);
    if (!adapter) {
      throw new NotFoundException(
        `Framework adapter for ${frameworkType} not found`,
      );
    }

    try {
      return await adapter.validateWorkflow(workflowData);
    } catch (error) {
      this.logger.error(
        `Workflow validation failed for ${frameworkType}:`,
        error,
      );
      return {
        valid: false,
        errors: [error.message || 'Validation failed'],
      };
    }
  }

  async executeWorkflow(
    frameworkType: FrameworkType,
    input: ExecutionInput,
    context: FrameworkExecutionContext,
  ): Promise<ExecutionResult> {
    this.frameworkRegistry.validateFrameworkSupport(frameworkType);

    const adapter = this.frameworkRegistry.getAdapter(frameworkType);
    if (!adapter) {
      throw new NotFoundException(
        `Framework adapter for ${frameworkType} not found`,
      );
    }

    this.logger.log(`Executing workflow with ${frameworkType}`, {
      executionId: context.executionId,
      workflowId: context.workflowId,
      agentId: context.agentId,
    });

    try {
      const startTime = Date.now();
      const result = await adapter.executeWorkflow(
        input.workflowData,
        input.inputData,
        context,
      );

      const executionTime = Date.now() - startTime;
      this.logger.log(`Workflow execution completed for ${frameworkType}`, {
        executionId: context.executionId,
        success: result.success,
        executionTime,
      });

      return {
        ...result,
        executionTime,
      };
    } catch (error) {
      this.logger.error(`Workflow execution failed for ${frameworkType}:`, {
        executionId: context.executionId,
        error: error.message,
      });

      return {
        success: false,
        output: null,
        executionTime: Date.now() - Date.now(), // Will be calculated properly
        resourceUsage: {
          cpuTime: 0,
          memoryPeak: 0,
        },
        steps: [],
        error: {
          message: error.message || 'Execution failed',
          code: 'EXECUTION_ERROR',
          details: error,
        },
      };
    }
  }

  async getExecutionStatus(
    frameworkType: FrameworkType,
    executionId: string,
  ): Promise<ExecutionStep[]> {
    this.frameworkRegistry.validateFrameworkSupport(frameworkType);

    const adapter = this.frameworkRegistry.getAdapter(frameworkType);
    if (!adapter) {
      throw new NotFoundException(
        `Framework adapter for ${frameworkType} not found`,
      );
    }

    try {
      return await adapter.getExecutionStatus(executionId);
    } catch (error) {
      this.logger.error(
        `Failed to get execution status for ${frameworkType}:`,
        error,
      );
      throw error;
    }
  }

  async cancelExecution(
    frameworkType: FrameworkType,
    executionId: string,
  ): Promise<void> {
    this.frameworkRegistry.validateFrameworkSupport(frameworkType);

    const adapter = this.frameworkRegistry.getAdapter(frameworkType);
    if (!adapter) {
      throw new NotFoundException(
        `Framework adapter for ${frameworkType} not found`,
      );
    }

    try {
      await adapter.cancelExecution(executionId);
      this.logger.log(
        `Cancelled execution ${executionId} for ${frameworkType}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to cancel execution for ${frameworkType}:`,
        error,
      );
      throw error;
    }
  }

  async getResourceRequirements(
    frameworkType: FrameworkType,
    workflowData: any,
  ): Promise<{
    cpu: number;
    memory: number;
    gpu?: number;
  }> {
    this.frameworkRegistry.validateFrameworkSupport(frameworkType);

    const adapter = this.frameworkRegistry.getAdapter(frameworkType);
    if (!adapter) {
      throw new NotFoundException(
        `Framework adapter for ${frameworkType} not found`,
      );
    }

    try {
      return await adapter.getResourceRequirements(workflowData);
    } catch (error) {
      this.logger.error(
        `Failed to get resource requirements for ${frameworkType}:`,
        error,
      );
      // Return default requirements
      return {
        cpu: 1,
        memory: 512,
      };
    }
  }

  getSupportedFrameworks(): FrameworkType[] {
    return this.frameworkRegistry.getSupportedFrameworks();
  }

  getFrameworkCapabilities(frameworkType: FrameworkType) {
    const metadata = this.frameworkRegistry.getFrameworkMetadata(frameworkType);
    if (!metadata) {
      throw new NotFoundException(`Framework ${frameworkType} not found`);
    }

    return metadata.capabilities;
  }

  translateError(
    frameworkType: FrameworkType,
    error: any,
  ): {
    message: string;
    code: string;
    frameworkSpecific: any;
  } {
    // Framework-specific error translation
    const translations = {
      langgraph: this.translateLangGraphError,
      agno: this.translateAgnoError,
      crewai: this.translateCrewAIError,
      n8n: this.translateN8nError,
    };

    const translator =
      translations[frameworkType] || this.translateGenericError;
    return translator.call(this, error);
  }

  private translateGenericError(error: any) {
    return {
      message: error.message || 'Unknown error occurred',
      code: 'FRAMEWORK_ERROR',
      frameworkSpecific: error,
    };
  }

  private translateLangGraphError(error: any) {
    // LangGraph specific error translations
    if (error.message?.includes('state')) {
      return {
        message: 'Workflow state management error',
        code: 'LANGGRAPH_STATE_ERROR',
        frameworkSpecific: error,
      };
    }
    return this.translateGenericError(error);
  }

  private translateAgnoError(error: any) {
    // Agno specific error translations
    if (error.message?.includes('instantiation')) {
      return {
        message: 'Agent instantiation failed',
        code: 'AGNO_INSTANTIATION_ERROR',
        frameworkSpecific: error,
      };
    }
    return this.translateGenericError(error);
  }

  private translateCrewAIError(error: any) {
    // CrewAI specific error translations
    if (error.message?.includes('coordination')) {
      return {
        message: 'Multi-agent coordination failed',
        code: 'CREWAI_COORDINATION_ERROR',
        frameworkSpecific: error,
      };
    }
    return this.translateGenericError(error);
  }

  private translateN8nError(error: any) {
    // n8n specific error translations
    if (error.message?.includes('workflow')) {
      return {
        message: 'Workflow validation or execution error',
        code: 'N8N_WORKFLOW_ERROR',
        frameworkSpecific: error,
      };
    }
    return this.translateGenericError(error);
  }
}
