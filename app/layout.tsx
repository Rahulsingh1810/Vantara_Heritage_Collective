import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { CartProvider } from '@/components/cart'
import DiscountBanner from '@/components/discount-banner'
import SplashScreen from '@/components/splash-screen'
import { UserProvider } from '@/lib/user-context'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://vadanyaheritage.in'),
  title: 'Vadānya Heritage Collective - Traditional Artifacts & Cultural Treasures',
  description: 'Discover authentic traditional artifacts and cultural treasures from skilled artisans worldwide',
  generator: 'quantech.pro',
  verification: {
    google: '1lAOqMSQLNwm7PNGAxJoAfSOxNpHRe7qh1D8mn-n4Dw'
  },
  openGraph: {
    images: [
      {
        url: '/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Vadānya Heritage Collective Logo'
      }
    ]
  },
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png'
      }
    ],
    apple: '/favicon.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SplashScreen />
        <UserProvider>
          <CartProvider>
            <DiscountBanner />
            <Navigation />
            {children}
            <Footer />
            <Analytics />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}
