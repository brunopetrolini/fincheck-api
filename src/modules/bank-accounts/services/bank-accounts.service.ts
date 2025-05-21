import { Injectable } from '@nestjs/common';

import { BankAccountsRepository } from '@/shared/database/prisma/repositories';

import { BankAccountDto } from '../dto/bank-account.dto';
import { BankAccountOwnershipService } from './bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly bankAccountOwnershipService: BankAccountOwnershipService,
  ) {}

  create(userId: string, bankAccountDto: BankAccountDto) {
    const { name, initialBalance, type, color } = bankAccountDto;
    return this.bankAccountsRepository.save({
      name,
      initialBalance,
      type,
      color,
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        initialBalance: true,
        type: true,
        color: true,
        createdAt: false,
        updatedAt: false,
        userId: false,
        transactions: {
          select: {
            type: true,
            amount: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const transactionsBalance = transactions.reduce(
        (acc: number, transaction) =>
          acc + (transaction.type === 'INCOME' ? Number(transaction.amount) : -Number(transaction.amount)),
        0,
      );

      return {
        ...bankAccount,
        initialBalance: Number(bankAccount.initialBalance),
        currentBalance: Number(bankAccount.initialBalance) + transactionsBalance,
      };
    });
  }

  async update(userId: string, bankAccountId: string, bankAccountDto: BankAccountDto) {
    const { name, initialBalance, type, color } = bankAccountDto;

    await this.bankAccountOwnershipService.validate(userId, bankAccountId);

    return this.bankAccountsRepository.update(bankAccountId, {
      name,
      initialBalance,
      type,
      color,
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.bankAccountOwnershipService.validate(userId, bankAccountId);
    await this.bankAccountsRepository.delete(bankAccountId);
  }
}
