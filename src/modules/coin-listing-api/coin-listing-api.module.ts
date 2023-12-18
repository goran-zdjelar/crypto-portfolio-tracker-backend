import { Module } from '@nestjs/common';
import { LiveCoinWatchModule } from '../../api-providers/livecoinwatch/livecoinwatch.module';
import { CoinListingApiService } from './coin-listing-api.service';
import { CoinListingApiController } from './coin-listing-api.controller';

@Module({
  imports: [LiveCoinWatchModule],
  providers: [CoinListingApiService],
  controllers: [CoinListingApiController],
  exports: [CoinListingApiService],
})
export class CoinListingApiModule {}
