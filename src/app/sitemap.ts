import { toISODate } from '@/lib/utils';
import type { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/constants';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blogs
  const blogs = await getAllPostsMeta('blogs');
  const blogsUrls =
    blogs?.map(post => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: toISODate(post.updatedDate || post.publishDate),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    })) ?? [];

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/blogs`,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/publications`,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/teaching`,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/resume.pdf`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...blogsUrls
  ];
}
