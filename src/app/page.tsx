import Image from 'next/image';
import { getPostBySlug } from '@/lib/mdx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Rushil Gupta',
  description: 'See a personal side of me, not to be found anywhere else!'
};

const getAboutMe = async () => {
  const { meta, content } = await getPostBySlug('about-me', '');
  return { meta, content };
};

export default async function Home() {
  const { content } = await getAboutMe();

  return (
    <div className={`flex-none lg:flex`}>
      {/* Profile Pic */}
      <div
        className={`mx-auto w-[60%] min-[540px]:w-[55%] sm:w-[45%] min-[700px]:w-[42%] md:w-[38%] min-[920px]:w-[35%] lg:w-[30%] min-[1120px]:w-[27.5%]`}
      >
        <Image
          src="/img/profile_pic.jpeg"
          sizes="100vw"
          width={0}
          height={0}
          style={{
            width: '100%',
            height: 'auto'
          }}
          alt="Picture of me"
          className={`mx-auto border-[6px] sm:border-8 border-slate-300 rounded-full`}
        />
      </div>

      {/* About Me */}
      <div className={`mx-auto my-0 lg:my-auto w-full lg:w-[70%] pt-2 lg:pt-0 pb-0 lg:pb-24 pl-0 lg:pl-8`}>
        <p
          className={`base-heading underline decoration-[2px] sm:decoration-[3px] underline-offset-[8px] sm:underline-offset-[12px] text-4xl sm:text-p[40px] md:text-5xl lg:text-6xl`}
        >
          Hi, I&apos;m Rushil
        </p>
        <div className={`pt-3 sm:pt-4 md:pt-5 lg:pt-8 font-light lg:font-[225] text-center lg:text-left px-1 lg:px-8`}>
          <article className="prose prose-base md:prose-lg lg:prose-xl min-[1120px]:prose-p:text-[22px] prose-slate">{content}</article>
        </div>
      </div>
    </div>
  );
}
