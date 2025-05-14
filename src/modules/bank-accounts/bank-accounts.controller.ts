import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ActiveUserId } from '@/shared/decorators';

import { BankAccountsService } from './bank-accounts.service';
import { BankAccountDto } from './dto';

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
  remove(@Param('id') id: string) {
    return this.bankAccountsService.remove(+id);
  }
}
