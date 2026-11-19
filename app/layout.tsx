import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from './providers/SmoothScrollProvider';
import DemoBar from '@/components/DemoBar';
import { isDemo } from '@/lib/demo';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kantine Kohlmann – Restaurant & Bar Berlin',
  description:
    'Kantine Kohlmann: Restaurant und Bar in Berlin Kreuzberg. Genieße moderne deutsche Küche und erstklassige Cocktails.',
  openGraph: {
    title: 'Kantine Kohlmann – Restaurant & Bar Berlin',
    description:
      'Kantine Kohlmann: Restaurant und Bar in Berlin Kreuzberg.',
    siteName: 'Kantine Kohlmann',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {isDemo() && <DemoBar />}
      </body>
    </html>
  );
}
