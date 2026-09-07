import type { Metadata } from 'next';
import { baseUrl, siteTitle } from './constants';

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function createPageMetadata({ title, description, path, publishedTime, modifiedTime }: PageMetadata): Metadata {
  const fullTitle = path === '/' ? siteTitle : `${title} - Rushil Gupta`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: new URL(path, baseUrl).href,
      siteName: 'Rushil Gupta',
      ...(publishedTime
        ? { type: 'article' as const, publishedTime, modifiedTime, authors: [baseUrl] }
        : { type: 'website' as const })
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description }
  };
}
