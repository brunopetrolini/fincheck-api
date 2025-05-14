import { Global, Module, Provider } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { BankAccountsRepository, CategoriesRepository } from './prisma/repositories';
import { UsersRepository } from './prisma/repositories/users.repository';

const repositories: Provider[] = [UsersRepository, CategoriesRepository, BankAccountsRepository];

@Global()
@Module({
  providers: [PrismaService, ...repositories],
  exports: repositories,
})
export class DatabaseModule {}
