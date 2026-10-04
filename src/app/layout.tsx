import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://stillstanding.story'),
  title: 'STILL STANDING: A Story of Rejection, Loneliness, and Refusing to Disappear',
  description:
    'An interactive autobiographical novella and narrative reader about engineering placements, silent 3 AM tears in Hyderabad, and the quiet courage to keep opening the laptop.',
  keywords: [
    'Still Standing',
    'Hyderabad',
    'Engineering placements',
    'Job search struggle',
    'Novella',
    'Autobiography',
  ],
  authors: [{ name: 'Still Standing Author' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'STILL STANDING — A Story of Rejection, Loneliness, and Refusing to Disappear',
    description:
      'For everyone who kept applying after the world stopped replying. For the ones who were told they were behind, while they were secretly fighting just to survive.',
    images: ['/images/hero_window.jpg'],
    type: 'article',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#030712] text-[#f3f4f6] font-sans antialiased selection:bg-sky-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
