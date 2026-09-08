import { getAllPostsMeta } from '@/lib/mdx';
import { absoluteUrl, siteDescription, siteTitle } from '@/lib/constants';
import { toISODate } from '@/lib/utils';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]!);
}

function toRfc822Date(date: string): string {
  const isoDate = toISODate(date);
  return new Date(`${isoDate}T00:00:00.000Z`).toUTCString();
}

export async function GET(): Promise<Response> {
  const posts = await getAllPostsMeta('blogs');
  const feedUrl = absoluteUrl('/rss.xml');
  const items = posts
    .map(post => {
      const url = absoluteUrl(`/blogs/${post.slug}`);
      const date = post.updatedDate || post.publishDate;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRfc822Date(date)}</pubDate>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${absoluteUrl()}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
}
