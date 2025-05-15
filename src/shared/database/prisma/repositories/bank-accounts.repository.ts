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

  async findUnique(id: string) {
    const bankAccount = await this.prismaService.bankAccount.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        initialBalance: true,
        type: true,
        color: true,
        createdAt: false,
        updatedAt: false,
        userId: true,
      },
    });

    if (!bankAccount) return null;

    return {
      ...bankAccount,
      initialBalance: Number(bankAccount.initialBalance),
    };
  }

  async update(id: string, bankAccount: Prisma.BankAccountUpdateInput) {
    const updatedBankAccount = await this.prismaService.bankAccount.update({
      where: { id },
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
      ...updatedBankAccount,
      initialBalance: Number(updatedBankAccount.initialBalance),
    };
  }

  async delete(id: string) {
    await this.prismaService.bankAccount.delete({
      where: { id },
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
  }
}
