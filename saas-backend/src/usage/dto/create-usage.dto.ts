// src/usage/dto/create-usage.dto.ts
import { IsString, IsOptional, IsIn, Matches } from 'class-validator';

export class CreateUsageDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  apiKeyId?: string | null;

  @IsString()
  endpoint: string;

  @IsIn(['GET', 'POST', 'PUT', 'DELETE'])
  method: string;

  @Matches(/^\d{4}-\d{2}$/)
  month: string;
}
