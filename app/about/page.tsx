import { Card, CardContent } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - The Heritage Collective',
  description: 'Learn about our mission to preserve and celebrate traditional artifacts and cultural heritage.'
}

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold text-balance md:text-5xl">About The Heritage Collective</h1>
          <p className="text-lg text-balance opacity-90 md:text-xl">
            Connecting global artisans with collectors who appreciate authentic cultural treasures.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Our Mission */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground mb-4 text-lg">
                The Heritage Collective was founded with a singular purpose: to preserve and celebrate the world's
                traditional artifacts and cultural treasures. We believe that every handcrafted piece tells a story of
                heritage, skill, and cultural pride.
              </p>
              <p className="text-muted-foreground text-lg">
                By connecting artisans with collectors, we create a sustainable marketplace that honors traditional
                craftsmanship while supporting artisan communities worldwide.
              </p>
            </div>

            {/* Our Story */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
              {/* Visual Asset 1 */}
              <div className="mb-6 flex justify-center">
                <img src="/logo.png" alt="Vadānya Heritage Collective Logo" className="h-20 w-20 object-contain" />
              </div>
              <p className="text-muted-foreground mb-4 text-lg">
                Vadānya Heritage Collective was conceived from an enduring belief: the most meaningful objects are
                shaped by the stories around us.
                <br />
                To appreciate art in ways that resonate with each such tale, we looked into the historic traditions of
                colourful India. A resplendent picture arose with art unique and exquisite, leaving us mesmerised. The
                quiet strength of lineage echoed in unparalleled craftsmanship, with each artist holding a deep passion
                for the art passed down through generations.
              </p>
              {/* Visual Asset 2 */}
              <div className="mb-6 flex justify-center">
                {/* Replace with another relevant image if available */}
                <img
                  src="/traditional-indian-crafts.jpg"
                  alt="Traditional Indian Crafts"
                  className="h-40 w-auto rounded-lg object-cover shadow"
                />
              </div>
              <p className="text-muted-foreground text-lg">
                Behind every Vadānya piece lies a rhythm of making that cannot be rushed. Hands that have learned
                through repetition. Materials shaped by climate and geography. Techniques passed through memory. We
                honour this process by allowing it to accentuate modern living spaces.
                <br />
                <br />
                Each piece at Vadānya is chosen for its cultural provenance, material integrity, and the integrity of
                its making. Often GI-tagged, our collections are deliberately limited, allowing every artefact the
                dignity of focus.
                <br />
                <br />
                Vadānya blends the existence of the past and the present, where tradition is celebrated and cherished.
                Our collective is an invitation to live with heritage as a continuing conversation. In choosing Vadānya,
                you choose objects that speak softly, endure deeply, and belong both to history, and to the life you are
                building now.
              </p>
            </div>

            {/* Our Values */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Core Values</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">Authenticity</h3>
                    <p className="text-muted-foreground">
                      Every piece is verified for authenticity and comes with its story of origin and craftsmanship.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">Quality</h3>
                    <p className="text-muted-foreground">
                      We partner only with artisans who maintain the highest standards of traditional craftsmanship.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">Sustainability</h3>
                    <p className="text-muted-foreground">
                      Our artisans use sustainable, ethical methods that respect both people and the environment.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">Cultural Preservation</h3>
                    <p className="text-muted-foreground">
                      We're committed to preserving traditional crafts and supporting artisan communities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Our Heritage Impact */}
            <div className="from-primary/10 to-accent/10 rounded-lg bg-gradient-to-r p-8">
              <h2 className="mb-6 text-3xl font-bold">Our Heritage Impact</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Since our founding, The Heritage Collective has had a profound impact on preserving traditional crafts
                and supporting artisan communities globally. Our commitment goes beyond commerce—we're builders of
                cultural bridges.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center">
                  <p className="text-primary mb-2 text-4xl font-bold">45</p>
                  <p className="text-muted-foreground">Craft Traditions Preserved</p>
                </div>
                <div className="text-center">
                  <p className="text-primary mb-2 text-4xl font-bold">5.2M</p>
                  <p className="text-muted-foreground">Direct Artisan Support</p>
                </div>
                <div className="text-center">
                  <p className="text-primary mb-2 text-4xl font-bold">15K+</p>
                  <p className="text-muted-foreground">Artisan Livelihoods Supported</p>
                </div>
              </div>
            </div>

            {/* Artisan Partnership */}
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="mb-4 text-3xl font-bold">Supporting Artisans Worldwide</h2>
              <p className="text-muted-foreground mb-4 text-lg">
                Every purchase directly supports our network of artisan partners. We ensure fair compensation for their
                work and invest in the preservation of their traditional crafts. When you buy from The Heritage
                Collective, you're not just acquiring a beautiful piece—you're investing in cultural heritage and
                supporting skilled craftspeople.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center">
                  <p className="text-primary text-3xl font-bold">150+</p>
                  <p className="text-muted-foreground">Artisan Partners</p>
                </div>
                <div className="text-center">
                  <p className="text-primary text-3xl font-bold">45</p>
                  <p className="text-muted-foreground">Countries Represented</p>
                </div>
                <div className="text-center">
                  <p className="text-primary text-3xl font-bold">10K+</p>
                  <p className="text-muted-foreground">Happy Collectors</p>
                </div>
              </div>
            </div>

            {/* Our Craft Collections */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Craft Collections</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">🏺 Ceramics & Pottery</h3>
                    <p className="text-muted-foreground">
                      Handcrafted ceramic pieces from master potters using traditional wheel-throwing and kiln-firing
                      techniques passed down through generations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">🧵 Textiles & Weaving</h3>
                    <p className="text-muted-foreground">
                      Exquisite hand-woven fabrics, traditional tapestries, and embroidered textiles showcasing
                      centuries-old weaving traditions.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">⚒️ Metalwork & Jewelry</h3>
                    <p className="text-muted-foreground">
                      Intricate metal sculptures, ornamental pieces, and jewelry crafted using ancient metalworking
                      techniques and precious materials.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">🪨 Stone Carving & Sculpture</h3>
                    <p className="text-muted-foreground">
                      Stunning stone sculptures and carvings created by master artisans using traditional stone-working
                      tools and methods.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Our Curation Process */}
            <div className="border-border rounded-lg border p-8">
              <h2 className="mb-6 text-3xl font-bold">Our Curation Process</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-md">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Artisan Discovery</h3>
                    <p className="text-muted-foreground mt-2">
                      We travel to cultural centers and craft communities to discover master artisans creating authentic
                      traditional pieces.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-md">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Authenticity Verification</h3>
                    <p className="text-muted-foreground mt-2">
                      Each piece undergoes rigorous verification to ensure it meets our standards for authenticity,
                      quality, and ethical production.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-md">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Fair Trade Partnership</h3>
                    <p className="text-muted-foreground mt-2">
                      We establish direct partnerships ensuring artisans receive fair compensation, sustainable income,
                      and support for their communities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-md">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Storytelling & Documentation</h3>
                    <p className="text-muted-foreground mt-2">
                      We document each piece's story—the artisan's journey, cultural significance, and traditional
                      techniques used in its creation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder's Message */}
            <div className="from-primary/5 to-accent/5 border-border rounded-lg border bg-gradient-to-br p-8">
              <h2 className="mb-4 text-3xl font-bold">Founder's Message</h2>
              <p className="text-muted-foreground mb-6 text-lg italic">
                "Our journey began with a simple belief: every handcrafted artifact deserves to be celebrated and
                preserved. As we've grown, our mission has deepened—to create meaningful connections between artisans
                and collectors, ensuring that traditional crafts thrive for generations to come. Every purchase through
                The Heritage Collective is an investment in cultural heritage and human dignity."
              </p>
              <p className="font-semibold">— The Heritage Collective Team</p>
            </div>

            {/* Environmental & Social Commitment */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">Environmental & Social Commitment</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Environmental Responsibility</h3>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>All artisans use sustainable, eco-friendly materials and production methods</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>We offset carbon emissions from all international shipping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Packaging is 100% recyclable and made from sustainable materials</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Social Impact</h3>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Fair wages above local living standards for all artisans</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Educational programs for artisan communities and youth training</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Health and wellness support for artisan families</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
