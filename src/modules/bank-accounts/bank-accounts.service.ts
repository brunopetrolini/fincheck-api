import { Injectable } from '@nestjs/common';

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

  update(id: number, bankAccountDto: BankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
