import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(args: Prisma.CategoryFindManyArgs['where']) {
    const categories = await this.prismaService.category.findMany({
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

    if (!categories) return [];

    return categories;
  }
}
