import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  slug: string;

  @IsOptional()
  @IsIn(['basic', 'pro', 'enterprise'])
  subscription_tier?: string;
}
