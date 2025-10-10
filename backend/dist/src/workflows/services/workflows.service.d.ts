import { WorkflowRepository } from '../../database/repositories/workflow.repository';
import { AgentRepository } from '../../database/repositories/agent.repository';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';
import { UpdateWorkflowDto } from '../dto/update-workflow.dto';
import { SyncService } from '../../websocket/sync.service';
export declare class WorkflowsService {
    private readonly workflowRepository;
    private readonly agentRepository;
    private readonly userRepository;
    private readonly syncService;
    constructor(workflowRepository: WorkflowRepository, agentRepository: AgentRepository, userRepository: UserRepository, syncService: SyncService);
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
    getWorkflowById(userId: string, workflowId: string): Promise<{
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
    private canAccessAgent;
    private incrementVersion;
    private formatWorkflow;
    private formatWorkflowDetails;
}
