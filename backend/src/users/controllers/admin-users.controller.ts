import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Body, 
  Query, 
  UseGuards,
  ParseUUIDPipe 
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import type { UserFilters } from '../services/users.service';
import { AdminGuard } from '../../auth/guards/admin.guard';

export class UpdateUserDto {
  first_name?: string;
  last_name?: string;
  subscription_tier?: string;
  role?: string;
}

export class AssignWorkflowDto {
  workflowId: string;
}

export class UpdateRoleDto {
  role: string;
}

@Controller('admin/users')
@UseGuards(AdminGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listUsers(@Query() filters: UserFilters) {
    return this.usersService.listAllUsers(filters);
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: UpdateUserDto
  ) {
    return this.usersService.updateUser(id, updateData);
  }

  @Post(':id/suspend')
  async suspendUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.suspendUser(id);
  }

  @Post(':id/activate')
  async activateUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.activateUser(id);
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() roleData: UpdateRoleDto
  ) {
    return this.usersService.updateUserRole(id, roleData.role);
  }

  @Post(':id/workflows')
  async assignWorkflow(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() workflowData: AssignWorkflowDto
  ) {
    return this.usersService.assignPersonalizedWorkflow(userId, workflowData.workflowId);
  }

  @Get(':id/workflows')
  async getUserWorkflows(@Param('id', ParseUUIDPipe) userId: string) {
    return this.usersService.getUserAssignedWorkflows(userId);
  }
}
