import { Module } from '@nestjs/common';
import { DeploymentsController, ExecutionsController } from './deployments.controller';
import { DeploymentsService } from './deployments.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DeploymentsController, ExecutionsController],
  providers: [DeploymentsService],
  exports: [DeploymentsService],
})
export class DeploymentsModule {}
