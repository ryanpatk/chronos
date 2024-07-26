import { Injectable } from '@nestjs/common';
import { getLinkPreview } from 'link-preview-js';
import urlMetadata = require('url-metadata');
import { LinkPreviewResult } from './url-scraper.types';

function ensureHttp(url: string): string {
  if (!url.startsWith('http')) {
    return `https://${url}`;
  }
  return url;
}

@Injectable()
export class UrlScraperService {
  private userAgents = [
    'googlebot',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  ];

  async scrapeUrl(url: string): Promise<LinkPreviewResult> {
    const secureUrl = ensureHttp(url);

    let resultWithFavicons: LinkPreviewResult | null = null;

    try {
      for (const userAgent of this.userAgents) {
        const result = await this.tryLinkPreview(secureUrl, userAgent);

        if (this.resultHasImages(result)) {
          return result;
        }

        if (this.resultHasFavicons(result) && !Boolean(resultWithFavicons)) {
          resultWithFavicons = result;
        }
      }

      // If link-preview-js didn't find images, try url-metadata
      const fallbackResult = await this.tryUrlMetadata(secureUrl);

      if (this.resultHasImages(fallbackResult)) {
        return fallbackResult;
      }

      if (
        this.resultHasFavicons(fallbackResult) &&
        !Boolean(resultWithFavicons)
      ) {
        resultWithFavicons = fallbackResult;
      }

      // only resort to result with favicons after all image results fail
      if (Boolean(resultWithFavicons)) {
        return resultWithFavicons;
      }
    } catch (error) {
      console.error(`Scraping ${secureUrl} failed:`, error.message);
    }

    throw new Error('Failed to scrape URL metadata with all methods');
  }

  private async tryLinkPreview(
    url: string,
    userAgent: string,
  ): Promise<LinkPreviewResult> {
    const metadata = await getLinkPreview(url, {
      imagesPropertyType: 'og',
      followRedirects: 'follow',
      headers: {
        'user-agent': userAgent,
      },
      timeout: 5000,
    });

    return metadata as LinkPreviewResult;
  }

  private async tryUrlMetadata(url: string): Promise<LinkPreviewResult> {
    const fallbackMetadata = await urlMetadata(url, {
      timeout: 5000,
    });

    return {
      url: fallbackMetadata.url || url,
      title: fallbackMetadata.title || '',
      siteName: fallbackMetadata.source,
      description: fallbackMetadata.description,
      mediaType: 'website',
      contentType: fallbackMetadata['content-type'],
      images: fallbackMetadata.image ? [fallbackMetadata.image] : [],
      videos: [],
      favicons: fallbackMetadata.favicon ? [fallbackMetadata.favicon] : [],
    };
  }

  private resultHasImages(result: LinkPreviewResult): boolean {
    return Boolean(result.images.length > 0);
  }

  private resultHasFavicons(result: LinkPreviewResult): boolean {
    return Boolean(result.favicons.length > 0);
  }
}
