import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { DesignTipsMasterDetail } from './tips'

export const metadata: Metadata = {
  title: 'Transforming Spaces - Vandanya Heritage Collective',
  description: 'Discover how traditional artifacts can transform your home and spaces with authentic cultural beauty.'
}

export default function TransformingSpaces() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-(--color-wine-red) py-16 text-(--color-ivory) md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Transforming Spaces with Heritage</h1>
          <p className="text-lg opacity-90 md:text-xl">
            Learn how to create stunning, culturally rich environments with traditional artifacts.
          </p>
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-(--color-wine-red)">Room Inspirations</h2>

          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            {[
              {
                img: '/traditional-living-room-decor.jpg',
                title: 'Living Room Elegance',
                desc: 'Transform your living space with a traditional rug, ceramic vases, and metal wall art that tells stories of cultural heritage.',
                items: [
                  'Hand-woven kilim rugs for warmth',
                  'Ceramic vases as focal points',
                  'Bronze mirrors and metalware',
                  'Wooden furniture with inlay work'
                ]
              },
              {
                img: '/traditional-bedroom-decor.jpg',
                title: 'Peaceful Bedroom Retreat',
                desc: 'Create a serene bedroom sanctuary with traditional textiles, stone sculptures, and cultural artifacts.',
                items: [
                  'Tapestries as headboard art',
                  'Traditional bed runners',
                  'Stone or wooden sculptures',
                  'Ceramic decorative accents'
                ]
              },
              {
                img: '/traditional-home-office.jpg',
                title: 'Inspiring Home Office',
                desc: 'Elevate your workspace with artifacts that inspire creativity and bring cultural richness.',
                items: [
                  'Desk accessories and organizers',
                  'Wall art and sculptural pieces',
                  'Traditional shelving decor',
                  'Functional artistic pieces'
                ]
              },
              {
                img: '/traditional-entryway-decor.jpg',
                title: 'Welcoming Entryway',
                desc: 'Make a powerful first impression with traditional artifacts that showcase global culture.',
                items: [
                  'Statement sculptures and statues',
                  'Decorative mirrors',
                  'Console table styling',
                  'Cultural wall hangings'
                ]
              }
            ].map((room, i) => (
              <Card
                key={i}
                className="overflow-hidden border border-(--color-wine-red)/15 bg-(--color-ivory) shadow-md"
              >
                <CardContent className="p-0">
                  <div className="relative h-96">
                    <Image src={room.img} alt={room.title} fill className="object-cover" />
                  </div>
                </CardContent>

                <div className="p-8">
                  <h3 className="mb-3 text-2xl font-bold text-(--color-wine-red)">{room.title}</h3>
                  <p className="mb-4 text-(--color-wine-red)/75">{room.desc}</p>

                  <ul className="space-y-2 text-sm text-(--color-wine-red)/80">
                    {room.items.map((item, idx) => (
                      <li key={idx}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <DesignTipsMasterDetail />
    </main>
  )
}
