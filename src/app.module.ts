import { Module } from '@nestjs/common';
import { PortfolioTransactionModule } from './modules/portfolio-transaction/portfolio-transaction.module';
import { CryptoCurrencyModule } from './modules/cryptocurrency/cryptocurrency.module';
import { LiveCoinWatchModule } from './api-providers/livecoinwatch/livecoinwatch.module';
import { PortfolioAssetModule } from './modules/portfolio-asset/portfolio-asset.module';

@Module({
  imports: [
    LiveCoinWatchModule,
    CryptoCurrencyModule,
    PortfolioTransactionModule,
    PortfolioAssetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
