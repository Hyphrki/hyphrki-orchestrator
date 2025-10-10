import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsObject, MaxLength, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { PricingTier } from '@prisma/client';

export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  n8nWorkflowId?: string;

  @IsObject()
  @IsNotEmpty()
  n8nWorkflowJson: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  version: string;

  @IsEnum(PricingTier)
  @IsOptional()
  pricingTier?: PricingTier = PricingTier.free;

  @IsUUID()
  @IsNotEmpty()
  createdById: string;
}