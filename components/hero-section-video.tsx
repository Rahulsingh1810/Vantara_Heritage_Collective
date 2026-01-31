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
      videoRef.current.play().catch(() => {
        // silent fail – mobile often blocks until interaction
      })
    }
  }, [])

  return (
    <section className="relative w-100vh h-100vh overflow-hidden flex items-center justify-center">
      {/* Video background – fills entire viewport */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`
            absolute inset-0 w-full h-full object-cover 
            transition-opacity duration-1000 ease-in-out
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <source src="https://videos.pexels.com/video-files/35755455/35755455-hd_1920_1080_30fps.mp4" type="video/mp4" />
          
          {/* Fallback image for very slow connections or errors */}
          <img
            src="/images/heritage-craft-fallback.jpg"
            alt="Traditional Indian artisan craft"
            className="absolute inset-0 w-full h-full object-cover"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay – stronger on mobile for readability, softer on desktop */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 lg:bg-black/35" />
      </div>

      {/* Content – centered, with safe padding */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20 text-center text-white">
        <div className="space-y-6 md:space-y-8">
          <img
            src="/logo.png"
            alt="Vadānya Heritage Collective Logo"
            className="mx-auto h-16 w-16 md:h-24 md:w-24 object-contain opacity-90 drop-shadow-lg"
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
            Vadānya Heritage Collective
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/95 drop-shadow-md">
            Regal Tradition. Timeless Curation.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-3xl mx-auto pt-4 md:pt-6 drop-shadow">
            Premium heritage decor curated from India’s living craft traditions — each piece carries generations of devotion, skill, and soul.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8 md:pt-12">
            <Button
              asChild
              size="lg"
              className="bg-amber-700 hover:bg-amber-800 text-white shadow-lg px-8 py-6 text-lg font-medium transition-all hover:scale-105"
            >
              <Link href="/collections">Explore Collections</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/80 text-white hover:bg-white/15 px-8 py-6 text-lg backdrop-blur-sm transition-all hover:scale-105"
            >
              <Link href="/our-story">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Optional scroll indicator – only on larger screens */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center animate-bounce-slow">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse" />
        </div>
        <span className="mt-2 text-white/70 text-sm">Scroll to explore</span>
      </div>
    </section>
  )
}