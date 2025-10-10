export type FrameworkType = 'langgraph' | 'agno' | 'crewai' | 'n8n';
export interface FrameworkCapabilities {
    supportsMultiAgent: boolean;
    supportsVisualBuilder: boolean;
    supportsCodeEditor: boolean;
    supportsAsyncExecution: boolean;
    supportsStatePersistence: boolean;
    gpuRequired: boolean;
    maxConcurrentExecutions: number;
    resourceRequirements: {
        cpu: number;
        memory: number;
        gpu?: number;
    };
}
export interface FrameworkMetadata {
    name: string;
    version: string;
    description: string;
    capabilities: FrameworkCapabilities;
    supportedLanguages: string[];
    dependencies: string[];
}
export interface ExecutionInput {
    workflowData: any;
    inputData: any;
    executionOptions?: {
        timeout?: number;
        retryCount?: number;
        priority?: 'low' | 'normal' | 'high';
    };
}
export interface ExecutionResult {
    success: boolean;
    output: any;
    executionTime: number;
    resourceUsage: {
        cpuTime: number;
        memoryPeak: number;
        gpuTime?: number;
    };
    steps: ExecutionStep[];
    error?: {
        message: string;
        code: string;
        details?: any;
    };
}
export interface ExecutionStep {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    startedAt?: Date;
    completedAt?: Date;
    duration?: number;
    output?: any;
    error?: string;
}
export interface FrameworkExecutionContext {
    executionId: string;
    workflowId: string;
    agentId: string;
    userId: string;
    correlationId: string;
    containerId?: string;
    resourceLimits?: {
        cpu: number;
        memory: number;
        timeout: number;
    };
}
export interface IFrameworkAdapter {
    readonly frameworkType: FrameworkType;
    readonly metadata: FrameworkMetadata;
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
