import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CoinListingApiService } from '../coin-listing-api/coin-listing-api.service';
import { Coin } from '../coin-listing-api/coin-listing-api.interface';

interface FindManyArgs {
  query?: string;
  tickers?: string[];
  limit?: number;
}

@Injectable()
export class CryptoCurrencyService {
  constructor(
    private readonly coinListingApiService: CoinListingApiService,
    private readonly prisma: PrismaService,
  ) {}

  async findMany({
    tickers,
    query = '',
    limit,
  }: FindManyArgs): Promise<Coin[]> {
    const data = await this.prisma.cryptoCurrency.findMany({
      take: limit,
      where: tickers
        ? { ticker: { in: tickers } }
        : {
            OR: [
              {
                name: {
                  startsWith: query,
                  mode: 'insensitive',
                },
              },
              {
                ticker: {
                  startsWith: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
    });

    return data;
  }

  async syncWithApi(): Promise<string> {
    const data = await this.coinListingApiService.fetchCoinList({});

    await this.prisma.cryptoCurrency.deleteMany({});
    await this.prisma.cryptoCurrency.createMany({ data });

    return 'success';
  }
}
