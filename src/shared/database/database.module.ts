import { Global, Module, Provider } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from './prisma/repositories/users.repository';

const repositories: Provider[] = [UsersRepository];

@Global()
@Module({
  providers: [PrismaService, ...repositories],
  exports: repositories,
})
export class DatabaseModule {}
