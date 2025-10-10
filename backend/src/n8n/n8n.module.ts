import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { N8NApiService } from './services/n8n-api.service';
import { N8NWorkflowParserService } from './services/parser.service';

@Module({
  imports: [ConfigModule],
  providers: [N8NApiService, N8NWorkflowParserService],
  exports: [N8NApiService, N8NWorkflowParserService],
})
export class N8NModule {}
