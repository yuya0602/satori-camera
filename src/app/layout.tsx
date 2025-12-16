import type { Metadata } from 'next';
import './globals.css';
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-inter',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-jp',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-noto-serif-jp',
});

export const metadata: Metadata = {
  title: 'SATORI CAMERA | Old Lenses for Sony E-mount',
  description: '現代のセンサーに、伝説の描写を。オールドレンズの「味」と、最新の技術が交差する場所。',
  keywords: 'オールドレンズ, Sony E-mount, Helios, Zeiss, Leica, ヴィンテージレンズ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable} font-sans`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
