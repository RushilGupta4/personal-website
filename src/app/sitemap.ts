import { baseUrl } from '@/lib/constants';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function sitemap() {
  // Get all blogs
  const blogs = await getAllPostsMeta('blogs');
  const blogsUrls =
    blogs?.map(post => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date()
    })) ?? [];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified: new Date()
    },
    ...blogsUrls
  ];
}
