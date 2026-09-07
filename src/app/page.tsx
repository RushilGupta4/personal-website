import Image from 'next/image';
import { getPostBySlug } from '@/lib/mdx';
import landingPic from '@/../public/img/landing.webp';
import SchemaData from '@/components/SchemaData';
import { socialLinks, baseUrl } from '@/lib/constants';
import Link from 'next/link';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import { MdOutlineContactPage } from 'react-icons/md';

interface PersonSchema {
  '@type': string;
  name: string;
  jobTitle: string;
  sameAs: string[];
  email: string;
  affiliation: {
    '@type': string;
    name: string;
    url: string;
  };
}

export default async function Home(): Promise<React.JSX.Element> {
  const { content } = await getPostBySlug('about-me', '');

  const personSchema = {
    '@type': 'Person',
    name: 'Rushil Gupta',
    url: baseUrl,
    jobTitle: 'Computer Science Student',
    alumniOf: 'Ashoka University',
    sameAs: [socialLinks.scholar, socialLinks.github, socialLinks.linkedin]
  };

  return (
    <main>
      <SchemaData data={personSchema} />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 py-10 md:py-20">
        {/* Profile Image */}
        <div className="animate-fade-in w-full md:w-[55%] order-1 md:order-2">
          <div className="mx-auto w-full max-w-[560px] lg:max-w-[680px]">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary-main/10 to-accent-400/10 rounded-lg blur-lg -z-10"></div>
              <div className="overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={landingPic}
                  alt="Rushil Gupta on the Embarcadero in San Francisco"
                  sizes="(max-width: 768px) 92vw, (max-width: 1024px) 55vw, 680px"
                  className="object-cover w-full aspect-[4/3] transition-all duration-500 hover:scale-[1.025]"
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
        <div className="animate-slide-up w-full md:w-[45%] order-2 md:order-1 text-center md:text-left px-4 sm:px-0">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-main to-accent-400">Rushil</span>
            </h1>

            <div className="prose prose-lg md:prose-xl max-w-none">{content}</div>

            <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/publications"
                className="btn btn-primary flex items-center gap-2 group shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                View My Research
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/blogs" className="btn btn-outline hover:bg-background-paper/30 transform hover:-translate-y-0.5 transition-all">
                Read My Blogs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
