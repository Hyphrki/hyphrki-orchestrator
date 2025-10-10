import { Controller, Get, Patch, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminGuard } from '../../auth/guards/admin.guard';

@Controller('admin/users')
@UseGuards(AdminGuard)
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  async listUsers(
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
    @Query('subscriptionTier') subscriptionTier?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminUsersService.listUsers({
      search,
      role,
      status,
      subscriptionTier,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.adminUsersService.getUserDetail(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: {
      firstName?: string;
      lastName?: string;
      subscriptionTier?: string;
      role?: string;
    },
  ) {
    return this.adminUsersService.updateUser(id, updateData);
  }

  @Post(':id/suspend')
  async suspendUser(@Param('id') id: string) {
    return this.adminUsersService.suspendUser(id);
  }

  @Post(':id/activate')
  async activateUser(@Param('id') id: string) {
    return this.adminUsersService.activateUser(id);
  }

  @Patch(':id/role')
  async updateUserRole(
    @Param('id') id: string,
    @Body() data: { role: string },
  ) {
    return this.adminUsersService.updateUserRole(id, data.role);
  }

  @Post(':id/workflows')
  async assignWorkflow(
    @Param('id') userId: string,
    @Body() data: { workflowId: string },
  ) {
    return this.adminUsersService.assignWorkflow(userId, data.workflowId);
  }

  @Get(':id/workflows')
  async getUserWorkflows(@Param('id') userId: string) {
    return this.adminUsersService.getUserWorkflows(userId);
  }

  @Get(':id/agents')
  async getUserAgents(@Param('id') userId: string) {
    return this.adminUsersService.getUserAssignedAgents(userId);
  }

  @Get(':id/deployments')
  async getUserDeployments(@Param('id') userId: string) {
    return this.adminUsersService.getUserDeployments(userId);
  }
}
