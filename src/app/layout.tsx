import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://seoulea.com.bd'),
  title: 'Seouléa — Korean Skincare & Beauty | Glow Your True Beauty',
  description:
    'Exclusive Korean skincare & cosmetics in Bangladesh. 100% authentic Beauty of Joseon, COSRX, Anua, SKIN1004, Laneige, and Round Lab delivered nationwide with Cash on Delivery and bKash.',
  keywords: [
    'Korean Skincare Bangladesh',
    'K-Beauty Dhaka',
    'Beauty of Joseon Bangladesh',
    'COSRX Snail Mucin',
    'Seouléa',
    'Glass Skin routine BD',
  ],
  icons: {
    icon: '/images/seoulea-logo.jpg',
  },
  openGraph: {
    title: 'Seouléa — Korean Skincare & Beauty',
    description: 'Your Seoul-Inspired Beauty Destination in Bangladesh.',
    images: ['/images/seoulea-logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-seoulea-ivory text-seoulea-cocoa antialiased selection:bg-seoulea-blush selection:text-seoulea-cocoa-dark">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
