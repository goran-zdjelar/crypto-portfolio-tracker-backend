import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PortfolioTransactionService } from './portfolio-transaction.service';
import { CoinListingApiService } from '../coin-listing-api/coin-listing-api.service';

interface CreateOneArgs {
  readonly ticker: string;
  readonly price: number;
  readonly amount: number;
}

@Controller('transactions')
export class PortfolioTransactionController {
  constructor(
    private readonly portfolioTransactionService: PortfolioTransactionService,
    private readonly coinListingApiService: CoinListingApiService,
  ) {}

  @Get('find-many')
  async findMany(
    @Query('ticker') ticker: string,
    @Query('limit') limit: string,
  ): Promise<string> {
    const result = await this.portfolioTransactionService.findMany({
      ticker,
      limit,
    });

    const tickers = result.map((coin) => coin.ticker);

    const liveDataForCoins =
      await this.coinListingApiService.fetchLiveDataForCoins({ tickers });

    const reduced = result.reduce(
      (acc, item) =>
        acc[item.symbol]
          ? {
              ...acc,
              [item.symbol]: acc[item.symbol] + item.price,
            }
          : { ...acc, [item.symbol]: item.price },
      {},
    );

    console.log('r', reduced);

    // const m = result.map((transaction) => {
    //   console.log(transaction);
    //   return {
    //     ...transaction,
    //   };
    // });

    return JSON.stringify(liveDataForCoins);
  }

  @Post('create-one')
  createOne(@Body() args: CreateOneArgs): Promise<boolean> {
    return this.portfolioTransactionService.createOne(args);
  }
}
