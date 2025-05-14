import { Module, type Provider } from '@nestjs/common';

import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountOwnershipService, BankAccountsService } from './services';

const exportedProviders: Provider[] = [BankAccountOwnershipService];

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ...exportedProviders],
  exports: exportedProviders,
})
export class BankAccountsModule {}
