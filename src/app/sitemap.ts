import { toISODate } from '@/lib/utils';
import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/constants';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blogs
  const blogs = await getAllPostsMeta('blogs');
  const blogsUrls =
    blogs?.map(post => ({
      url: absoluteUrl(`/blogs/${post.slug}`),
      lastModified: toISODate(post.updatedDate || post.publishDate)
    })) ?? [];

  return [
    {
      url: absoluteUrl()
    },
    {
      url: absoluteUrl('/blogs')
    },
    {
      url: absoluteUrl('/publications')
    },
    {
      url: absoluteUrl('/teaching')
    },
    {
      url: absoluteUrl('/resume.pdf')
    },
    ...blogsUrls
  ];
}
