import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WebSocketModule } from '../websocket/websocket.module';
import { N8NModule } from '../n8n/n8n.module';
import { ParametersModule } from '../parameters/parameters.module';
import { CommonModule } from '../common/common.module';
import { AgentsController } from './controllers/agents.controller';
import { AgentsService } from './services/agents.service';

@Module({
  imports: [DatabaseModule, WebSocketModule, N8NModule, ParametersModule, CommonModule],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
