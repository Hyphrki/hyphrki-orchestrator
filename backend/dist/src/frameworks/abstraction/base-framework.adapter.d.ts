import { Logger } from '@nestjs/common';
import { IFrameworkAdapter, FrameworkType, FrameworkMetadata, ExecutionResult, ExecutionStep, FrameworkExecutionContext } from '../types/framework.types';
export declare abstract class BaseFrameworkAdapter implements IFrameworkAdapter {
    readonly frameworkType: FrameworkType;
    readonly metadata: FrameworkMetadata;
    protected readonly logger: Logger;
    constructor(frameworkType: FrameworkType, metadata: FrameworkMetadata);
    abstract initialize(config: any): Promise<void>;
    abstract shutdown(): Promise<void>;
    abstract validateWorkflow(workflowData: any): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
    abstract executeWorkflow(workflowData: any, inputData: any, context: FrameworkExecutionContext): Promise<ExecutionResult>;
    abstract getExecutionStatus(executionId: string): Promise<ExecutionStep[]>;
    abstract cancelExecution(executionId: string): Promise<void>;
    abstract getResourceRequirements(workflowData: any): Promise<{
        cpu: number;
        memory: number;
        gpu?: number;
    }>;
    protected createErrorResult(message: string, code: string, executionTime?: number): ExecutionResult;
    protected createSuccessResult(output: any, executionTime: number, steps: ExecutionStep[], resourceUsage: {
        cpuTime: number;
        memoryPeak: number;
        gpuTime?: number;
    }): ExecutionResult;
    protected validateRequiredFields(workflowData: any, requiredFields: string[]): string[];
    protected validateWorkflowStructure(workflowData: any): {
        valid: boolean;
        errors: string[];
    };
    protected executeWithTimeout<T>(operation: () => Promise<T>, timeoutMs: number, executionId: string): Promise<T>;
    protected logExecutionStart(context: FrameworkExecutionContext): void;
    protected logExecutionComplete(context: FrameworkExecutionContext, success: boolean, executionTime: number): void;
    protected logExecutionError(context: FrameworkExecutionContext, error: any): void;
}
