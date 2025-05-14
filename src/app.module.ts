import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, AuthModule } from './modules/auth';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users';
import { validateEnv } from './shared/config/environment';
import { DatabaseModule } from './shared/database';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    BankAccountsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
