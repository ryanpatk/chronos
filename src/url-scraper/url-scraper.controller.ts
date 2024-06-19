import { Controller, Get, Query } from '@nestjs/common';

import { UrlScraperService } from './url-scraper.service';

@Controller('url-scraper')
export class UrlScraperController {
  constructor(private readonly urlScraperService: UrlScraperService) {}

  @Get()
  async scrapeUrl(@Query('url') url: string) {
    const decodedUrl = decodeURIComponent(url);
    return this.urlScraperService.scrapeUrl(decodedUrl);
  }
}
