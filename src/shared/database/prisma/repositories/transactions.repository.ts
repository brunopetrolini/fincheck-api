import { Injectable } from '@nestjs/common';
import type { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(transaction: Prisma.TransactionCreateInput) {
    const createdTransaction = await this.prismaService.transaction.create({
      data: transaction,
      select: {
        id: true,
        categoryId: true,
        bankAccountId: true,
        transactionDate: true,
        description: true,
        amount: true,
        type: true,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    return {
      ...createdTransaction,
      amount: Number(createdTransaction.amount),
    };
  }

  async findMany(args: Prisma.TransactionFindManyArgs['where']) {
    const transactions = await this.prismaService.transaction.findMany({
      where: args,
      select: {
        id: true,
        categoryId: true,
        bankAccountId: true,
        transactionDate: true,
        description: true,
        amount: true,
        type: true,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
    }));
  }

  async update(id: string, transaction: Prisma.TransactionUpdateInput) {
    const updatedTransaction = await this.prismaService.transaction.update({
      where: { id },
      data: transaction,
      select: {
        id: true,
        description: true,
        amount: true,
        transactionDate: true,
        type: true,
        bankAccountId: true,
        categoryId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    return {
      ...updatedTransaction,
      amount: Number(transaction.amount),
    };
  }
}
