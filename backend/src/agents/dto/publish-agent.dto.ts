import { IsString, IsOptional, IsBoolean, IsEnum, MaxLength } from 'class-validator';
import { PublicationStatus } from '@prisma/client';

export class PublishAgentDto {
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  releaseNotes?: string;

  @IsBoolean()
  @IsOptional()
  isBreakingUpdate?: boolean = false;

  @IsEnum(PublicationStatus)
  @IsOptional()
  targetStatus?: PublicationStatus = PublicationStatus.published;
}