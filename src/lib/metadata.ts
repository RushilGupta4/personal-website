import type { Metadata } from 'next';
import { absoluteUrl, siteTitle } from './constants';

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
    alternates: {
      canonical: path,
      types: { 'application/rss+xml': absoluteUrl('/rss.xml') }
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: 'Rushil Gupta',
      ...(publishedTime
        ? { type: 'article' as const, publishedTime, modifiedTime, authors: [absoluteUrl()] }
        : { type: 'website' as const })
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description }
  };
}
