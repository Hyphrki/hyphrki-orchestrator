import { ConfigService } from '@nestjs/config';
export interface N8NWorkflow {
    id: string;
    name: string;
    active: boolean;
    nodes: any[];
    connections: any;
    settings?: any;
    staticData?: any;
    tags?: string[];
    versionId?: string;
}
export interface N8NExecution {
    id: string;
    finished: boolean;
    mode: string;
    startedAt: string;
    stoppedAt?: string;
    status: 'success' | 'error' | 'waiting' | 'running';
    workflowData: {
        id: string;
        name: string;
        nodes: any[];
        connections: any;
    };
    data: {
        resultData: {
            runData: any;
        };
    };
    error?: {
        message: string;
        node?: {
            name: string;
            type: string;
        };
    };
}
export interface N8NExecutionResponse {
    executionId: string;
    status: 'queued' | 'running' | 'completed' | 'failed';
    message?: string;
}
export declare class N8NApiService {
    private configService;
    private readonly logger;
    private readonly httpClient;
    private readonly apiUrl;
    private readonly apiKey;
    private readonly webhookBaseUrl;
    constructor(configService: ConfigService);
    createWorkflow(workflowJson: any): Promise<N8NWorkflow>;
    getWorkflow(workflowId: string): Promise<N8NWorkflow>;
    updateWorkflow(workflowId: string, workflowData: Partial<N8NWorkflow>): Promise<N8NWorkflow>;
    setWorkflowActive(workflowId: string, active: boolean): Promise<void>;
    deleteWorkflow(workflowId: string): Promise<void>;
    executeWorkflow(webhookPath: string, parameters: Record<string, any>): Promise<N8NExecutionResponse>;
    getExecutionStatus(executionId: string): Promise<N8NExecution>;
    listExecutions(limit?: number): Promise<N8NExecution[]>;
    testConnection(): Promise<boolean>;
    getWebhookUrl(webhookPath: string): string;
}
