import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services';

const exportedProviders = [CategoriesService];

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ...exportedProviders],
  exports: exportedProviders,
})
export class CategoriesModule {}
