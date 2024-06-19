import { Module } from '@nestjs/common';

import { UrlScraperController } from './url-scraper.controller';
import { UrlScraperService } from './url-scraper.service';

@Module({
  controllers: [UrlScraperController],
  providers: [UrlScraperService],
})
export class UrlScraperModule {}
