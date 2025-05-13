import { Controller, Get } from '@nestjs/common';

import { ActiveUserId } from '@/shared/decorators';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(@ActiveUserId() userId: string) {
    return this.categoriesService.getAllByUser(userId);
  }
}
