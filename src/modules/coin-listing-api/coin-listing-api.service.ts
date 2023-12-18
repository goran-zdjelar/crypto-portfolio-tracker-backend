import { Injectable } from '@nestjs/common';
import { LiveCoinWatchService } from '../../api-providers/livecoinwatch/livecoinwatch.service';
import {
  Coin,
  FetchAllCoinsArgs,
  FetchLiveDataForCoinsArgs,
  LiveDataForCoin,
} from './coin-listing-api.interface';

@Injectable()
export class CoinListingApiService {
  constructor(private readonly liveCoinWatchService: LiveCoinWatchService) {}

  fetchCoinList(args: FetchAllCoinsArgs): Promise<Coin[]> {
    return this.liveCoinWatchService.fetchAllCoins(args);
  }

  fetchLiveDataForCoins(
    args: FetchLiveDataForCoinsArgs,
  ): Promise<LiveDataForCoin[]> {
    return this.liveCoinWatchService.fetchLiveDataForCoins(args);
  }
}
