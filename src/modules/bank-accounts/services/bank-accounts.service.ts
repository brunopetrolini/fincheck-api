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

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({ userId });
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
