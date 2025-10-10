import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { EncryptionService } from './encryption/encryption.service';
import { TlsService } from './tls/tls.service';
import { DatabaseEncryptionService } from '../database/encryption/database-encryption.service';
import { AuthorizationService } from './authorization/authorization.service';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    EncryptionService,
    TlsService,
    DatabaseEncryptionService,
    AuthorizationService,
    AuthorizationGuard,
  ],
  exports: [
    EncryptionService,
    TlsService,
    DatabaseEncryptionService,
    AuthorizationService,
    AuthorizationGuard,
  ],
})
export class SecurityModule {}
