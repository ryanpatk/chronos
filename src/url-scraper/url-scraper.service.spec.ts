import { Test, TestingModule } from '@nestjs/testing';
import { UrlScraperService } from './url-scraper.service';

describe('UrlScraperService', () => {
  let service: UrlScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlScraperService],
    }).compile();

    service = module.get<UrlScraperService>(UrlScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
