import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(id: string) {
    return await this.prismaService.category.findMany({
      where: {
        userId: id,
      },
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
}
