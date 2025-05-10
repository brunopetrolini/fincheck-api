import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
