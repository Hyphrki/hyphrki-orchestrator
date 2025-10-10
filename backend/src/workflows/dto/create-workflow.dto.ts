import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsObject,
  MinLength,
} from 'class-validator';

export class CreateWorkflowDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsObject()
  workflow_data: any;

  @IsNotEmpty()
  @IsIn(['visual', 'code'])
  workflow_type: string;

  @IsNotEmpty()
  @IsIn(['langgraph', 'agno', 'crewai', 'n8n'])
  framework: string;
}
