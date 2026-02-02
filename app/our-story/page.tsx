import type { Metadata } from 'next'
import CurationMasterDetail from './master'

export const metadata: Metadata = {
  title: 'About Us - Vadānya Heritage Collective',
  description:
    'Learn about our mission to preserve and celebrate traditional Indian heritage artefacts and cultural legacy.'
}

export default function About() {
  return (
    <main>
      {/* HERO */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-(--color-wine-red) md:text-5xl">Our Story</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-background pb-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-24">
            {/* STORY */}
            <div className="space-y-10">
              <img
                src="/traditional-indian-crafts.jpg"
                alt="Traditional Indian Crafts"
                className="w-full rounded-2xl object-cover shadow-xl"
              />

              <p className="text-muted-foreground text-lg leading-relaxed">
                Vadānya Heritage Collective was conceived from an enduring belief: the most meaningful objects are
                shaped by the stories around us.
                <br />
                <br />
                To appreciate art in ways that resonate with each such tale, we looked into the historic traditions of
                colourful India. A resplendent picture arose with art unique and exquisite, leaving us mesmerised. The
                quiet strength of lineage echoed in unparalleled craftsmanship, with each artist holding a deep passion
                for the art passed down through generations.
              </p>

              <img
                src="/traditional-indian-crafts.jpg"
                alt="Artisan at work"
                className="w-full rounded-2xl object-cover shadow-xl"
              />

              <p className="text-muted-foreground text-lg leading-relaxed">
                Behind every Vadānya piece lies a rhythm of making that cannot be rushed. Hands that have learned
                through repetition. Materials shaped by climate and geography. Techniques passed through memory.
                <br />
                <br />
                Each piece at Vadānya is chosen for its cultural provenance, material integrity, and the integrity of
                its making. Often GI-tagged, our collections are deliberately limited, allowing every artefact the
                dignity of focus.
                <br />
                <br />
                Vadānya blends the existence of the past and the present. Our collective is an invitation to live with
                heritage as a continuing conversation.
              </p>
            </div>

            {/* MASTER SLAVE CURATION */}
            <CurationMasterDetail />

            {/* NOTE */}
            <div className="rounded-3xl border border-(--color-wine-red)/20 bg-linear-to-br from-(--color-ivory) to-white p-10 shadow-lg">
              <h2 className="mb-6 text-3xl font-bold text-(--color-wine-red)">A Note from the Collective</h2>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed italic">
                Vadānya was born from the conviction that handcrafted artefacts are more than relics of the past. Their
                stories deserve to live in the present and echo through spaces filled with warmth and meaning.
              </p>

              <p className="text-right font-semibold text-(--color-wine-red)">— Vadānya Heritage Collective</p>
            </div>

            {/* ENVIRONMENT */}
            <div className="space-y-14">
              <h2 className="text-3xl font-bold text-(--color-wine-red)">Environmental & Social Commitment</h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                At Vadānya, our relationship with the earth and its keepers is foundational. We are guided by material
                integrity and time-honoured processes rather than speed or scale.
                <br />
                <br />
                By maintaining deliberately limited collections, we consciously avoid excess — allowing each piece the
                dignity it deserves while reducing pressure on artisans and natural resources.
              </p>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-muted/30 rounded-2xl border border-(--color-wine-red)/20 p-8">
                  <h3 className="mb-4 text-xl font-semibold text-(--color-wine-red)">Respect for Regional Craft</h3>

                  <ul className="text-muted-foreground space-y-3">
                    <li>✓ Source directly from origin locales</li>
                    <li>✓ Honour seasonal material cycles</li>
                    <li>✓ Preserve regional balance</li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-2xl border border-(--color-wine-red)/20 p-8">
                  <h3 className="mb-4 text-xl font-semibold text-(--color-wine-red)">Conscious Evolution</h3>

                  <ul className="text-muted-foreground space-y-3">
                    <li>✓ Sustainable materials wherever possible</li>
                    <li>✓ Minimal recyclable packaging</li>
                    <li>✓ Ongoing artisan dialogue</li>
                  </ul>
                </div>
              </div>

              <p className="text-lg text-(--color-wine-red)/80 italic">
                We choose integrity-led curation over volume-driven commerce — because true heritage cannot be mass
                produced.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
