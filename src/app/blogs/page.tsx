import { getAllPostsMeta } from '@/lib/mdx';
import ShowBlogs from './ShowBlogs';

const BlogsPage = async () => {
  const blogsMetaData: any = await getAllPostsMeta('blogs');

  return (
    <div id="blogs" className={``}>
      <p
        className={`base-heading underline decoration-3 md:decoration-4 underline-offset-[6px] sm:underline-offset-[8px] text-[40px] sm:text-[54px] md:text-[60px] lg:text-[64px]`}
      >
        Blogs
      </p>
      <p className={`mx-auto text-slate-500 font-[450] sm:font-normal text-[16px] md:text-[18px] lg:text-[20px]`}>
        This is my first real attempt at blogging and recording interesting parts of my life. Over here, you will find random blogs on topics that I
        like &#x3B;&#41;. Use the search bar below to filter by title of the blogs.
      </p>

      <ShowBlogs blogsMetaData={blogsMetaData} />
    </div>
  );
};

export default BlogsPage;
