import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from '@/shared/database/prisma/repositories';

import { BankAccountOwnershipService } from '../bank-accounts/services';
import { CategoryOwnershipService } from '../categories/services';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountOwnershipService: BankAccountOwnershipService,
    private readonly categoryOwnershipService: CategoryOwnershipService,
  ) {}

  async create(userId: string, transactionDto: TransactionDto) {
    const { bankAccountId, categoryId, description, transactionDate, type, amount } = transactionDto;

    await this.validateEntitiesOwnership(userId, bankAccountId, categoryId);

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

  async update(userId: string, transactionId: string, transactionDto: TransactionDto) {
    const { bankAccountId, categoryId, description, transactionDate, type, amount } = transactionDto;

    await this.validateEntitiesOwnership(userId, bankAccountId, categoryId);

    return this.transactionsRepository.update(transactionId, {
      description,
      transactionDate,
      type,
      amount,
      category: {
        connect: {
          id: categoryId,
        },
      },
      bankAccount: {
        connect: {
          id: bankAccountId,
        },
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateTransactionOwnership(userId, transactionId);
    await this.transactionsRepository.delete(transactionId);
  }

  private async validateTransactionOwnership(userId: string, transactionId: string) {
    const transaction = await this.transactionsRepository.findUnique({ id: transactionId });
    if (!transaction || transaction.userId !== userId) throw new Error('Transaction not found');
  }

  private async validateEntitiesOwnership(
    userId: string,
    transactionId?: string,
    bankAccountId?: string,
    categoryId?: string,
  ) {
    await Promise.all([
      transactionId && (await this.validateTransactionOwnership(userId, transactionId)),
      bankAccountId && (await this.bankAccountOwnershipService.validate(userId, bankAccountId)),
      categoryId && (await this.categoryOwnershipService.validate(userId, categoryId)),
    ]);
  }
}
