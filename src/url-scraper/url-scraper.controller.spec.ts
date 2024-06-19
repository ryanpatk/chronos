import { Test, TestingModule } from '@nestjs/testing';
import { UrlScraperController } from './url-scraper.controller';

describe('UrlScraperController', () => {
  let controller: UrlScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlScraperController],
    }).compile();

    controller = module.get<UrlScraperController>(UrlScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
