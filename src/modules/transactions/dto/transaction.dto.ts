import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

import { TransactionType } from '../enums';

export class TransactionDto {
  @IsNotEmpty()
  @IsString()
  bankAccountId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  transactionDate: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
