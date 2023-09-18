import './globals.scss';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import Typing from '../components/NavbarTitle';
import { SocialIcon } from 'react-social-icons';
import { MdOutlineContactPage } from 'react-icons/md';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rushil Gupta',
  description: 'See a personal side of me, not to be found anywhere else!'
};

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li className={`text-shadow link link-underline pb-2`}>
      <Link href={href} className={`font-bold text-center text-lg sm:text-xl lg:text-[22px] px-2`}>
        {children}
      </Link>
    </li>
  );
}

function NavBar() {
  return (
    <div className={`text-white bg-gradient-to-b from-[#202c54] to-[#070d1d] backdrop-blur-sm pb-6 sm:pb-8 px-3 sm:px-16 md:px-20 lg:px-32`}>
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
        <ul className={`flex items-center pt-6 pb-10 sm:pb-12 justify-center sm:justify-start gap-x-4 sm:gap-x-12`}>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/blogs">Blogs</NavItem>
        </ul>
        <div className="min-h-[39px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-[72px]">
          <Typing className={`font-bold text-shadow leading-none empty:inline-block text-[39px] sm:text-[56px] md:text-[64px] lg:text-[72px]`} />
        </div>
      </div>
    </div>
  );
}

const SocialIcons = () => {
  const dropShadow = `duration-300 drop-shadow-none hover:drop-shadow-[2px_2px_3px_rgba(0,0,0,0.4)]`;
  return (
    <div className={'z-10 pt-8 pb-[2vh] sm:pb-[3vh] md:pb-[4vh] lg:pb-[5vh]'}>
      <div className={`flex gap-x-4 items-center justify-center pb-[10px] sm:pb-[12px]`}>
        <SocialIcon className={dropShadow} target="_blank" url={'https://github.com/rushilgupta4'} />
        <SocialIcon className={dropShadow} target="_blank" url={'https://linkedin.com/in/rushilgupta4'} bgColor={'#0a66c2'} />
        <Link className={dropShadow} target="_blank" href={'/data/resume.pdf'}>
          <div className={'rounded-full border-[8px] border-black bg-black'}>
            <MdOutlineContactPage size={34} color={`#ffffff`} title="Blogs" />
          </div>
        </Link>
        <SocialIcon className={dropShadow} network={'email'} url={'mailto:rushilgupta4@gmail.com'} bgColor={'#d53833'} />
      </div>
      <p
        className={`w-fit text-center text-gray-400 mx-auto border-t border-gray-400 font-medium tracking-[0.175rem] pt-[2px] sm:pt-[4px] text-[12px] sm:text-sm md:text-[14px]`}
      >
        &#169; 2023 RUSHIL GUPTA
      </p>
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full`}>
      <body className={`${inter.className} h-full bg-[#ffffff] text-black mx-auto max-w-full overflow-x-hidden flex flex-col justify-between`}>
        <div>
          <NavBar />
          <div className={`z-10 relative py-6 md:py-8 lg:py-10 px-4 sm:px-16 md:px-20 lg:px-24 bg-[#ffffff]`}>{children}</div>
        </div>
        <SocialIcons />
      </body>
    </html>
  );
}
