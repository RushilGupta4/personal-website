import { createPageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import { getPostBySlug } from '@/lib/mdx';
import landingPic from '@/../public/img/landing.webp';
import SchemaData from '@/components/SchemaData';
import { socialLinks, absoluteUrl, personId, siteId, siteTitle, siteDescription, siteUrl } from '@/lib/constants';
import Link from 'next/link';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import { MdOutlineContactPage } from 'react-icons/md';

export const metadata = createPageMetadata({ title: siteTitle, description: siteDescription, path: '/' });

export default async function Home(): Promise<React.JSX.Element> {
  const { content } = await getPostBySlug('about-me', '');

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': siteId,
    url: siteUrl,
    name: siteTitle,
    description: siteDescription,
    inLanguage: 'en'
  };

  const personSchema = {
    '@type': 'Person',
    '@id': personId,
    name: 'Rushil Gupta',
    url: siteUrl,
    description: siteDescription,
    affiliation: {
      '@type': 'Organization',
      name: 'Safexpress Centre for Data, Learning and Decision Sciences',
      url: 'https://scdlds.ashoka.edu.in/',
      parentOrganization: { '@type': 'CollegeOrUniversity', name: 'Ashoka University' }
    },
    image: absoluteUrl('/img/profile_pic.webp'),
    sameAs: [socialLinks.scholar, socialLinks.github, socialLinks.linkedin]
  };

  return (
    <main>
      <SchemaData data={{ '@graph': [websiteSchema, personSchema] }} />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-center gap-10 md:gap-6 md:-mx-4 py-8 md:py-12">
        {/* Preserve the original desktop photo width within the wider content area. */}
        <div className="animate-fade-in w-full md:w-[calc(51.975%_-_41.58px)] md:shrink-0 md:min-w-0 order-1">
          <div className="mx-auto w-full max-w-[560px] md:max-w-[529.2px] lg:max-w-[642.6px]">
            <div className="relative isolate">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-1 -z-10 rounded-lg bg-gradient-to-tr from-primary-main/5 to-accent-400/5 blur-lg" />
              <div className="overflow-hidden rounded-lg shadow-sm">
                <Image
                  src={landingPic}
                  alt="Rushil Gupta on the Embarcadero in San Francisco"
                  sizes="(min-width: 1024px) 642.6px, (min-width: 768px) 51.975vw, 92vw"
                  className="object-cover w-full aspect-[4/3] transition-transform duration-500 hover:scale-[1.0125] motion-reduce:transform-none motion-reduce:transition-none"
                  placeholder="blur"
                  priority
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-4">
              <a
                href={socialLinks.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background-paper hover:bg-accent-600/90 transition-colors duration-300 group"
                aria-label="Google Scholar Profile"
              >
                <SiGooglescholar size={20} className="text-text-secondary group-hover:text-white" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background-paper hover:bg-social-github transition-colors duration-300 group"
                aria-label="GitHub Profile"
              >
                <FaGithub size={20} className="text-text-secondary group-hover:text-white" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background-paper hover:bg-primary-main/90 transition-colors duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={20} className="text-text-secondary group-hover:text-white" />
              </a>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background-paper hover:bg-accent-500/90 transition-colors duration-300 group"
                aria-label="Resume"
              >
                <MdOutlineContactPage size={20} className="text-text-secondary group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* About Me Content */}
        <div className="animate-slide-up w-full md:w-auto md:flex-1 md:min-w-0 order-2 text-left px-4 sm:px-0">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-[2.5rem] font-bold leading-tight">
              <span className="text-primary-main">Rushil Gupta</span>
            </h1>

            <div className="prose prose-lg text-base md:text-[1.0625rem] leading-relaxed max-w-none prose-p:my-0 prose-p:mb-5 prose-a:font-normal prose-a:text-text-primary prose-a:underline prose-a:decoration-border-main prose-a:underline-offset-4 hover:prose-a:decoration-current">{content}</div>

            <div className="pt-4 flex flex-wrap gap-4 justify-start">
              <Link
                href="/publications"
                className="btn btn-primary flex items-center gap-2 group"
              >
                View My Research
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/blogs" className="btn btn-outline">
                Read My Blogs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
