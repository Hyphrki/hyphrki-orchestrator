import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExecutionsService } from '../services/executions.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../auth/decorators/user.decorator';
import { ExecuteWorkflowDto } from '../dto/execute-workflow.dto';
import {
  AuthorizationGuard,
  Resource,
  RequirePermissions,
  PermissionGroups,
} from '../../security/authorization/authorization.decorators';
import { ResourceType } from '../../security/authorization/authorization.types';

@Controller('executions')
@UseGuards(JwtAuthGuard)
@Resource(ResourceType.EXECUTION)
export class ExecutionsController {
  constructor(private readonly executionsService: ExecutionsService) {}

  @Get()
  @RequirePermissions(PermissionGroups.EXECUTION_MANAGEMENT[0]) // execution:read
  async getExecutions(@User('id') userId: string, @Query() query: any) {
    const {
      workflow_id,
      agent_id,
      status,
      start_date,
      end_date,
      page = 1,
      limit = 20,
    } = query;

    return this.executionsService.getExecutions(userId, {
      workflow_id,
      agent_id,
      status,
      start_date,
      end_date,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @Get(':id')
  @RequirePermissions(PermissionGroups.EXECUTION_MANAGEMENT[0]) // execution:read
  async getExecution(
    @User('id') userId: string,
    @Param('id') executionId: string,
  ) {
    return this.executionsService.getExecutionById(userId, executionId);
  }
}

// Separate controller for workflow-specific execution routes
@Controller('workflows')
@UseGuards(JwtAuthGuard)
@Resource(ResourceType.EXECUTION)
export class WorkflowExecutionsController {
  constructor(private readonly executionsService: ExecutionsService) {}

  @Post(':id/execute')
  @RequirePermissions(PermissionGroups.EXECUTION_MANAGEMENT[1]) // execution:create
  async executeWorkflow(
    @User('id') userId: string,
    @Param('id') workflowId: string,
    @Body() executeData: ExecuteWorkflowDto,
  ) {
    return this.executionsService.executeWorkflow(
      userId,
      workflowId,
      executeData,
    );
  }
}
