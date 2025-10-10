import { BaseFrameworkAdapter } from '../abstraction/base-framework.adapter';
import { ExecutionResult, ExecutionStep, FrameworkExecutionContext } from '../types/framework.types';
export declare class CrewAIAdapter extends BaseFrameworkAdapter {
    private readonly executions;
    constructor();
    initialize(config: any): Promise<void>;
    shutdown(): Promise<void>;
    validateWorkflow(workflowData: any): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
    executeWorkflow(workflowData: any, inputData: any, context: FrameworkExecutionContext): Promise<ExecutionResult>;
    getExecutionStatus(executionId: string): Promise<ExecutionStep[]>;
    cancelExecution(executionId: string): Promise<void>;
    getResourceRequirements(workflowData: any): Promise<{
        cpu: number;
        memory: number;
        gpu?: number;
    }>;
}
