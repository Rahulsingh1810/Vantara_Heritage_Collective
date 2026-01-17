import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - The Heritage Collective",
  description: "Learn about our mission to preserve and celebrate traditional artifacts and cultural heritage.",
}

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">About The Heritage Collective</h1>
          <p className="text-lg md:text-xl opacity-90 text-balance">
            Connecting global artisans with collectors who appreciate authentic cultural treasures.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Our Mission */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                The Heritage Collective was founded with a singular purpose: to preserve and celebrate the world's
                traditional artifacts and cultural treasures. We believe that every handcrafted piece tells a story of
                heritage, skill, and cultural pride.
              </p>
              <p className="text-lg text-muted-foreground">
                By connecting artisans with collectors, we create a sustainable marketplace that honors traditional
                craftsmanship while supporting artisan communities worldwide.
              </p>
            </div>

            {/* Our Story */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                What began as a passion for authentic cultural artifacts has grown into a curated platform representing
                artisans from six continents. Our founders traveled extensively, building relationships with master
                craftspeople and discovering the unique stories behind traditional artifacts.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we're proud to offer a carefully selected collection of authentic pieces—from ceramic pottery to
                hand-woven textiles, from intricate metalware to stunning stone sculptures.
              </p>
            </div>

            {/* Our Values */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Authenticity</h3>
                    <p className="text-muted-foreground">
                      Every piece is verified for authenticity and comes with its story of origin and craftsmanship.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Quality</h3>
                    <p className="text-muted-foreground">
                      We partner only with artisans who maintain the highest standards of traditional craftsmanship.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Sustainability</h3>
                    <p className="text-muted-foreground">
                      Our artisans use sustainable, ethical methods that respect both people and the environment.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Cultural Preservation</h3>
                    <p className="text-muted-foreground">
                      We're committed to preserving traditional crafts and supporting artisan communities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Our Heritage Impact */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Our Heritage Impact</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Since our founding, The Heritage Collective has had a profound impact on preserving traditional crafts
                and supporting artisan communities globally. Our commitment goes beyond commerce—we're builders of
                cultural bridges.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">45</p>
                  <p className="text-muted-foreground">Craft Traditions Preserved</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">5.2M</p>
                  <p className="text-muted-foreground">Direct Artisan Support</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">15K+</p>
                  <p className="text-muted-foreground">Artisan Livelihoods Supported</p>
                </div>
              </div>
            </div>

            {/* Artisan Partnership */}
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4">Supporting Artisans Worldwide</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Every purchase directly supports our network of artisan partners. We ensure fair compensation for their
                work and invest in the preservation of their traditional crafts. When you buy from The Heritage
                Collective, you're not just acquiring a beautiful piece—you're investing in cultural heritage and
                supporting skilled craftspeople.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">150+</p>
                  <p className="text-muted-foreground">Artisan Partners</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">45</p>
                  <p className="text-muted-foreground">Countries Represented</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-muted-foreground">Happy Collectors</p>
                </div>
              </div>
            </div>

            {/* Our Craft Collections */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Craft Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">🏺 Ceramics & Pottery</h3>
                    <p className="text-muted-foreground">
                      Handcrafted ceramic pieces from master potters using traditional wheel-throwing and kiln-firing
                      techniques passed down through generations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">🧵 Textiles & Weaving</h3>
                    <p className="text-muted-foreground">
                      Exquisite hand-woven fabrics, traditional tapestries, and embroidered textiles showcasing
                      centuries-old weaving traditions.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">⚒️ Metalwork & Jewelry</h3>
                    <p className="text-muted-foreground">
                      Intricate metal sculptures, ornamental pieces, and jewelry crafted using ancient metalworking
                      techniques and precious materials.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">🪨 Stone Carving & Sculpture</h3>
                    <p className="text-muted-foreground">
                      Stunning stone sculptures and carvings created by master artisans using traditional stone-working
                      tools and methods.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Our Curation Process */}
            <div className="border rounded-lg p-8 border-border">
              <h2 className="text-3xl font-bold mb-6">Our Curation Process</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Artisan Discovery</h3>
                    <p className="text-muted-foreground mt-2">
                      We travel to cultural centers and craft communities to discover master artisans creating authentic
                      traditional pieces.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Authenticity Verification</h3>
                    <p className="text-muted-foreground mt-2">
                      Each piece undergoes rigorous verification to ensure it meets our standards for authenticity,
                      quality, and ethical production.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Fair Trade Partnership</h3>
                    <p className="text-muted-foreground mt-2">
                      We establish direct partnerships ensuring artisans receive fair compensation, sustainable income,
                      and support for their communities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Storytelling & Documentation</h3>
                    <p className="text-muted-foreground mt-2">
                      We document each piece's story—the artisan's journey, cultural significance, and traditional
                      techniques used in its creation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder's Message */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 border border-border">
              <h2 className="text-3xl font-bold mb-4">Founder's Message</h2>
              <p className="text-lg text-muted-foreground italic mb-6">
                "Our journey began with a simple belief: every handcrafted artifact deserves to be celebrated and
                preserved. As we've grown, our mission has deepened—to create meaningful connections between artisans
                and collectors, ensuring that traditional crafts thrive for generations to come. Every purchase through
                The Heritage Collective is an investment in cultural heritage and human dignity."
              </p>
              <p className="font-semibold">— The Heritage Collective Team</p>
            </div>

            {/* Environmental & Social Commitment */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Environmental & Social Commitment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Environmental Responsibility</h3>
                  <ul className="space-y-3 text-muted-foreground">
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
                  <ul className="space-y-3 text-muted-foreground">
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
