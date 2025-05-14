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
  findAll() {
    return this.bankAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bankAccountDto: BankAccountDto) {
    return this.bankAccountsService.update(+id, bankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountsService.remove(+id);
  }
}
