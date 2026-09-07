import { getPostBySlug } from '@/lib/mdx';
import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og';

export const alt = 'Blog - Rushil Gupta';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = await getPostBySlug(slug, 'blogs');

  return new ImageResponse(
    <OgCard title={meta?.title ?? 'Rushil Gupta'} eyebrow="Blog" meta={[meta?.author, meta?.readTime, meta?.publishDate]} />,
    size
  );
}
