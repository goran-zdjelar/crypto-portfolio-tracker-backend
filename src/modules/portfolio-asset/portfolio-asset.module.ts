import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PortfolioTransactionModule } from '../portfolio-transaction/portfolio-transaction.module';
import { PortfolioAssetController } from './portfolio-asset.controller';
import { PortfolioAssetService } from './portfolio-asset.service';
import { CoinListingApiModule } from '../coin-listing-api/coin-listing-api.module';
import { CryptoCurrencyModule } from '../cryptocurrency/cryptocurrency.module';

@Module({
  imports: [
    PrismaModule,
    PortfolioTransactionModule,
    CoinListingApiModule,
    CryptoCurrencyModule,
  ],
  controllers: [PortfolioAssetController],
  providers: [PortfolioAssetService],
})
export class PortfolioAssetModule {}
