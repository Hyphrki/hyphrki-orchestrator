import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AgentsService } from '../services/agents.service';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { PublishAgentDto } from '../dto/publish-agent.dto';
import { PublicationStatus } from '@prisma/client';
import { AdminGuard } from '../../auth/guards/admin.guard';

@Controller('agents')
@UseGuards(AdminGuard)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  async createAgent(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.createAgent(createAgentDto);
  }

  @Get()
  async listAgents(
    @Query('status') status?: PublicationStatus,
    @Query('category') category?: string,
    @Query('createdById') createdById?: string,
  ) {
    return this.agentsService.listAgents(status, category, createdById);
  }

  @Get(':id')
  async getAgent(@Param('id') id: string) {
    return this.agentsService.getAgent(id);
  }

  @Patch(':id')
  async updateAgent(@Param('id') id: string, @Body() updateData: Partial<CreateAgentDto>) {
    return this.agentsService.updateAgent(id, updateData);
  }

  @Delete(':id')
  async deleteAgent(@Param('id') id: string) {
    await this.agentsService.deleteAgent(id);
    return { message: 'Agent deleted successfully' };
  }

  @Post(':id/publish')
  async publishAgent(@Param('id') id: string, @Body() publishDto: PublishAgentDto) {
    return this.agentsService.publishAgent(id, publishDto);
  }

  @Post(':id/unpublish')
  async unpublishAgent(@Param('id') id: string) {
    return this.agentsService.unpublishAgent(id);
  }

  @Post(':id/assign/:userId')
  async assignAgentToUser(
    @Param('id') agentId: string,
    @Param('userId') userId: string,
    @Body() customConfig?: any,
  ) {
    return this.agentsService.assignAgentToUser(agentId, userId, customConfig);
  }

  @Get('user/:userId/assigned')
  async getUserAssignedAgents(@Param('userId') userId: string) {
    return this.agentsService.getUserAssignedAgents(userId);
  }

  @Delete('assignments/:assignmentId')
  async removeAgentAssignment(@Param('assignmentId') assignmentId: string) {
    return this.agentsService.removeAgentAssignment(assignmentId);
  }

  @Get(':id/analytics')
  async getAgentAnalytics(
    @Param('id') agentId: string,
    @Query('timeRange') timeRange?: string,
  ) {
    return this.agentsService.getAgentAnalytics(agentId, timeRange);
  }

  @Get('analytics/summary')
  async getAgentsWithAnalytics() {
    return this.agentsService.getAgentsWithAnalytics();
  }
}