import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@/shared/database/prisma/repositories/users.repository';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    return await this.usersRepository.save({ name, email, password });
  }
}
