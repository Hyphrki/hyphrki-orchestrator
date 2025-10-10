import { IsOptional, IsString, IsObject, MinLength } from 'class-validator';

export class UpdateWorkflowDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  workflow_data?: any;
}
