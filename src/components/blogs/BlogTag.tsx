import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin']
});

const BlogTag = ({ tag }: { tag: string }) => {
  return (
    <span key={tag} className={`${robotoMono.className} inline-flex items-center !my-0 text-xs leading-5 text-text-secondary bg-neutral-main/10 border border-neutral-main/15 px-2 py-0.5 rounded`}>
      {tag}
    </span>
  );
};

export default BlogTag;
