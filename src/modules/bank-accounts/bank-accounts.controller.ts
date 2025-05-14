import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { ActiveUserId } from '@/shared/decorators';

import { BankAccountDto } from './dto';
import { BankAccountsService } from './services/bank-accounts.service';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() bankAccountDto: BankAccountDto) {
    return this.bankAccountsService.create(userId, bankAccountDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Put(':id')
  update(@ActiveUserId() userId: string, @Param('id') bankAccountId: string, @Body() bankAccountDto: BankAccountDto) {
    return this.bankAccountsService.update(userId, bankAccountId, bankAccountDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@ActiveUserId() userId: string, @Param('id') bankAccountId: string) {
    await this.bankAccountsService.remove(userId, bankAccountId);
  }
}
