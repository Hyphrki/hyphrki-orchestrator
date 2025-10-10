import { WorkflowsService } from '../services/workflows.service';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';
import { UpdateWorkflowDto } from '../dto/update-workflow.dto';
export declare class WorkflowsController {
    private readonly workflowsService;
    constructor(workflowsService: WorkflowsService);
    getWorkflow(userId: string, workflowId: string): Promise<{
        workflow_data: any;
        id: any;
        name: any;
        description: any;
        workflow_type: any;
        framework: any;
        version: any;
        created_at: any;
        updated_at: any;
        is_active: any;
    }>;
    updateWorkflow(userId: string, workflowId: string, updateData: UpdateWorkflowDto): Promise<{
        id: any;
        name: any;
        description: any;
        workflow_type: any;
        framework: any;
        version: any;
        created_at: any;
        updated_at: any;
        is_active: any;
    }>;
}
export declare class AgentWorkflowsController {
    private readonly workflowsService;
    constructor(workflowsService: WorkflowsService);
    getAgentWorkflows(userId: string, agentId: string): Promise<{
        workflows: {
            id: any;
            name: any;
            description: any;
            workflow_type: any;
            framework: any;
            version: any;
            created_at: any;
            updated_at: any;
            is_active: any;
        }[];
    }>;
    createWorkflow(userId: string, agentId: string, createData: CreateWorkflowDto): Promise<{
        id: any;
        name: any;
        description: any;
        workflow_type: any;
        framework: any;
        version: any;
        created_at: any;
        updated_at: any;
        is_active: any;
    }>;
}
