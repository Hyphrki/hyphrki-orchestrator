import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ParameterTypeInferenceService } from './services/type-inference.service';

@Module({
  imports: [DatabaseModule],
  providers: [ParameterTypeInferenceService],
  exports: [ParameterTypeInferenceService],
})
export class ParametersModule {}
