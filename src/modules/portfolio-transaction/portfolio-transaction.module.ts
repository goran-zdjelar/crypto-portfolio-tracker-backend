import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PortfolioTransactionService } from './portfolio-transaction.service';
import { PortfolioTransactionController } from './portfolio-transaction.controller';
import { CoinListingApiModule } from '../coin-listing-api/coin-listing-api.module';

@Module({
  imports: [PrismaModule, CoinListingApiModule],
  controllers: [PortfolioTransactionController],
  providers: [PortfolioTransactionService],
  exports: [PortfolioTransactionService],
})
export class PortfolioTransactionModule {}
