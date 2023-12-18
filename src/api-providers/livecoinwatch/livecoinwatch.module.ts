import { Module } from '@nestjs/common';
import { LiveCoinWatchService } from './livecoinwatch.service';
import { HttpModule } from '../../modules/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [LiveCoinWatchService],
  exports: [LiveCoinWatchService],
})
export class LiveCoinWatchModule {}
