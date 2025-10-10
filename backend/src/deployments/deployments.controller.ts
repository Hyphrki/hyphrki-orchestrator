import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DeploymentsService } from './deployments.service';
import { CreateDeploymentDto, ExecuteDeploymentDto } from './dto/create-deployment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { DeploymentStatus } from '@prisma/client';

@Controller('deployments')
@UseGuards(JwtAuthGuard)
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @Post()
  async createDeployment(
    @User('id') userId: string,
    @Body() createDeploymentDto: CreateDeploymentDto,
  ) {
    return this.deploymentsService.createDeployment(userId, createDeploymentDto);
  }

  @Get()
  async listDeployments(
    @User('id') userId: string,
    @Query('status') status?: DeploymentStatus,
  ) {
    return this.deploymentsService.listDeployments(userId, status);
  }

  @Get(':id')
  async getDeployment(@Param('id') id: string) {
    return this.deploymentsService.getDeployment(id);
  }

  @Post(':id/execute')
  async executeDeployment(
    @Param('id') deploymentId: string,
    @User('id') userId: string,
    @Body() executeDto: ExecuteDeploymentDto,
  ) {
    return this.deploymentsService.executeDeployment(deploymentId, userId, executeDto);
  }

  @Delete(':id')
  async deleteDeployment(@Param('id') id: string) {
    await this.deploymentsService.deleteDeployment(id);
    return { message: 'Deployment deleted successfully' };
  }

  @Get(':id/executions')
  async getDeploymentExecutions(@Param('id') deploymentId: string) {
    return this.deploymentsService.listExecutions(undefined, deploymentId);
  }
}

@Controller('executions')
@UseGuards(JwtAuthGuard)
export class ExecutionsController {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @Get()
  async listExecutions(
    @User('id') userId: string,
    @Query('deploymentId') deploymentId?: string,
  ) {
    return this.deploymentsService.listExecutions(userId, deploymentId);
  }

  @Get(':id')
  async getExecution(@Param('id') id: string) {
    return this.deploymentsService.getExecution(id);
  }
}
