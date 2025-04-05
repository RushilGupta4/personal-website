import './globals.scss';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { baseUrl } from '@/lib/constants';
import { roboto } from '@/lib/fonts';
import { colors } from '@/lib/theme';
import type { Metadata } from 'next';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define site metadata
const SITE_TITLE = 'Rushil Gupta | CS @ Ashoka University';
const SITE_DESCRIPTION =
  "I'm Rushil Gupta, a student developer often known as a CS nerd, gym rat, and caffeine addict. Discover a side of me that cannot be found anywhere else!";
const KEYWORDS = 'Rushil Gupta, software developer, computer science, Ashoka University, web development, portfolio, coding, programming';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_TITLE,
    template: `%s - Rushil Gupta`
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
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
    nocache: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    type: 'website',
    siteName: 'Rushil Gupta',
    images: [
      {
        url: `${baseUrl}/img/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Rushil Gupta'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${baseUrl}/img/opengraph-image.png`]
  },
  alternates: {
    canonical: '/'
  },
  authors: [{ name: 'Rushil Gupta', url: baseUrl }]
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  // Using style prop for dynamic values from theme
  const htmlStyle = {
    '--bg-dark': colors.background.dark,
    '--bg-light': colors.background.light,
    '--text-primary': colors.text.primary
  } as React.CSSProperties;

  return (
    <html lang="en" style={htmlStyle} className="h-full bg-[var(--bg-dark)] sm:bg-[var(--bg-light)]">
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
