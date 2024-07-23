import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import { MdOutlineContactPage } from 'react-icons/md';
import { linkedInUrl, githubUrl, emailId } from '@/lib/constants';

const Footer = () => {
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
        &#169; 2024 RUSHIL GUPTA
      </h2>
    </footer>
  );
};

export default Footer;
