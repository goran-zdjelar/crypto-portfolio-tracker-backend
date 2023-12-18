import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CoinListingApiService } from '../coin-listing-api/coin-listing-api.service';

interface FindManyArgs {
  readonly ticker?: string;
  readonly limit?: string;
}

interface CreateOneArgs {
  readonly ticker: string;
  readonly price: number;
  readonly amount: number;
}

@Injectable()
export class PortfolioTransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coinListingApiService: CoinListingApiService,
  ) {}

  async findMany({ ticker, limit }: FindManyArgs): Promise<any> {
    const result = await this.prisma.portfolioTransaction.findMany({
      where: ticker ? { ticker: { equals: ticker } } : {},
      take: limit ? Number(limit) : undefined,
    });

    return result;
  }

  async createOne(args: CreateOneArgs): Promise<boolean> {
    let price = args.price;

    if (!price) {
      const liveCoinData =
        await this.coinListingApiService.fetchLiveDataForCoins({
          tickers: [args.ticker],
        });

      price = liveCoinData[0].price;
    }

    const result = await this.prisma.portfolioTransaction.create({
      data: { ...args, price },
    });

    if (!result) {
      return false;
    }

    return true;
  }
}
