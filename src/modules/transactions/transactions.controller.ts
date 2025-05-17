import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

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
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId') bankAccountId?: string,
  ) {
    return this.transactionsService.findAllByUser(userId, { month, year, bankAccountId });
  }

  @Put(':id')
  update(@ActiveUserId() userId: string, @Param('id') id: string, @Body() transactionDto: TransactionDto) {
    return this.transactionsService.update(userId, id, transactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.transactionsService.remove(userId, id);
  }
}
