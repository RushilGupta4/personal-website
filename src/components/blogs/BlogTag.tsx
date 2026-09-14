import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin']
});

const coloredTags = new Set(['life', 'internship', 'university', 'developer']);

const BlogTag = ({ tag }: { tag: string }) => {
  const colors = coloredTags.has(tag)
    ? `tag-${tag} border-transparent`
    : 'text-text-secondary bg-neutral-main/10 border-neutral-main/15';

  return (
    <span key={tag} className={`${robotoMono.className} ${colors} inline-flex items-center !my-0 text-xs leading-5 border px-2 py-0.5 rounded`}>
      {tag}
    </span>
  );
};

export default BlogTag;
