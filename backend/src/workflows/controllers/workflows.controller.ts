import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WorkflowsService } from '../services/workflows.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../auth/decorators/user.decorator';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';
import { UpdateWorkflowDto } from '../dto/update-workflow.dto';
import {
  AuthorizationGuard,
  Resource,
  RequirePermissions,
  PermissionGroups,
} from '../../security/authorization/authorization.decorators';
import { ResourceType } from '../../security/authorization/authorization.types';

@Controller('workflows')
@UseGuards(JwtAuthGuard)
@Resource(ResourceType.WORKFLOW)
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get(':id')
  @RequirePermissions(PermissionGroups.WORKFLOW_MANAGEMENT[0]) // workflow:read
  async getWorkflow(
    @User('id') userId: string,
    @Param('id') workflowId: string,
  ) {
    return this.workflowsService.getWorkflowById(userId, workflowId);
  }

  @Put(':id')
  @RequirePermissions(PermissionGroups.WORKFLOW_MANAGEMENT[1]) // workflow:update
  async updateWorkflow(
    @User('id') userId: string,
    @Param('id') workflowId: string,
    @Body() updateData: UpdateWorkflowDto,
  ) {
    return this.workflowsService.updateWorkflow(userId, workflowId, updateData);
  }
}

// Separate controller for agent-specific workflow routes
@Controller('agents')
@UseGuards(JwtAuthGuard)
@Resource(ResourceType.WORKFLOW)
export class AgentWorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get(':agentId/workflows')
  @RequirePermissions(PermissionGroups.WORKFLOW_MANAGEMENT[0]) // workflow:read
  async getAgentWorkflows(
    @User('id') userId: string,
    @Param('agentId') agentId: string,
  ) {
    return this.workflowsService.getAgentWorkflows(userId, agentId);
  }

  @Post(':agentId/workflows')
  @RequirePermissions(PermissionGroups.WORKFLOW_MANAGEMENT[1]) // workflow:create
  async createWorkflow(
    @User('id') userId: string,
    @Param('agentId') agentId: string,
    @Body() createData: CreateWorkflowDto,
  ) {
    return this.workflowsService.createWorkflow(userId, agentId, createData);
  }
}
