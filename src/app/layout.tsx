import './globals.scss';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import Typing from '@/components/NavbarTitle';
import { SocialIcon } from 'react-social-icons';
import { MdOutlineContactPage } from 'react-icons/md';
import { baseUrl, altUrl, linkedInUrl, githubUrl, emailId } from '@/lib/constants';
import { inter } from '@/lib/fonts';
import type { Metadata } from 'next';

const title = 'Rushil Gupta | CS @ Ashoka University';
const description =
  "I'm Rushil Gupta, a student developer often known as a CS nerd, gym rat, and caffeine addict. Discover a side of me that cannot be found anywhere else!";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s - Rushil Gupta`
  },
  description: description,
  icons: {
    icon: '/img/favicon.png',
    apple: '/img/favicon.png'
  },
  verification: {
    google: 'google-site-verification=RW0waHcddtR83YbWH-GpTiqu8St-MYP9BruKFWPcAyo'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true
  },
  openGraph: {
    title: title,
    description: description,
    url: baseUrl,
    type: 'website'
  },
  alternates: {
    canonical: `/`
  },
  authors: [{ name: 'Rushil Gupta', url: baseUrl }]
};

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li className={`text-shadow link-underline pb-2`}>
      <Link href={href} className={`font-bold text-center text-lg sm:text-xl lg:text-[22px] px-2`}>
        {children}
      </Link>
    </li>
  );
}

function NavBar() {
  return (
    <header className={`text-white bg-gradient-to-b from-[#202c54] to-[#070d1d] backdrop-blur-sm pb-6 sm:pb-[30px] px-3 sm:px-16 md:px-20 lg:px-32`}>
      <div className={`emojiWrapper fixed text-4xl blur-[1.25px] sm:blur-[1.5px] md:blur-[1.75px] brightness-50`}>
        <p>&#9749;</p> {/* Coffee */}
        <p>&#x1F4BB;</p> {/* Personal Laptop */}
        <p>&#128170;</p> {/* Flexed Bicep */}
        <p>&#129299;</p> {/* Nerd Face */}
        <p>&#9749;</p> {/* Coffee */}
        <p>&#x1F4BB;</p> {/* Personal Laptop */}
        <p>&#128170;</p> {/* Flexed Bicep */}
      </div>
      <div className={'z-10 relative'}>
        <ul className={`flex items-center pt-6 pb-10 sm:pb-12 justify-center sm:justify-start gap-x-3 sm:gap-x-6 lg:gap-x-8`}>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/blogs">Blogs</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </ul>
        <div className="min-h-[39px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-[72px]">
          <Typing className={`font-bold text-shadow leading-none empty:inline-block text-[39px] sm:text-[56px] md:text-[64px] lg:text-[72px]`} />
        </div>
      </div>
    </header>
  );
}

const SocialIcons = () => {
  const dropShadow = `rounded-full duration-200 shadow-none hover:shadow-[0_7px_10px_3px_rgba(0,0,0,0.15)]`;

  return (
    <footer className={'z-10 pt-5 pb-[2vh]'}>
      <div className={`flex gap-x-4 items-center justify-center pb-[10px] sm:pb-[12px]`}>
        <SocialIcon className={dropShadow} target="_blank" url={githubUrl} bgColor="#1C2128" />
        <SocialIcon className={dropShadow} target="_blank" url={linkedInUrl} bgColor={'#0a66c2'} />
        <Link className={dropShadow} target="_blank" href={'/resume.pdf'}>
          <div className={'rounded-full border-[8px] border-black bg-black'}>
            <MdOutlineContactPage size={34} color={`#ffffff`} title="Resume" />
          </div>
        </Link>
        <SocialIcon className={dropShadow} network={'email'} url={emailId} bgColor={'#d53833'} />
      </div>
      <h2
        className={`w-fit text-center text-gray-500 mx-auto border-t border-gray-500 font-medium tracking-[0.175rem] pt-[2px] sm:pt-[4px] text-[12px] sm:text-sm md:text-[14px]`}
      >
        &#169; 2023 RUSHIL GUPTA
      </h2>
    </footer>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bg = `bg-white`;

  return (
    <html lang="en" className={`h-full`}>
      <body className={`${inter.className} ${bg} h-full text-black mx-auto max-w-full overflow-x-hidden flex flex-col justify-between`}>
        <div>
          <NavBar />
          <div className={`${bg} z-10 relative py-4 md:py-6 lg:py-8 px-4 sm:px-16 md:px-20 lg:px-24`}>{children}</div>
        </div>
        <SocialIcons />
        <Analytics />
      </body>
    </html>
  );
}
