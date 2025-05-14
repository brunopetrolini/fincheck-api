import { Type } from 'class-transformer';
import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

import { BankAccountType } from '../enums';

export class BankAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
