import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EnvValidation {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  PORT: number;
}
