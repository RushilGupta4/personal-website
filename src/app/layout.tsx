import './globals.scss';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { baseUrl } from '@/lib/constants';
import { roboto } from '@/lib/fonts';
import type { Metadata } from 'next';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full bg-[#000000] sm:bg-[#19191c]`}>
      <body className={`${roboto.className} h-full text-white mx-auto overflow-x-hidden flex flex-col justify-between`}>
        <div className="max-w-[90ch] 3xl:max-w-[110ch] 4xl:max-w-[170ch] mx-auto">
          <NavBar />
          <div className="mx-8">{children}</div>
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
