import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CategoriesService, CategoryOwnershipService } from './services';

const exportedProviders = [CategoryOwnershipService];

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ...exportedProviders],
  exports: exportedProviders,
})
export class CategoriesModule {}
