import type { Metadata } from 'next'
import CurationMasterDetail from './master'
import Image from 'next/image'

export const dynamic = 'force-static'

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
              <div className="relative h-90 w-full overflow-hidden rounded-2xl shadow-xl sm:h-96 md:h-[30rem] lg:h-[45rem]">
                <div className="block h-full w-full md:hidden">
                  <Image
                    src="/feat-products-hero/Landing Page/about page/Our Story Image on Landing Page - Mobile.jpg"
                    alt="Artisan at work"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden h-full w-full md:block">
                  <Image
                    src="/feat-products-hero/Landing Page/about page/Our Story Image on Landing Page - Website.jpg"
                    alt="Artisan at work"
                    fill
                    className="object-cover"
                  />
                </div>
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

              <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl sm:h-96 md:h-[30rem] lg:h-[45rem]">
                <Image src="/Crafting Our Story Image 2.png" alt="Artisan at work" fill className="object-fit" />
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
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl sm:h-96 md:h-full md:min-h-[400px]">
                <div className="block h-full w-full md:hidden">
                  <Image
                    src="/feat-products-hero/Landing Page/about page/Founder Image - Mobile.png"
                    alt="Founder Note"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden h-full w-full md:block">
                  <Image
                    src="/feat-products-hero/Landing Page/about page/Founder Image - Website.png"
                    alt="Founder Note"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex h-full flex-col justify-center rounded-3xl border border-(--color-wine-red)/20 bg-linear-to-br from-(--color-ivory) to-white p-10 shadow-lg">
                <h2 className="mb-6 text-3xl font-bold text-(--color-wine-red)">A Note from the Collective</h2>

                <p className="mb-6 text-lg leading-relaxed text-(--color-wine-red) italic">
                  Vadānya was born from the conviction that long-standing handcrafted artefacts were more than relics of
                  the past. Their stories deserved to be etched in the present and find echoes in spaces filled with
                  warmth and love. In welcoming these artefacts into your space, you’re essentially gathering a piece of
                  history cherished and perfected over centuries.
                </p>

                <p className="mt-auto text-right font-semibold text-(--color-wine-red)">
                  — Vadānya Heritage Collective
                </p>
              </div>
            </div>

            {/* ENVIRONMENT */}
            <div className="space-y-10">
              <h2 className="text-center text-3xl font-bold text-(--color-wine-red)">
                Environmental & Social Commitment
              </h2>

              <p className="text-lg leading-relaxed text-(--color-wine-red)">
                At Vadānya, tradition translates to sustainability. Our products are all sourced with a conscientious
                approach, encouraged by us and imbued by our artisans alike. From ensuring effective use of byproducts
                to biodegradable packaging, we always strive to infuse sustainability in all our endeavours.
              </p>

              <div className="bg-muted/30 rounded-2xl border border-(--color-wine-red)/20 p-8">
                <ul className="space-y-4 text-lg text-(--color-wine-red)/75">
                  <li>
                    ✓ Each artefact is crafted using natural materials, honouring time-tested, bountiful traditions
                    rooted in the land.
                  </li>
                  <li>
                    ✓ Production processes are carefully managed so that byproducts are reused, repurposed, or treated
                    resourcefully wherever possible.
                  </li>
                  <li>
                    ✓ All packaging is paper-based and fully recyclable, reducing plastic use and environmental impact.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
