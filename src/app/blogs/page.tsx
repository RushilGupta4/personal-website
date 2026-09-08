import { createPageMetadata } from '@/lib/metadata';
import BasePage from '@/components/base/BasePage';
import { getAllPostsMeta } from '@/lib/mdx';
import { toISODate } from '@/lib/utils';
import ShowBlogs from '@/components/blogs/ShowBlogs';
import SchemaData from '@/components/SchemaData';
import { absoluteUrl, personId, siteId, siteUrl } from '@/lib/constants';

export const metadata = createPageMetadata({
  title: 'Blogs',
  description: 'This is my first real attempt at blogging interesting parts of my life. Over here, you will find random blogs on topics that I like.',
  path: '/blogs'
});

export default async function BlogsPage() {
  const blogsMetaData: any = await getAllPostsMeta('blogs');
  const pageUrl = absoluteUrl('/blogs');
  const description = 'This is my first real attempt at blogging interesting parts of my life. Over here, you will find random blogs on topics that I like.';
  const jsonLd = {
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: 'Blogs',
        description,
        isPartOf: { '@id': siteId },
        mainEntity: { '@id': `${pageUrl}#blog` }
      },
      {
        '@type': 'Blog',
        '@id': `${pageUrl}#blog`,
        url: pageUrl,
        name: 'Blogs',
        description,
        author: { '@id': personId, name: 'Rushil Gupta', url: siteUrl },
        blogPost: blogsMetaData.map((post: any) => ({
          '@id': `${absoluteUrl(`/blogs/${post.slug}`)}#article`,
          url: absoluteUrl(`/blogs/${post.slug}`),
          headline: post.title,
          datePublished: toISODate(post.publishDate)
        }))
      }
    ]
  };

  return (
    <BasePage
      title={`Blogs`}
      description={` This is my first real attempt at blogging and recording interesting parts of my life. Over here, you will find random blogs on topics that I like ;)`}
    >
      <SchemaData data={jsonLd} />
      <ShowBlogs blogsMetaData={blogsMetaData} />
    </BasePage>
  );
}
