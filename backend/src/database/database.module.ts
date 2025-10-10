import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { AgentRepository } from './repositories/agent.repository';
import { WorkflowRepository } from './repositories/workflow.repository';
import { WorkflowExecutionRepository } from './repositories/workflow-execution.repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    UserRepository,
    AgentRepository,
    WorkflowRepository,
    WorkflowExecutionRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    AgentRepository,
    WorkflowRepository,
    WorkflowExecutionRepository,
  ],
})
export class DatabaseModule {}
