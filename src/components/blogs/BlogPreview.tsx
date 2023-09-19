import Link from 'next/link';
import BlogTag from '@/components/blogs/BlogTag';

interface blogMeta {
  title: string;
  description: string;
  slug: string;
  tags: string[];
}

const BlogPreview = ({ data }: { data: blogMeta }): React.ReactNode => {
  return (
    <div className={`flex flex-col justify-between py-2 lg:py-4 text-left h-full w-full`}>
      <Link href={`blogs/${data.slug}`} className={'w-full'}>
        <div
          className={`flex flex-col lg:flex-row items-left lg:items-center justify-between link-underline link-underline-blue pb-[3px] mb-0 lg:hover:mb-[2px] text-[21px] md:text-[23px] lg:text-[25px] lg:hover:text-[26px]`}
        >
          <p className={`h-max duration-200 text-slate-800 font-bold leading-tight`}>{data.title}</p>

          <div className={`flex gap-2 items-center my-[2px] lg:my-0`}>
            {data.tags.map(tag => (
              <BlogTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </Link>
      <p className={`text-slate-500 text-[16px] md:text-[18px] font-normal pt-[2px]`}>{data.description}</p>
    </div>
  );
};

export default BlogPreview;
