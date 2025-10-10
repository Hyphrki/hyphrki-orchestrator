import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FrameworksModule } from '../frameworks/frameworks.module';
import { WebSocketModule } from '../websocket/websocket.module';
import {
  ExecutionsController,
  WorkflowExecutionsController,
} from './controllers/executions.controller';
import { ExecutionsService } from './services/executions.service';

@Module({
  imports: [DatabaseModule, FrameworksModule, WebSocketModule],
  controllers: [ExecutionsController, WorkflowExecutionsController],
  providers: [ExecutionsService],
  exports: [ExecutionsService],
})
export class ExecutionsModule {}
