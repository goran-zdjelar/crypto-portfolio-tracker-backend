import { Controller, Get, Query } from '@nestjs/common';
import { CryptoCurrencyService } from './cryptocurrency.service';

@Controller()
export class CryptoCurrencyController {
  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  @Get('find-many')
  findMany(
    @Query('query') query: string,
    @Query('limit') limit: string,
  ): Promise<any> {
    return this.cryptoCurrencyService.findMany({
      query: query,
      limit: parseInt(limit),
    });
  }

  @Get('sync-with-api')
  syncWithApi(): Promise<string> {
    return this.cryptoCurrencyService.syncWithApi();
  }
}
