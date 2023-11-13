import { Metadata } from 'next';
import BasePage from '@/components/base/BasePage';
import { getAllPostsMeta } from '@/lib/mdx';
import ShowBlogs from '@/components/blogs/ShowBlogs';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'This is my first real attempt at blogging interesting parts of my life. Over here, you will find random blogs on topics that I like.',
  alternates: {
    canonical: `/blogs`
  }
};

export default async function BlogsPage() {
  const blogsMetaData: any = await getAllPostsMeta('blogs');

  return (
    <BasePage
      title={`Blogs`}
      description={` This is my first real attempt at blogging and recording interesting parts of my life. Over here, you will find random blogs on topics that I
        like ;). Use the search bar below to filter by title of the blogs.`}
    >
      <ShowBlogs blogsMetaData={blogsMetaData} />
    </BasePage>
  );
}
