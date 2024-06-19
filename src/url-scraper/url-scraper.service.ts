import { Injectable } from '@nestjs/common';

import { getLinkPreview } from 'link-preview-js';

function ensureHttp(url: string): string {
  if (!url.startsWith('http')) {
    return `https://${url}`;
  }

  return url;
}

@Injectable()
export class UrlScraperService {
  async scrapeUrl(url: string) {
    try {
      const metadata = await getLinkPreview(ensureHttp(url), {
        imagesPropertyType: 'og', // fetches only open-graph images
        followRedirects: 'follow',
        headers: {
          'user-agent': 'googlebot', // fetches with googlebot crawler user agent
        },
        timeout: 1000,
      });

      return metadata;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to scrape URL metadata');
    }
  }
}
