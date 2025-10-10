import { FrameworkType, ExecutionInput, ExecutionResult, FrameworkExecutionContext, ExecutionStep } from '../types/framework.types';
import { FrameworkRegistry } from '../registry/framework-registry';
export declare class FrameworkAbstractionService {
    private readonly frameworkRegistry;
    private readonly logger;
    constructor(frameworkRegistry: FrameworkRegistry);
    validateWorkflow(frameworkType: FrameworkType, workflowData: any): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
    executeWorkflow(frameworkType: FrameworkType, input: ExecutionInput, context: FrameworkExecutionContext): Promise<ExecutionResult>;
    getExecutionStatus(frameworkType: FrameworkType, executionId: string): Promise<ExecutionStep[]>;
    cancelExecution(frameworkType: FrameworkType, executionId: string): Promise<void>;
    getResourceRequirements(frameworkType: FrameworkType, workflowData: any): Promise<{
        cpu: number;
        memory: number;
        gpu?: number;
    }>;
    getSupportedFrameworks(): FrameworkType[];
    getFrameworkCapabilities(frameworkType: FrameworkType): import("../types/framework.types").FrameworkCapabilities;
    translateError(frameworkType: FrameworkType, error: any): {
        message: string;
        code: string;
        frameworkSpecific: any;
    };
    private translateGenericError;
    private translateLangGraphError;
    private translateAgnoError;
    private translateCrewAIError;
    private translateN8nError;
}
