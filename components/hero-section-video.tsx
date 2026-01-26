// components/hero-section-video.tsx
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function HeroSectionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      // Optional: force play in some mobile browsers that block autoplay
      videoRef.current.play().catch(() => {
        // mute + play usually works
      })
    }
  }, [])

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover 
            transition-opacity duration-1000
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <source src="" type="video/mp4" />
          {/* fallback image if video fails to load */}
          <img
            src="/images/heritage-fallback.jpg"
            alt="Heritage craft fallback"
            className="w-full h-full object-cover"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/45 md:bg-black/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Logo (optional – smaller on mobile) */}
          <img
            src="/logo.png"
            alt="Vadānya Heritage Collective Logo"
            className="mx-auto h-16 w-16 md:h-24 md:w-24 object-contain opacity-90"
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Vadānya Heritage Collective
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90">
            Regal Tradition. Timeless Curation.
          </p>

          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto pt-4 md:pt-6">
            Premium heritage decor curated from India’s living craft traditions — each piece carries generations of devotion, skill, and soul.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 md:pt-10">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white border-none px-8 py-6 text-lg font-medium"
            >
              <Link href="/products">Explore Collections</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/70 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Optional subtle scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-center justify-center animate-bounce-slow">
          <div className="w-1.5 h-3 bg-white/80 rounded-full" />
        </div>
      </div>
    </section>
  )
}