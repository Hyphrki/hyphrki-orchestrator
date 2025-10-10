import { IsOptional, IsObject, IsNumber, Min } from 'class-validator';

export class ExecuteWorkflowDto {
  @IsOptional()
  @IsObject()
  input_data?: any;

  @IsOptional()
  @IsObject()
  execution_options?: {
    timeout?: number;
    retry_count?: number;
  };
}
