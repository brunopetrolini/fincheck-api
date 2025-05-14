import { Injectable } from '@nestjs/common';

import { BankAccountsRepository } from '@/shared/database/prisma/repositories';

import { BankAccountDto } from './dto/bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepository: BankAccountsRepository) {}

  async create(userId: string, bankAccountDto: BankAccountDto) {
    const { name, initialBalance, type, color } = bankAccountDto;

    const createdBankAccount = await this.bankAccountsRepository.save({
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

    return {
      ...createdBankAccount,
      initialBalance: Number(createdBankAccount.initialBalance),
    };
  }

  findAll() {
    return `This action returns all bankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, bankAccountDto: BankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
