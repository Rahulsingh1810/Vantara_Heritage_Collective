import type { Metadata } from 'next'
import CurationMasterDetail from './master'
import Image from 'next/image'

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
              <div className="relative h-137.5 w-full overflow-hidden rounded-2xl shadow-xl">
                <Image src="/Crafting Our Story Image.png" alt="Artisan at work" fill className="object-cover" />
              </div>

              <p className="text-lg leading-relaxed text-(--color-wine-red)">
                Vadānya Heritage Collective was conceived from an enduring belief: the most meaningful objects are
                shaped by the stories around us.
                <br />
                <br />
                To appreciate art in ways that resonate with each such tale, we looked into the historic traditions of
                colourful India. A resplendent picture arose with art unique and exquisite, leaving us mesmerised. The
                quiet strength of lineage echoed in unparalleled craftsmanship, with each artist holding a deep passion
                for the art passed down through generations.
              </p>

              <div className="relative h-137.5 w-full overflow-hidden rounded-2xl shadow-xl">
                <Image src="/traditional-indian-crafts.jpg" alt="Artisan at work" fill className="object-cover" />
              </div>

              <p className="text-lg leading-relaxed text-(--color-wine-red)">
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

              <p className="mb-6 text-lg leading-relaxed text-(--color-wine-red) italic">
                Vadānya was born from the conviction that long-standing handcrafted artefacts were more than relics of
                the past. Their stories deserved to be etched in the present and find echoes in spaces filled with
                warmth and love. In welcoming these artefacts into your space, you’re essentially gathering a piece of
                history cherished and perfected over centuries.
              </p>

              <p className="text-right font-semibold text-(--color-wine-red)">— Vadānya Heritage Collective</p>
            </div>

            {/* ENVIRONMENT */}
            <div className="space-y-10">
              <h2 className="text-center text-3xl font-bold text-(--color-wine-red)">
                Environmental & Social Commitment
              </h2>

              <p className="text-lg leading-relaxed text-(--color-wine-red)">
                At Vadānya, our relationship with the earth and its keepers is foundational. We are guided by material
                integrity and time-honoured processes rather than speed or scale.
                <br />
                <br />
                By maintaining deliberately limited collections, we consciously avoid excess — allowing each piece the
                dignity it deserves while reducing pressure on artisans and natural resources.
              </p>

              <div className="bg-muted/30 rounded-2xl border border-(--color-wine-red)/20 p-8">
                <ul className="space-y-4 text-lg text-(--color-wine-red)/75">
                  <li>✓ Guided by material integrity and traditional processes</li>
                  <li>✓ Limited collections to avoid excess and overproduction</li>
                  <li>✓ Respect for regional craft ecosystems</li>
                  <li>✓ Conscious, evolving approach to sustainability</li>
                  <li>✓ Integrity-led curation over volume-driven commerce</li>
                </ul>
              </div>

              <p className="text-center text-lg text-(--color-wine-red)/80 italic">
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
