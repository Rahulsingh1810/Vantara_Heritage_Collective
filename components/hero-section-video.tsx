'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroSectionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch (err) {
        console.log('Autoplay prevented')
      }
    }

    playVideo()
  }, [])

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source
            src="https://videos.ctfassets.net/qhow19z5bpnk/6Jr4eti5ckdIYr3bvEkgrd/d4a24728006c7f82c581be76799cf85d/Vhc1.mp4#t=0.01"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 lg:bg-black/35" />
      </div>
    </section>
  )
}
