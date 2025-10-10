import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminDeploymentsService } from '../services/admin-deployments.service';
import { AdminGuard } from '../../auth/guards/admin.guard';

@Controller('admin/deployments')
@UseGuards(AdminGuard)
export class AdminDeploymentsController {
  constructor(private readonly adminDeploymentsService: AdminDeploymentsService) {}

  @Get()
  async listDeployments(
    @Query('userId') userId?: string,
    @Query('agentTemplateId') agentTemplateId?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminDeploymentsService.listDeployments({
      userId,
      agentTemplateId,
      status,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get(':id')
  async getDeployment(@Param('id') id: string) {
    return this.adminDeploymentsService.getDeploymentDetail(id);
  }

  @Get(':id/executions')
  async getDeploymentExecutions(
    @Param('id') deploymentId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminDeploymentsService.getDeploymentExecutions(
      deploymentId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Post(':id/execute')
  async executeDeployment(
    @Param('id') deploymentId: string,
    @Body() inputParameters: Record<string, any>,
  ) {
    return this.adminDeploymentsService.executeDeployment(deploymentId, inputParameters);
  }
}
