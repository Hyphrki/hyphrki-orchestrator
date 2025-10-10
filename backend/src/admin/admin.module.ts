import { Module } from '@nestjs/common';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminDeploymentsController } from './controllers/admin-deployments.controller';
import { AdminUsersService } from './services/admin-users.service';
import { AdminDeploymentsService } from './services/admin-deployments.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminUsersController, AdminDeploymentsController],
  providers: [AdminUsersService, AdminDeploymentsService],
  exports: [AdminUsersService, AdminDeploymentsService],
})
export class AdminModule {}
