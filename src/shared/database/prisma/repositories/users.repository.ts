import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: Prisma.UserCreateInput) {
    try {
      return await this.prismaService.user.create({
        data: user,
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: false,
          updatedAt: false,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`A user with this email already exists.`);
        }
      }
      throw error;
    }
  }
}
