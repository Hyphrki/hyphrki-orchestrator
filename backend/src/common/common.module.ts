import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventBusService } from './services/event-bus.service';
import { EncryptionService } from './services/encryption.service';
import { RedisConfigService } from '../config/redis.config';

@Module({
  imports: [ConfigModule],
  providers: [EventBusService, EncryptionService, RedisConfigService],
  exports: [EventBusService, EncryptionService, RedisConfigService],
})
export class CommonModule {}
