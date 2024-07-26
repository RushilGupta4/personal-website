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
    <section className={`flex flex-col pt-2 md:pt-4 lg:pt-8 xl:pt-10 2xl:pt-14`}>
      <SchemaData data={jsonLd} />
      {/* Profile Pic */}
      <div className={`mx-auto max-w-[30ch] md:max-w-[35ch] 3xl:max-w-[45ch] 4xl:max-w-[60ch]`}>
        <Image
          src={profilePic}
          width={1024}
          height={1024}
          alt="Picture of me"
          className={`mx-auto border-4 sm:border-6 border-slate-100 rounded-full`}
          placeholder="blur"
          priority
        />
      </div>

      {/* About Me */}
      <div className={`mx-auto my-0 lg:my-auto w-full pt-4 md:pt-6 2xl:pt-8`}>
        <h1 className={`base-heading decoration-1 sm:decoration-2 underline-offset-2 sm:underline-offset-8 text-4xl 3xl:text-4xl 4xl:text-5xl`}>
          Hi, I&apos;m Rushil
        </h1>
        <div className={`pt-2 2xl:pt-6 font-light text-center lg:text-left px-2 md:px-4 lg:px-8 2xl:px-12 4xl:px-12 mx-auto`}>
          <article className="prose prose-invert prose-base md:prose-md lg:prose-lg 2xl:prose-2xl prose-slate prose-a:no-underline prose-p:text-center mx-auto">
            {content}
          </article>
        </div>
      </div>
    </section>
  );
}
