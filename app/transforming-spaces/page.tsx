'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { rooms } from '@/lib/transforming-data'
import { DesignTipsMasterDetail } from './tips'

export default function TransformingSpacesPage() {
  return (
    <main>
      {/* Hero – keep as is */}
      <section className="bg-(--color-wine-red) py-16 text-(--color-ivory) md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Transforming Spaces</h1>
          <p className="text-lg opacity-90 md:text-xl">Create stunning spaces with these artefact moodboards</p>
        </div>
      </section>

      {/* Room Inspirations – Cards Grid */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-(--color-wine-red)">Room Inspirations</h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms.map(room => (
              <Link
                key={room.slug}
                href={`/transforming-spaces/${room.slug}`}
                className="group block overflow-hidden rounded-2xl border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-md transition-all hover:border-(--color-wine-red)/40 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={room.thumbnailImg}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-(--color-wine-red)">{room.title}</h3>
                  <p className="line-clamp-4 text-sm leading-relaxed text-(--color-wine-red)/75">
                    {room.thumbnailText}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Keep Design Tips */}
      <DesignTipsMasterDetail />
    </main>
  )
}
