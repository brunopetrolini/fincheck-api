import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: user,
    });
  }
}
