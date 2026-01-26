import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { CartProvider } from '@/components/cart-provider'
import DiscountBanner from '@/components/discount-banner'
import SplashScreen from '@/components/splash-screen'
import { UserProvider } from '@/lib/user-context'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vantara Heritage Collective - Traditional Artifacts & Cultural Treasures',
  description: 'Discover authentic traditional artifacts and cultural treasures from skilled artisans worldwide',
  generator: 'quantech.pro',
  icons: {
    icon: [
      {
        url: '/logo.png',
        type: 'image/png'
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml'
      }
    ],
    apple: '/logo.png'
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
