import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import {
  Coin,
  CoinListingApiServiceInterface,
  FetchAllCoinsArgs,
  FetchLiveDataForCoinsArgs,
  LiveDataForCoin,
} from '../../modules/coin-listing-api/coin-listing-api.interface';
import { HttpService } from '../../modules/http/http.service';

export interface CoinFromLiveCoinWatch {
  name: string;
  code: string;
  rank: number;
  age: number;
  color: string;
  png32: string;
  png64: string;
  webp32: string;
  webp64: string;
  exchanges: number;
  markets: number;
  pairs: number;
  categories: string[];
  allTimeHighUSD: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  links: {
    website: string;
    whitepaper: string | null;
    twitter: string | null;
    reddit: string | null;
    telegram: string | null;
    discord: string | null;
    medium: string | null;
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
    linkedin: string | null;
    twitch: string | null;
    spotify: string | null;
    naver: string | null;
    wechat: string | null;
    soundcloud: string | null;
  };
}

interface LiveCoinData {
  code: string;
  rate: number;
}

interface LiveCoinWatchApiResponse<T> {
  data: T[];
}

const defaultBodyParams = {
  currency: 'USD',
  sort: 'rank',
  order: 'ascending',
  offset: 0,
  limit: 50000,
  meta: true,
};

const API_KEY = process.env.LIVECOINWATCH_API_KEY;

@Injectable()
export class LiveCoinWatchService implements CoinListingApiServiceInterface {
  constructor(private readonly httpService: HttpService) {}

  async fetchAllCoins(args: FetchAllCoinsArgs): Promise<Coin[]> {
    const response: LiveCoinWatchApiResponse<CoinFromLiveCoinWatch> =
      await this.httpService.post({
        url: 'https://api.livecoinwatch.com/coins/list',
        body: {
          ...defaultBodyParams,
          codes: args.tickers,
        },
        xApiKey: API_KEY,
      });

    return response.data.map((coin) => ({
      name: coin.name,
      ticker: coin.code,
      smallImage: coin.webp32,
    }));
  }

  async fetchLiveDataForCoins(
    args: FetchLiveDataForCoinsArgs,
  ): Promise<LiveDataForCoin[]> {
    const liveDataForCoins: LiveCoinWatchApiResponse<LiveCoinData> =
      await this.httpService.post({
        url: 'https://api.livecoinwatch.com/coins/map',
        body: {
          ...defaultBodyParams,
          codes: args.tickers,
        },
        xApiKey: API_KEY,
      });

    return liveDataForCoins.data.map((coin) => ({
      ticker: coin.code,
      price: coin.rate,
    }));
  }
}
