import Image from 'next/image';
import moment from 'moment';
import BlogTag from '@/components/blogs/BlogTag';
import profilePic from '@/../public/img/profile_pic.webp';

const BlogInfo = async ({ frontmatter }: { frontmatter: any }) => {
  const pClassName = '!my-0 leading-tight';

  const blogDate = moment(frontmatter.publishDate, 'MMMM DD, YYYY');
  const blogDateString = blogDate.format('DD MMM YYYY');

  return (
    <div>
      <h1 className={`!my-0 pb-1 md:pb-[6px] border-b-2 border-slate-700`}>{frontmatter.title}</h1>

      <div className={`flex flex-col md:flex-row h-max mt-6 md:mt-2`}>
        {/* Author Info */}
        <div className={`flex`}>
          <div className={`my-auto h-max w-1/5 min-[480px]:w-[18%] min-[540px]:w-[16%] sm:w-[14%] md:w-[12%] lg:w-[11%]`}>
            <Image src={profilePic} width={512} height={512} className={`rounded-full !my-0 !py-0`} alt={frontmatter.author} />
          </div>
          <div className={`my-auto w-full pl-2 sm:pl-3 md:pl-4`}>
            <p className={`${pClassName} text-[1em] text-slate-800 font-medium`}>{frontmatter.author}</p>
            <p className={`${pClassName} text-[.9em] text-slate-500 font-light`}>{`${blogDateString} • ${frontmatter.readTime}`}</p>
          </div>
        </div>

        {/* Tag Info */}
        <div className="flex gap-2 mt-2 md:mt-0">
          {frontmatter.tags.map((tag: string) => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;
