import '@/styles/index.css';
import Toast from '@/components/toast';
import { ReactNode, StrictMode, Suspense } from 'react';
import ClientInit from './client-init';
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';
import { TITLE } from '@/lib/constants';
import { Manrope, Space_Grotesk } from 'next/font/google';

const description =
  'A personal portfolio site featuring projects and a blog focused on web development, programming, and technology.';
const siteUrl = 'https://www.troelslund.dk';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  applicationName: TITLE,
  description: description,
  referrer: 'strict-origin-when-cross-origin',
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: TITLE,
    description: description,
    images: [
      {
        url: '/home.png',
        width: 1200,
        height: 630,
        alt: "The homepage of Troels Lund's portfolio site",
      },
    ],
  },
  twitter: {
    creator: '@trolund',
    card: 'summary_large_image',
    title: TITLE,
    description: 'Your site description',
    images: ['/home.png'],
  },
  other: {
    'google-site-verification': 'fK40wZmELLwBjymUVMTij0LHyohVxm-xrNj4T7mPzaU',
  },
};

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-content-text focus:px-4 focus:py-2 focus:text-text"
        >
          Skip to main content
        </a>
        <StrictMode>
          <ThemeProvider enableSystem={true}>
            {children}
            <Suspense fallback={null}>
              <ClientInit />
            </Suspense>
            <Toast />
          </ThemeProvider>
        </StrictMode>
      </body>
    </html>
  );
}
