import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from '@/shared/database/prisma/repositories';

import { BankAccountOwnershipService } from '../bank-accounts/services';
import { CategoryOwnershipService } from '../categories/services';
import { TransactionDto } from './dto/transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountOwnershipService: BankAccountOwnershipService,
    private readonly categoryOwnershipService: CategoryOwnershipService,
  ) {}

  async create(userId: string, transactionDto: TransactionDto) {
    const { bankAccountId, categoryId, description, transactionDate, type, amount } = transactionDto;

    await this.bankAccountOwnershipService.validate(userId, bankAccountId);
    await this.categoryOwnershipService.validate(userId, categoryId);

    return await this.transactionsRepository.save({
      description,
      transactionDate,
      type,
      amount,
      user: {
        connect: {
          id: userId,
        },
      },
      bankAccount: {
        connect: {
          id: bankAccountId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    });
  }

  findAllByUser(userId: string) {
    return this.transactionsRepository.findMany({ userId });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
