import { Module } from '@nestjs/common';
import { CryptoCurrencyController } from './cryptocurrency.controller';
import { CryptoCurrencyService } from './cryptocurrency.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CoinListingApiModule } from '../coin-listing-api/coin-listing-api.module';

@Module({
  imports: [CoinListingApiModule, PrismaModule],
  controllers: [CryptoCurrencyController],
  providers: [CryptoCurrencyService],
  exports: [CryptoCurrencyService],
})
export class CryptoCurrencyModule {}
