import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@/shared/database/prisma/repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
}
