import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoriesRepository } from '@/shared/database/prisma/repositories';

@Injectable()
export class CategoryOwnershipService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const existingCategory = await this.categoriesRepository.findUnique(categoryId);
    if (existingCategory?.userId !== userId) throw new NotFoundException('Bank account not found.');
  }
}
