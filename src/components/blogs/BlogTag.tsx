import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin']
});

const BlogTag = ({ tag }: { tag: string }) => {
  return (
    <p key={tag} className={`${robotoMono.className} text-[13px] md:text-[15px] tag-${tag} px-[10px] mt-[2px] rounded-[3px] sm:rounded-[3.5px]`}>
      {tag}
    </p>
  );
};

export default BlogTag;
