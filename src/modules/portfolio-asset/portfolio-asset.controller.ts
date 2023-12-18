import { Controller, Get } from '@nestjs/common';
import { PortfolioAssetService } from './portfolio-asset.service';

@Controller()
export class PortfolioAssetController {
  constructor(private readonly portfolioAssetService: PortfolioAssetService) {}

  @Get('portfolio-assets')
  async findMany(): Promise<string> {
    const assets = await this.portfolioAssetService.findMany();

    return JSON.stringify(assets, null, 4);
  }
}
