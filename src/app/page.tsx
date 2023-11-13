import Image from 'next/image';
import { getPostBySlug } from '@/lib/mdx';
import profilePic from '@/../public/img/profile_pic.webp';
import SchemaData from '@/components/SchemaData';
import { linkedInUrl } from '@/lib/constants';

export default async function Home() {
  const { content } = await getPostBySlug('about-me', '');

  const jsonLd = {
    '@type': 'Person',
    name: 'Rushil Gupta',
    jobTitle: 'Student Developer',
    sameAs: [linkedInUrl],
    email: 'rushilgupta4@gmail.com',
    affiliation: {
      '@type': 'Organization',
      name: 'Ashoka University',
      url: 'https://www.ashoka.edu.in/'
    }
  };

  return (
    <section className={`flex-none lg:flex pt-2 lg:pt-8`}>
      <SchemaData data={jsonLd} />
      {/* Profile Pic */}
      <div
        className={`mx-auto w-[60%] min-[540px]:w-[55%] sm:w-[45%] min-[700px]:w-[42%] md:w-[38%] min-[920px]:w-[35%] lg:w-[30%] min-[1120px]:w-[27.5%]`}
      >
        <Image
          src={profilePic}
          width={512}
          height={512}
          alt="Picture of me"
          className={`mx-auto border-[6px] sm:border-8 border-slate-300 rounded-full`}
          placeholder="blur"
          priority
        />
      </div>

      {/* About Me */}
      <div className={`mx-auto my-0 lg:my-auto w-full lg:w-[70%] min-[1600px]:w-[80%] pt-2 lg:pt-4 pb-0 lg:pb-24 pl-0 lg:pl-8`}>
        <h1
          className={`base-heading underline decoration-[2px] sm:decoration-[3px] underline-offset-[8px] sm:underline-offset-[12px] text-4xl sm:text-p[40px] md:text-5xl lg:text-6xl`}
        >
          Hi, I&apos;m Rushil
        </h1>
        <div className={`pt-3 sm:pt-4 md:pt-5 lg:pt-8 font-light lg:font-[225] text-center lg:text-left px-1 lg:px-8`}>
          <article className="about-me prose prose-base md:prose-lg lg:prose-xl min-[1120px]:prose-p:text-[22px] prose-slate prose-a:no-underline">
            {content}
          </article>
        </div>
      </div>
    </section>
  );
}
