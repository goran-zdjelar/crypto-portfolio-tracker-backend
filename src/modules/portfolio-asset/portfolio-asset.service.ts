import { Injectable } from '@nestjs/common';
import { PortfolioTransactionService } from '../portfolio-transaction/portfolio-transaction.service';
import { CoinListingApiService } from '../coin-listing-api/coin-listing-api.service';
import { CryptoCurrencyService } from '../cryptocurrency/cryptocurrency.service';
import { Coin } from '../coin-listing-api/coin-listing-api.interface';

@Injectable()
export class PortfolioAssetService {
  constructor(
    private readonly cryptoCurrencyService: CryptoCurrencyService,
    private readonly portfolioTransactionService: PortfolioTransactionService,
    private readonly coinListingApiService: CoinListingApiService,
  ) {}

  async findMany(): Promise<any> {
    const transactions = await this.portfolioTransactionService.findMany({});

    const portfolioAssetCodes =
      this.getAssetCodesFromTransactions(transactions);

    const coins = await this.cryptoCurrencyService.findMany({
      tickers: portfolioAssetCodes,
    });

    const liveDataForAssets =
      await this.coinListingApiService.fetchLiveDataForCoins({
        tickers: portfolioAssetCodes,
      });

    return coins.map((coin) =>
      this.buildAsset(coin, transactions, liveDataForAssets),
    );
  }

  private calculateAveragePrice(assetTransactions) {
    return (
      assetTransactions.reduce(
        (totalAssetTransactions, transaction) =>
          totalAssetTransactions + transaction.price,
        0,
      ) / assetTransactions.length
    );
  }

  private calculateProfit({ assetTransactions, liveData }) {
    const averagePrice = this.calculateAveragePrice(assetTransactions);
    const totalAssetUnits = this.calculateTotalAssetUnits(assetTransactions);

    const profitAmount =
      liveData.price * totalAssetUnits - averagePrice * totalAssetUnits;
    const profitPercentage = `${Number(
      ((liveData.price - averagePrice) / averagePrice) * 100,
    ).toFixed(2)}%`;

    return {
      profitAmount,
      profitPercentage,
    };
  }

  private calculateTotalAssetUnits(assetTransactions) {
    return assetTransactions.reduce((units, asset) => units + asset.amount, 0);
  }

  private calculateTotalInvested(assetTransactions) {
    const totalAssetUnits = this.calculateTotalAssetUnits(assetTransactions);
    const averagePrice = this.calculateAveragePrice(assetTransactions);

    return totalAssetUnits * averagePrice;
  }

  private getAssetCodesFromTransactions(transactions) {
    return transactions.reduce(
      (assets, transaction) =>
        assets.includes(transaction.ticker)
          ? assets
          : [...assets, transaction.ticker],
      [],
    );
  }

  private buildAsset(coin: Coin, transactions, liveDataForAssets) {
    const assetTransactions = transactions.filter(
      (transaction) => coin.ticker === transaction.ticker,
    );

    const averagePrice = this.calculateAveragePrice(assetTransactions);
    const totalInvested = this.calculateTotalInvested(assetTransactions);
    const totalAssetUnits = this.calculateTotalAssetUnits(assetTransactions);

    const profit = this.calculateProfit({
      assetTransactions,
      liveData: liveDataForAssets.find(
        (liveData) => liveData.ticker === coin.ticker,
      ),
    });

    return {
      ...coin,
      amount: totalAssetUnits,
      averagePrice,
      profit,
      totalInvested: totalInvested.toFixed(2),
      totalValue: (totalInvested + profit.profitAmount).toFixed(2),
    };
  }
}
