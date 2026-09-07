import './globals.scss';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { baseUrl, siteTitle, siteDescription } from '@/lib/constants';
import { roboto } from '@/lib/fonts';
import { DEFAULT_THEME, THEMES, THEME_ATTRIBUTE, THEME_STORAGE_KEY, palettes, themeVarsCss } from '@/lib/theme';
import type { Metadata, Viewport } from 'next';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define site metadata
const SITE_TITLE = siteTitle;
const SITE_DESCRIPTION = siteDescription;
const KEYWORDS =
  'Rushil Gupta, ML research, Applied Probability, Cryptography, software developer, computer science, Ashoka University, web development, portfolio, coding, programming';

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
    google: 'RW0waHcddtR83YbWH-GpTiqu8St-MYP9BruKFWPcAyo'
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
    siteName: 'Rushil Gupta'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION
  },
  authors: [{ name: 'Rushil Gupta', url: baseUrl }]
};

export const viewport: Viewport = {
  // Kept in sync with the active theme by the toggle.
  themeColor: palettes[DEFAULT_THEME].background.dark
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Applies the stored theme while the browser parses the HTML, so a visitor who
 * chose black and white never sees a flash of the dark palette.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(${JSON.stringify(
  THEMES
)}.indexOf(t)>-1)document.documentElement.setAttribute(${JSON.stringify(THEME_ATTRIBUTE)},t)}catch(e){}})()`;

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning className="h-full bg-background-dark sm:bg-background-light">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVarsCss }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${roboto.className} h-full text-text-primary mx-auto overflow-x-hidden flex flex-col justify-between`}>
        <div className="max-w-[110ch] 3xl:max-w-[130ch] 4xl:max-w-[180ch] mx-auto">
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
