import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from '@/shared/database/prisma/repositories';

@Injectable()
export class BankAccountOwnershipService {
  constructor(private readonly bankAccountsRepository: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const existingBankAccount = await this.bankAccountsRepository.findUnique(bankAccountId);
    if (existingBankAccount?.user.id !== userId) throw new NotFoundException('Bank account not found.');
  }
}
