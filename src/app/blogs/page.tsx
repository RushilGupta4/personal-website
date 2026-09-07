import { createPageMetadata } from '@/lib/metadata';
import BasePage from '@/components/base/BasePage';
import { getAllPostsMeta } from '@/lib/mdx';
import ShowBlogs from '@/components/blogs/ShowBlogs';

export const metadata = createPageMetadata({
  title: 'Blogs',
  description: 'This is my first real attempt at blogging interesting parts of my life. Over here, you will find random blogs on topics that I like.',
  path: '/blogs'
});

export default async function BlogsPage() {
  const blogsMetaData: any = await getAllPostsMeta('blogs');

  return (
    <BasePage
      title={`Blogs`}
      description={` This is my first real attempt at blogging and recording interesting parts of my life. Over here, you will find random blogs on topics that I like ;)`}
    >
      <ShowBlogs blogsMetaData={blogsMetaData} />
    </BasePage>
  );
}
