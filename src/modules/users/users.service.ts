import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { UsersRepository } from '@/shared/database/prisma/repositories';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const saltRounds = 12;
    const hashedPassword = await hash(password, saltRounds);

    return this.usersRepository.save({ name, email, password: hashedPassword });
  }
}
