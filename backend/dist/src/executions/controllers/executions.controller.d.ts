import { ExecutionsService } from '../services/executions.service';
import { ExecuteWorkflowDto } from '../dto/execute-workflow.dto';
export declare class ExecutionsController {
    private readonly executionsService;
    constructor(executionsService: ExecutionsService);
    getExecutions(userId: string, query: any): Promise<{
        executions: {
            id: any;
            workflow_id: any;
            agent_id: any;
            status: any;
            started_at: any;
            completed_at: any;
            correlation_id: any;
        }[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            pages: number;
        };
    }>;
    getExecution(userId: string, executionId: string): Promise<{
        status_message: any;
        completed_at: any;
        paused_at: any;
        resumed_at: any;
        execution_data: any;
        execution_logs: any;
        error_message: any;
        error_code: any;
        retry_count: any;
        max_retries: any;
        resource_usage: any;
        performance_metrics: any;
        correlation_id: any;
        parent_execution_id: any;
        created_at: any;
        updated_at: any;
        id: any;
        workflow_id: any;
        agent_id: any;
        status: any;
        started_at: any;
    }>;
}
export declare class WorkflowExecutionsController {
    private readonly executionsService;
    constructor(executionsService: ExecutionsService);
    executeWorkflow(userId: string, workflowId: string, executeData: ExecuteWorkflowDto): Promise<{
        execution_id: string;
        status: string;
        started_at: Date;
        correlation_id: string;
    }>;
}
