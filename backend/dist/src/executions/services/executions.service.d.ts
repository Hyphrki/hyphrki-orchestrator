import { WorkflowExecutionRepository } from '../../database/repositories/workflow-execution.repository';
import { WorkflowRepository } from '../../database/repositories/workflow.repository';
import { AgentRepository } from '../../database/repositories/agent.repository';
import { UserRepository } from '../../database/repositories/user.repository';
import { FrameworkAbstractionService } from '../../frameworks/abstraction/framework-abstraction.service';
import { ExecuteWorkflowDto } from '../dto/execute-workflow.dto';
import { SyncService } from '../../websocket/sync.service';
export declare class ExecutionsService {
    private readonly executionRepository;
    private readonly workflowRepository;
    private readonly agentRepository;
    private readonly userRepository;
    private readonly frameworkAbstraction;
    private readonly syncService;
    constructor(executionRepository: WorkflowExecutionRepository, workflowRepository: WorkflowRepository, agentRepository: AgentRepository, userRepository: UserRepository, frameworkAbstraction: FrameworkAbstractionService, syncService: SyncService);
    executeWorkflow(userId: string, workflowId: string, executeData?: ExecuteWorkflowDto): Promise<{
        execution_id: string;
        status: string;
        started_at: Date;
        correlation_id: string;
    }>;
    getExecutionById(userId: string, executionId: string): Promise<{
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
    getExecutions(userId: string, query?: any): Promise<{
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
    private processExecution;
    private canAccessAgent;
    private getUserAccessibleAgentIds;
    private formatExecution;
    private formatExecutionDetails;
}
