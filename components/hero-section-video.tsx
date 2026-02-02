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
    <section className="w-100vh h-100vh relative flex items-center justify-center overflow-hidden">
      {/* Video background – fills entire viewport */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} `}
        >
          <source
            src="https://videos.pexels.com/video-files/35755455/35755455-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          {/* Fallback image for very slow connections or errors */}
          <img
            src="/images/heritage-craft-fallback.jpg"
            alt="Traditional Indian artisan craft"
            className="absolute inset-0 h-full w-full object-cover"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay – stronger on mobile for readability, softer on desktop */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 lg:bg-black/35" />
      </div>

      {/* Content – centered, with safe padding */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-12 text-center text-white sm:px-8 sm:py-16 md:py-20 lg:px-12">
        <div className="space-y-6 md:space-y-8">
          <img
            src="/logo.png"
            alt="Vadānya Heritage Collective Logo"
            className="mx-auto h-16 w-16 object-contain opacity-90 drop-shadow-lg md:h-24 md:w-24"
          />

          <h1 className="text-4xl leading-tight font-extrabold tracking-tight drop-shadow-xl sm:text-5xl md:text-6xl lg:text-7xl">
            Vadānya Heritage Collective
          </h1>

          <p className="text-xl font-light text-white/95 drop-shadow-md sm:text-2xl md:text-3xl">
            Regal Tradition. Timeless Curation.
          </p>

          <p className="mx-auto max-w-3xl pt-4 text-base text-white/85 drop-shadow sm:text-lg md:pt-6 md:text-xl">
            Premium heritage decor curated from India’s living craft traditions — each piece carries generations of
            devotion, skill, and soul.
          </p>

          <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row sm:gap-6 md:pt-12">
            <Button
              asChild
              size="lg"
              className="bg-amber-700 px-8 py-6 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-amber-800"
            >
              <Link href="/collections">Explore Collections</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/80 px-8 py-6 text-lg text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/15"
            >
              <Link href="/our-story">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Optional scroll indicator – only on larger screens */}
      <div className="animate-bounce-slow absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center md:flex">
        <div className="flex h-12 w-8 items-center justify-center rounded-full border-2 border-white/60">
          <div className="h-3 w-1.5 animate-pulse rounded-full bg-white/80" />
        </div>
        <span className="mt-2 text-sm text-white/70">Scroll to explore</span>
      </div>
    </section>
  )
}
