import { Card, CardContent } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Vadānya Heritage Collective',
  description:
    'Learn about our mission to preserve and celebrate traditional Indian heritage artefacts and cultural legacy.',
}

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className=" text-primary-foreground py-5 md:py-5">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold text-balance text-[var(--color-wine-red)] md:text-5xl">Our Story</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-5 md:py-5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Our Story */}
            <div className="space-y-8">
              <div className="mb-8 flex justify-center">
                <img
                  src="/traditional-indian-crafts.jpg"
                  alt="Traditional Indian Crafts"
                  className="h-auto max-h-[500px] w-full rounded-xl object-cover shadow-lg"
                />
              </div>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Vadānya Heritage Collective was conceived from an enduring belief: the most meaningful objects are
                shaped by the stories around us.
                <br /><br />
                To appreciate art in ways that resonate with each such tale, we looked into the historic traditions of
                colourful India. A resplendent picture arose with art unique and exquisite, leaving us mesmerised. The
                quiet strength of lineage echoed in unparalleled craftsmanship, with each artist holding a deep passion
                for the art passed down through generations.
              </p>

              <div className="mb-8 flex justify-center">
                <img
                  src="/traditional-indian-crafts.jpg"
                  alt="Artisan at work"
                  className="h-auto max-h-[500px] w-full rounded-xl object-cover shadow-lg"
                />
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Behind every Vadānya piece lies a rhythm of making that cannot be rushed. Hands that have learned
                through repetition. Materials shaped by climate and geography. Techniques passed through memory. We
                honour this process by allowing it to accentuate modern living spaces.
                <br /><br />
                Each piece at Vadānya is chosen for its cultural provenance, material integrity, and the integrity of
                its making. Often GI-tagged, our collections are deliberately limited, allowing every artefact the
                dignity of focus.
                <br /><br />
                Vadānya blends the existence of the past and the present, where tradition is celebrated and cherished.
                Our collective is an invitation to live with heritage as a continuing conversation. In choosing Vadānya,
                you choose objects that speak softly, endure deeply, and belong both to history, and to the life you are
                building now.
              </p>
            </div>

            {/* Our Curation Process – Card Grid Layout */}
            <div className="space-y-10">
              <h2 className="text-3xl font-bold text-center text-[var(--color-wine-red)]/90 md:text-left">Our Curation Process</h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="border-border bg-background shadow-sm transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-[var(--color-wine-red)]/80">
                      Finding Craft at the Source
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our journey begins within the regions where traditions continue to live and breathe. We work
                      directly with artisans practising age-old techniques in their native locales, allowing each piece
                      to carry the cultural and geographic truth of its origin.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-background shadow-sm transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-[var(--color-wine-red)]/80">
                      Honouring the Pace of Making
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The craft we curate cannot be accelerated. Skills refined through repetition, materials shaped by
                      climate, and techniques carried through memory determine the rhythm of creation. We respect time
                      as an essential element of the process.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-background shadow-sm transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-[var(--color-wine-red)]/80">
                      Curating with Intent
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Each artefact is chosen for its cultural provenance, material honesty, and fidelity to traditional
                      methods. Our collections are deliberately small, for we preserve the dignity of each artefact and
                      ensure that every piece receives the attention, care, and context it deserves.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-background shadow-sm transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-[var(--color-wine-red)]/80">
                      Heritage in Contemporary Living
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The crux of our curative spirit lies in determining how tradition inhabits the present. Each piece
                      is selected for its ability to retain its cultural essence while finding relevance within modern
                      living spaces. Your homes are regaled with tales belonging to ancient but timeless heritage.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* A Note from the Collective */}
            <div className="from-primary/5 to-accent/5 border-border rounded-xl border bg-gradient-to-br p-8 md:p-10">
              <h2 className="mb-6 text-3xl text-[var(--color-wine-red)] font-bold">A Note from the Collective</h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed italic">
                Vadānya was born from the conviction that long-standing handcrafted artefacts were more than relics of
                the past. Their stories deserved to be etched in the present and find echoes in spaces filled with warmth
                and love. In welcoming these artefacts into your space, you’re essentially gathering a piece of history
                cherished and perfected over centuries.
              </p>
              <p className="font-semibold text-[var(--color-wine-red)]/90 text-right">— Vadānya Heritage Collective</p>
            </div>

            {/* Environmental & Social Commitment – Blended */}
            <div className="space-y-10">
              <h2 className="text-3xl font-bold text-center text-[var(--color-wine-red)] md:text-left">
                Environmental & Social Commitment
              </h2>

              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p>
                  At Vadānya, our relationship with the earth and its keepers is not an afterthought—it is foundational.
                  We are guided first by <strong>material integrity</strong> and fidelity to time-honoured processes
                  rather than speed or scale.
                </p>

                <p>
                  By maintaining deliberately <strong>limited collections</strong>, we consciously avoid excess and
                  overproduction, allowing each piece the space and dignity it deserves while reducing pressure on both
                  artisans and natural resources.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
                <div className="space-y-6 rounded-xl border border-border bg-muted/30 p-7">
                  <h3 className="text-xl font-semibold text-[var(--color-wine-red)]/80">
                    Respect for Regional Craft Ecosystems
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--color-wine-red)] text-xl font-bold">✓</span>
                      <span>
                        We source directly from origin locales, supporting living craft traditions without disrupting
                        regional balance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--color-wine-red)] text-xl font-bold">✓</span>
                      <span>
                        Materials are chosen with awareness of seasonal availability and local ecological cycles
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--color-wine-red)] text-xl font-bold">✓</span>
                      <span>
                        Partnerships respect the natural rhythm and capacity of each craft community
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6 rounded-xl border border-border bg-muted/30 p-7">
                  <h3 className="text-xl font-semibold text-[var(--color-wine-red)]/80">
                    Conscious & Evolving Approach
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--color-wine-red)] text-xl font-bold">✓</span>
                      <span>
                        Use of sustainable, traditionally appropriate materials wherever possible
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--color-wine-red)] text-xl font-bold">✓</span>
                      <span>
                        Minimal packaging — 100% recyclable or reusable whenever feasible
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--color-wine-red)] text-xl font-bold">✓</span>
                      <span>
                        Ongoing dialogue with artisans to evolve practices that honour both heritage and the future
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 text-center md:text-left">
                <p className="text-lg font-medium italic text-[var(--color-wine-red)]/80">
                  We choose integrity-led curation over volume-driven commerce — because true heritage cannot be
                  mass-produced, and meaningful sustainability begins with restraint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}