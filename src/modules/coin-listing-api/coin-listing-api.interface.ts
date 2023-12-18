export interface Coin {
  name: string;
  ticker: string;
  smallImage?: string;
  largeImage?: string;
}

export interface LiveDataForCoin {
  ticker: string;
  price: number;
}

export interface FetchLiveDataForCoinsArgs {
  tickers: string[];
}

export interface FetchAllCoinsArgs {
  tickers?: string[];
}

export interface CreatePortfolioTransactionArgs {
  ticker: string;
  price: number;
  amount: number;
}

export interface CoinListingApiServiceInterface {
  fetchAllCoins(args: FetchAllCoinsArgs): Promise<Coin[]>;
  fetchLiveDataForCoins(
    args: FetchLiveDataForCoinsArgs,
  ): Promise<LiveDataForCoin[]>;
}
