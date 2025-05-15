import { Injectable } from '@nestjs/common';

import { CategoriesRepository } from '@/shared/database/prisma/repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getAllByUser(userId: string) {
    return this.categoriesRepository.findMany({ userId });
  }
}
