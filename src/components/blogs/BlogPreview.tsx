import Link from 'next/link';
import BlogTag from '@/components/blogs/BlogTag';

const BlogPreview = ({ data }: { data: any }): React.ReactNode => {
  return (
    <div className={`flex flex-col justify-between py-2 lg:py-4 text-left h-full w-full`}>
      <Link href={`blogs/${data.slug}`} className={'w-full'}>
        <div
          className={`flex flex-col lg:flex-row items-left lg:items-center justify-between link-underline link-underline-blue pb-2 mb-0 lg:hover:mb-1 text-xl md:text-2xl lg:text-2xl 4xl:text-4xl hover:scale-[1.01] transition-all !duration-300`}
        >
          <h2 className={`h-max duration-200 text-slate-200 font-bold leading-tight`}>{data.title}</h2>

          <div className={`flex gap-2 items-center my-[2px] lg:my-0`}>
            {data.tags.map((tag: string) => (
              <BlogTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </Link>
      <p className={`line-clamp-4 md:line-clamp-3 lg:line-clamp-2 text-slate-300 text-base md:text-lg 3xl:text-xl font-[325]`}>{data.description}</p>
    </div>
  );
};

export default BlogPreview;
