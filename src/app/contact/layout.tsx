import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Contact`,
  description: `Connect with me here!`,
  alternates: {
    canonical: `/contact`
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <div className={`mx-auto w-11/12 sm:w-3/4 md:w-[65%] lg:w-[57.5%] min-[1100px]:w-[50%]`}>{children}</div>;
}
