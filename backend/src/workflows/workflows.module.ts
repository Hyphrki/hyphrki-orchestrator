import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WebSocketModule } from '../websocket/websocket.module';
import {
  WorkflowsController,
  AgentWorkflowsController,
} from './controllers/workflows.controller';
import { WorkflowsService } from './services/workflows.service';

@Module({
  imports: [DatabaseModule, WebSocketModule],
  controllers: [WorkflowsController, AgentWorkflowsController],
  providers: [WorkflowsService],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
