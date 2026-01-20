import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Transforming Spaces - The Heritage Collective',
  description: 'Discover how traditional artifacts can transform your home and spaces with authentic cultural beauty.'
}

export default function TransformingSpaces() {
  return (
    <main>
      {/* Hero Section */}
      <section className="from-primary/90 to-accent/80 text-primary-foreground bg-gradient-to-r py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold text-balance md:text-5xl">Transforming Spaces with Heritage</h1>
          <p className="text-lg text-balance opacity-90 md:text-xl">
            Learn how to create stunning, culturally rich environments with traditional artifacts.
          </p>
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-balance">Room Inspirations</h2>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Living Room */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted relative h-96">
                  <Image src="/traditional-living-room-decor.jpg" alt="Living Room" fill className="object-cover" />
                </div>
              </CardContent>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold">Living Room Elegance</h3>
                <p className="text-muted-foreground mb-4">
                  Transform your living space with a traditional rug, ceramic vases, and metal wall art that tells
                  stories of cultural heritage.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Hand-woven kilim rugs for warmth</li>
                  <li>✓ Ceramic vases as focal points</li>
                  <li>✓ Bronze mirrors and metalware</li>
                  <li>✓ Wooden furniture with inlay work</li>
                </ul>
              </div>
            </Card>

            {/* Bedroom */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted relative h-96">
                  <Image src="/traditional-bedroom-decor.jpg" alt="Bedroom" fill className="object-cover" />
                </div>
              </CardContent>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold">Peaceful Bedroom Retreat</h3>
                <p className="text-muted-foreground mb-4">
                  Create a serene bedroom sanctuary with traditional textiles, stone sculptures, and cultural artifacts.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Tapestries as headboard art</li>
                  <li>✓ Traditional bed runners</li>
                  <li>✓ Stone or wooden sculptures</li>
                  <li>✓ Ceramic decorative accents</li>
                </ul>
              </div>
            </Card>

            {/* Home Office */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted relative h-96">
                  <Image src="/traditional-home-office.jpg" alt="Home Office" fill className="object-cover" />
                </div>
              </CardContent>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold">Inspiring Home Office</h3>
                <p className="text-muted-foreground mb-4">
                  Elevate your workspace with artifacts that inspire creativity and bring cultural richness to your
                  daily work environment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Desk accessories and organizers</li>
                  <li>✓ Wall art and sculptural pieces</li>
                  <li>✓ Traditional crafted shelving decor</li>
                  <li>✓ Functional artistic pieces</li>
                </ul>
              </div>
            </Card>

            {/* Entryway */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted relative h-96">
                  <Image src="/traditional-entryway-decor.jpg" alt="Entryway" fill className="object-cover" />
                </div>
              </CardContent>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold">Welcoming Entryway</h3>
                <p className="text-muted-foreground mb-4">
                  Make a powerful first impression with traditional artifacts that showcase your appreciation for global
                  culture.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Statement sculptures and statues</li>
                  <li>✓ Decorative mirrors</li>
                  <li>✓ Console table styling</li>
                  <li>✓ Cultural wall hangings</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Design Tips */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Design Tips for Heritage Pieces</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-bold">1. Balance Modern & Traditional</h3>
                <p className="text-muted-foreground">
                  Mix heritage artifacts with contemporary furniture to create a harmonious blend that feels both
                  timeless and current.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-bold">2. Create Focal Points</h3>
                <p className="text-muted-foreground">
                  Use larger pieces like rugs, sculptures, or tapestries as focal points to anchor your room's design.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-bold">3. Respect Color Palettes</h3>
                <p className="text-muted-foreground">
                  Traditional artifacts often have rich, warm colors. Ensure they complement your existing color scheme.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-bold">4. Tell a Story</h3>
                <p className="text-muted-foreground">
                  Each piece has a history. Display your artifacts in ways that highlight their cultural significance
                  and craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-bold">5. Layer Your Decor</h3>
                <p className="text-muted-foreground">
                  Combine different sizes and types of artifacts to create depth and visual interest in your space.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-bold">6. Light It Well</h3>
                <p className="text-muted-foreground">
                  Proper lighting highlights the details and beauty of traditional artifacts, creating ambiance and
                  showcase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
