import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { WorkflowRepository } from '../../database/repositories/workflow.repository';
import { AgentRepository } from '../../database/repositories/agent.repository';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';
import { UpdateWorkflowDto } from '../dto/update-workflow.dto';
import { SyncService } from '../../websocket/sync.service';

@Injectable()
export class WorkflowsService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly agentRepository: AgentRepository,
    private readonly userRepository: UserRepository,
    private readonly syncService: SyncService,
  ) {}

  async getAgentWorkflows(userId: string, agentId: string) {
    // Verify user has access to the agent
    const agent = await this.agentRepository.findById(agentId);
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    if (!this.canAccessAgent(userId, agent)) {
      throw new ForbiddenException('Access denied to agent');
    }

    const workflows = await this.workflowRepository.findByAgentId(agentId);

    return {
      workflows: workflows.map((workflow) => this.formatWorkflow(workflow)),
    };
  }

  async createWorkflow(
    userId: string,
    agentId: string,
    createData: CreateWorkflowDto,
  ) {
    // Verify user has access to the agent
    const agent = await this.agentRepository.findById(agentId);
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    if (!this.canAccessAgent(userId, agent)) {
      throw new ForbiddenException('Access denied to agent');
    }

    // Validate framework consistency
    if (createData.framework !== agent.framework) {
      throw new ForbiddenException(
        'Workflow framework must match agent framework',
      );
    }

    // Get the latest version for this agent
    const latestWorkflow =
      await this.workflowRepository.findLatestByAgentId(agentId);
    const nextVersion = latestWorkflow
      ? this.incrementVersion(latestWorkflow.version)
      : '1.0.0';

    const workflow = await this.workflowRepository.create({
      agent: { connect: { id: agentId } },
      name: createData.name,
      description: createData.description,
      workflowData: createData.workflow_data,
      workflowType: createData.workflow_type,
      framework: createData.framework,
      version: nextVersion,
    });

    const formattedWorkflow = this.formatWorkflow(workflow);

    // Emit cross-portal synchronization event
    if (agent.ownerType === 'organization') {
      this.syncService.emitWorkflowCreated(formattedWorkflow, agent.ownerId);
    } else {
      this.syncService.emitToUser(userId, {
        entityType: 'workflow',
        entityId: workflow.id,
        operation: 'create',
        changes: formattedWorkflow,
        sourcePortal: 'user',
      });
    }

    return formattedWorkflow;
  }

  async getWorkflowById(userId: string, workflowId: string) {
    const workflow = await this.workflowRepository.findById(workflowId);
    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    // Verify user has access to the associated agent
    if (!this.canAccessAgent(userId, (workflow as any).agent)) {
      throw new ForbiddenException('Access denied to workflow');
    }

    return this.formatWorkflowDetails(workflow);
  }

  async updateWorkflow(
    userId: string,
    workflowId: string,
    updateData: UpdateWorkflowDto,
  ) {
    const workflow = await this.workflowRepository.findById(workflowId);
    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    if (!this.canAccessAgent(userId, (workflow as any).agent)) {
      throw new ForbiddenException('Access denied to workflow');
    }

    // Increment version when workflow data changes
    const shouldIncrementVersion = updateData.workflow_data !== undefined;
    const nextVersion = shouldIncrementVersion
      ? this.incrementVersion(workflow.version)
      : workflow.version;

    const updatedWorkflow = await this.workflowRepository.update(workflowId, {
      ...(updateData.name && { name: updateData.name }),
      ...(updateData.description !== undefined && {
        description: updateData.description,
      }),
      ...(updateData.workflow_data && {
        workflowData: updateData.workflow_data,
      }),
      ...(shouldIncrementVersion && { version: nextVersion }),
    });

    const formattedWorkflow = this.formatWorkflow(updatedWorkflow);

    // Emit cross-portal synchronization event
    if ((workflow as any).agent.ownerType === 'organization') {
      this.syncService.emitWorkflowUpdated(formattedWorkflow, (workflow as any).agent.ownerId);
    } else {
      this.syncService.emitToUser(userId, {
        entityType: 'workflow',
        entityId: workflowId,
        operation: 'update',
        changes: formattedWorkflow,
        sourcePortal: 'user',
      });
    }

    return formattedWorkflow;
  }

  private canAccessAgent(userId: string, agent: any): boolean {
    if (agent.ownerType === 'user') {
      return agent.ownerId === userId;
    } else if (agent.ownerType === 'organization') {
      // Check if user is a member of the organization
      return (
        agent.orgOwner?.members?.some(
          (member: any) => member.userId === userId,
        ) || false
      );
    }
    return false;
  }

  private incrementVersion(version: string): string {
    const parts = version.split('.');
    const patch = parseInt(parts[2] || '0') + 1;
    return `${parts[0]}.${parts[1]}.${patch}`;
  }

  private formatWorkflow(workflow: any) {
    return {
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      workflow_type: workflow.workflowType,
      framework: workflow.framework,
      version: workflow.version,
      created_at: workflow.createdAt,
      updated_at: workflow.updatedAt,
      is_active: workflow.isActive,
    };
  }

  private formatWorkflowDetails(workflow: any) {
    return {
      ...this.formatWorkflow(workflow),
      workflow_data: workflow.workflowData,
    };
  }
}
