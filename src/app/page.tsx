import Image from 'next/image';
import { getPostBySlug } from '@/lib/mdx';
import profilePic from '@/../public/img/profile_pic.webp';
import SchemaData from '@/components/SchemaData';
import { socialLinks, baseUrl } from '@/lib/constants';
import Link from 'next/link';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
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

export default async function Home(): Promise<JSX.Element> {
  const { content } = await getPostBySlug('about-me', '');

  const personSchema = {
    '@type': 'Person',
    name: 'Rushil Gupta',
    url: baseUrl,
    jobTitle: 'Computer Science Student',
    alumniOf: 'Ashoka University',
    sameAs: ['https://www.linkedin.com/in/rushilgupta4', 'https://github.com/RushilGupta4']
  };

  return (
    <main>
      <SchemaData data={personSchema} />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 py-10 md:py-20">
        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 w-24 h-24 rounded-full bg-primary-main/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-blue-400/10 blur-3xl"></div>

        {/* Profile Image */}
        <div className="animate-fade-in w-full md:w-1/2 order-1 md:order-2 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-main to-blue-400 opacity-[15%] blur-xl rounded-2xl"></div>
          <div className="relative mx-auto max-w-[280px] md:max-w-[340px] lg:max-w-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-main/20 to-blue-400/20 rounded-2xl blur-xl -z-10 transform rotate-6"></div>
            <div className="card overflow-hidden p-3 backdrop-blur-sm bg-background-paper/70">
              <Image
                src={profilePic}
                width={1024}
                height={1024}
                alt="Picture of Rushil Gupta"
                className="rounded-xl object-cover w-full h-full shadow-lg transition-all duration-500 hover:scale-[1.025]"
                placeholder="blur"
                priority
              />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background-paper hover:bg-background-dark transition-colors duration-300 group"
                aria-label="GitHub Profile"
              >
                <FaGithub size={20} className="text-text-secondary group-hover:text-text-primary" />
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
                className="p-2 rounded-full bg-background-paper hover:bg-blue-500/90 transition-colors duration-300 group"
                aria-label="Resume"
              >
                <MdOutlineContactPage size={20} className="text-text-secondary group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* About Me Content */}
        <div className="animate-slide-up w-full md:w-3/5 order-2 md:order-1 text-center md:text-left px-4 sm:px-0">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-primary-main/10 text-text-primary border border-primary-main/20">
              Student Developer
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-main to-blue-400">Rushil</span>
            </h1>

            <div className="prose prose-invert prose-lg md:prose-xl max-w-none">{content}</div>

            <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/projects"
                className="btn btn-primary flex items-center gap-2 group shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                View My Projects
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
