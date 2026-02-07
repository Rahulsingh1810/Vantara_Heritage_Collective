'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import StatsCounter from '@/components/stats-counter'
import ProductShowcaseCarousel from '@/components/product-showcase-carousel'
import FAQSection from '@/components/faq-section'
import TestimonialsSlider from '@/components/testimonials-slider'
import ContactFormPopup from '@/components/contact-form-popup'
import { useState } from 'react'

const featuredProducts = [
  { id: 1, name: 'Product 1', image: '/traditional-indian-crafts.jpg' },
  { id: 2, name: 'Product 2', image: '/traditional-bedroom-decor.jpg' },
  { id: 3, name: 'Product 3', image: '/traditional-home-office.jpg' },
  { id: 4, name: 'Product 4', image: '/traditional-entryway-decor.jpg' }
]

export default function Page() {
  const [showContactPopup, setShowContactPopup] = useState(false)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-(--color-ivory) py-20">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-(--color-wine-red) md:text-5xl">
            Vadānya Heritage Collective
          </h1>

          <h2 className="mb-6 text-xl font-semibold text-(--color-wine-red)/80">Regal Tradition. Timeless Curation.</h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-(--color-wine-red)/70">
            Premium heritage decor curated from enduring cultural traditions.
          </p>

          <h3 className="mb-4 text-2xl font-bold text-(--color-wine-red)">Crafting Our Story</h3>

          <p className="mx-auto mb-8 max-w-3xl text-(--color-wine-red)/75">
            Vadānya Heritage Collective is an homage to art that endures. Born from a deep regard for India’s living
            craft traditions, we curate artefacts shaped by hand, guided by geography, and refined through generations.
          </p>

          <div className="mx-auto max-w-3xl text-center">
            <h4 className="mb-8 text-xl font-semibold tracking-wide text-(--color-wine-red)">Transforming Spaces</h4>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {['Statement Walls', 'Vignette Shelves', 'Elegant Surfaces', 'Soulful Landscapes'].map(label => (
                <div key={label} className="group relative">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full bg-(--color-wine-red)/20 opacity-0 blur-xl transition group-hover:opacity-100" />

                  {/* Circle */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-(--color-wine-red) text-center text-xs font-semibold tracking-wide text-(--color-ivory) shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl md:h-32 md:w-32 md:text-sm">
                    <span className="px-3 leading-tight">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-3 text-3xl font-bold text-(--color-wine-red)">Featured Collections</h2>
          <p className="mb-8 text-(--color-wine-red)/70">Explore curated heritage pieces</p>

          <ProductShowcaseCarousel products={featuredProducts} />

          <Link href="/products">
            <Button variant="outline" className="mt-8 border-(--color-wine-red) text-(--color-wine-red)">
              View All
            </Button>
          </Link>
        </div>
      </section>

      {/* STATS */}
      {/* <section className="bg-(--color-wine-red) py-20 text-(--color-ivory)">
        <StatsCounter />
      </section> */}

      {/* ART OF TRADITION */}
      <section className="bg-(--color-ivory) py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-4xl font-bold text-(--color-wine-red)">The Art of Tradition</h2>

            <p className="mb-6 text-(--color-wine-red)/70">
              Each artifact represents centuries of craftsmanship and cultural legacy.
            </p>

            <ul className="space-y-3 text-(--color-wine-red)/80">
              <li>✓ Ethically sourced</li>
              <li>✓ Preserving art forms</li>
              <li>✓ Supporting artisans</li>
            </ul>
          </div>

          <img src="/traditional-indian-crafts.jpg" className="rounded-3xl object-cover shadow-xl" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="bg-[var(--color-wine-red)] py-24">
        <div className="mx-auto max-w-7xl px-4">
          <TestimonialsSlider />
        </div>
      </section> */}

      {/* FAQ */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FAQSection />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-(--color-wine-red) py-32">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Subtle grain */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          {/* <span className="mb-4 inline-block text-sm tracking-widest text-(--color-ivory)/70 uppercase">
            Let’s Talk Heritage
          </span> */}

          <h2 className="mb-6 text-4xl leading-tight font-bold text-(--color-ivory) md:text-5xl">Have Questions?</h2>

          <p className="mx-auto mb-10 max-w-xl text-lg text-(--color-ivory)/80">
            Get in touch for queries or to simply chat!
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA */}
            <button
              onClick={() => setShowContactPopup(true)}
              className="group relative overflow-hidden rounded-xl bg-(--color-ivory) px-10 py-4 font-semibold text-(--color-wine-red) shadow-xl transition-all hover:scale-105"
            >
              <span className="relative z-10">Start a Conversation</span>

              {/* Hover sheen */}
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            {/* Secondary soft CTA */}
            {/* <span className="text-sm text-(--color-ivory)/70">Typically replies within 24 hours</span> */}
          </div>

          {/* Decorative divider */}
          <div className="mx-auto mt-14 h-px w-32 bg-(--color-ivory)/30" />
        </div>
      </section>

      {showContactPopup && <ContactFormPopup />}
    </>
  )
}
