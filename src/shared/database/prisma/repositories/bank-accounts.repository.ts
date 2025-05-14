import { Injectable } from '@nestjs/common';
import type { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(bankAccount: Prisma.BankAccountCreateInput) {
    const createdBankAccount = await this.prismaService.bankAccount.create({
      data: bankAccount,
      select: {
        id: true,
        name: true,
        initialBalance: true,
        type: true,
        color: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    return {
      ...createdBankAccount,
      initialBalance: Number(createdBankAccount.initialBalance),
    };
  }

  async findMany(args: Prisma.BankAccountFindManyArgs['where']) {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: args,
      select: {
        id: true,
        name: true,
        initialBalance: true,
        type: true,
        color: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    return bankAccounts.map((bankAccount) => ({
      ...bankAccount,
      initialBalance: Number(bankAccount.initialBalance),
    }));
  }
}
