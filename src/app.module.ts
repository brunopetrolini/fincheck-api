import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { validateEnv } from './shared/config/environment/config.module';
import { DatabaseModule } from './shared/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
