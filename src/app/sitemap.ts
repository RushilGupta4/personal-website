import type { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/constants';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blogs
  const blogs = await getAllPostsMeta('blogs');
  const blogsUrls =
    blogs?.map(post => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.updatedDate || post.publishDate || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    })) ?? [];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/teaching`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...blogsUrls
  ];
}
