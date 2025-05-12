import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { DatabaseModule } from './shared/database';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
})
export class AppModule {}
