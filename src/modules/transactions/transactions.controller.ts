import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { ActiveUserId } from '@/shared/decorators';

import { TransactionDto } from './dto/transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() transactionDto: TransactionDto) {
    return this.transactionsService.create(userId, transactionDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.transactionsService.findAllByUser(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transactionDto: TransactionDto) {
    return this.transactionsService.update(+id, transactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
