import { Controller, Get, Query } from '@nestjs/common';

import { UrlScraperService } from './url-scraper.service';
import { LinkPreviewResult } from './url-scraper.types';

@Controller('url-scraper')
export class UrlScraperController {
  constructor(private readonly urlScraperService: UrlScraperService) {}

  @Get()
  async scrapeUrl(@Query('url') url: string): Promise<LinkPreviewResult> {
    return this.urlScraperService.scrapeUrl(url);
  }
}
