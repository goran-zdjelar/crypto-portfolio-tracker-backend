import { Controller, Get, Query } from '@nestjs/common';
import { CoinListingApiService } from './coin-listing-api.service';

@Controller()
export class CoinListingApiController {
  constructor(private readonly conListingService: CoinListingApiService) {}

  @Get('coin-live-data')
  async findMany(@Query('ticker') ticker: string): Promise<any> {
    const liveData = await this.conListingService.fetchLiveDataForCoins({
      tickers: [ticker],
    });

    return liveData || null;
  }
}
