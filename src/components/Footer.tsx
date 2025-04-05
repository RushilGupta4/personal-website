import Link from 'next/link';
import { colors } from '@/lib/theme';

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-6 pb-6">
      <div className="container mx-auto px-4">
        <div className="h-px bg-border-light/30 mx-auto max-w-sm mb-4"></div>
        <div className="text-center">
          <p className="text-text-secondary text-sm font-medium tracking-wider">&#169; {currentYear} RUSHIL GUPTA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
