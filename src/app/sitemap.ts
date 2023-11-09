import { baseUrl } from '@/lib/constants';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function sitemap() {
  // Get all posts
  const posts = await getAllPostsMeta('blogs');
  const postUrls =
    posts?.map(post => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date()
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/blogs`,
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
    ...postUrls
  ];
}
