import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from '@/shared/database/prisma/repositories';

import { BankAccountDto } from './dto/bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepository: BankAccountsRepository) {}

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

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({ userId });
  }

  async update(userId: string, bankAccountId: string, bankAccountDto: BankAccountDto) {
    const { name, initialBalance, type, color } = bankAccountDto;

    await this.validateBankAccountOwnership(userId, bankAccountId);

    return this.bankAccountsRepository.update(bankAccountId, {
      name,
      initialBalance,
      type,
      color,
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId);
    await this.bankAccountsRepository.delete(bankAccountId);
  }

  private async validateBankAccountOwnership(userId: string, bankAccountId: string) {
    const existingBankAccount = await this.bankAccountsRepository.findUnique(bankAccountId);
    if (existingBankAccount?.user.id !== userId) throw new NotFoundException('Bank account not found.');
  }
}
