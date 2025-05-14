import { Injectable } from '@nestjs/common';
import type { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(bankAccount: Prisma.BankAccountCreateInput) {
    return await this.prismaService.bankAccount.create({
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
  }
}
