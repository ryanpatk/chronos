export interface LinkPreviewResult {
  url: string;
  title: string;
  siteName: string | undefined;
  description: string | undefined;
  mediaType: string;
  contentType: string | undefined;
  images: string[];
  videos: {
    url: string;
    secureUrl: string | null;
    type: string | null;
    width: string;
    height: string;
  }[];
  favicons: string[];
}
