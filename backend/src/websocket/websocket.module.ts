import { Module, forwardRef } from '@nestjs/common';
import { WebSocketGateway } from './websocket.gateway';
import { SyncService } from './sync.service';
import { EventService } from './event.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [JwtModule, DatabaseModule],
  providers: [WebSocketGateway, SyncService, EventService],
  exports: [WebSocketGateway, SyncService, EventService],
})
export class WebSocketModule {}
