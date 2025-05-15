import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(args: Prisma.CategoryFindManyArgs['where']) {
    return await this.prismaService.category.findMany({
      where: args,
      select: {
        id: true,
        name: true,
        userId: false,
        icon: true,
        createdAt: false,
        updatedAt: false,
      },
    });
  }

  async findUnique(id: string) {
    return await this.prismaService.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        userId: true,
        icon: true,
        createdAt: false,
        updatedAt: false,
      },
    });
  }
}
