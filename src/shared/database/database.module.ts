import { Global, Module, Provider } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import {
  BankAccountsRepository,
  CategoriesRepository,
  TransactionsRepository,
  UsersRepository,
} from './prisma/repositories';

const exportedProviders: Provider[] = [
  UsersRepository,
  CategoriesRepository,
  BankAccountsRepository,
  TransactionsRepository,
];

@Global()
@Module({
  providers: [PrismaService, ...exportedProviders],
  exports: exportedProviders,
})
export class DatabaseModule {}
