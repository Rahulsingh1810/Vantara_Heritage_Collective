'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductShowcaseCarousel from '@/components/product-showcase-carousel'
import FAQSection from '@/components/faq-section'
import ContactFormPopup from '@/components/contact-form-popup'
import { useState } from 'react'
import HeroSectionVideo from '@/components/hero-section-video'

const featuredProducts = [
  {
    id: 'products',
    name: 'All Products',
    slug: '/products',
    description: 'Bespoke artefacts from traditional ateliers',
    image_url: '/All Products - Thumbnail.jpg'
  },
  {
    id: 'signature-pieces',
    name: 'Signature Pieces',
    slug: '/signature-pieces',
    description: 'Defining aesthetics with icons of lineage.',
    image_url: '/Signature Pieces - Thumbnail.jpg'
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    slug: '/best-sellers',
    description: 'Heirlooms with enduring admiration.',
    image_url: '/Bestsellers - Thumbnail.jpg'
  }
]

export default function Page() {
  const [showContactPopup, setShowContactPopup] = useState(false)

  return (
    <>
      <HeroSectionVideo />
      {/* ================= SECTION 1 — CRAFTING OUR STORY ================= */}
      <section className="bg-(--color-ivory) py-24">
        <div className="mx-auto max-w-7xl px-4">
          {/* Brand Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-3 text-4xl font-extrabold text-(--color-wine-red) md:text-5xl">
              Vadānya Heritage Collective
            </h1>
            <h2 className="text-lg font-semibold tracking-wide text-(--color-wine-red)/80">
              Regal Tradition. Timeless Curation.
            </h2>
          </div>

          {/* Story Layout */}
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-(--color-wine-red)">Crafting Our Story</h3>

              <p className="mb-6 text-(--color-wine-red)/70">
                Vadānya Heritage Collective is an homage to art that endures. Born from a deep regard for India’s living
                craft traditions, we curate artefacts shaped by hand, guided by geography, and refined through
                generations of artistic devotion. Each piece echoes a legacy imprinted by the rhythm of practiced hands,
                the patience of process, and the wisdom of time-honoured techniques. Our quest is to capture the essence
                of GI-tagged artefacts by situating them in lived and experienced spaces. Let’s celebrate heritage art
                as an enduring phenomenon of experience.
              </p>
            </div>

            <img
              src="/Crafting Our Story Image.png"
              alt="Crafting Our Story Image"
              className="h-90 w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 — FEATURED COLLECTION ================= */}
      <section className="bg-background py-16 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-3 text-3xl font-bold text-(--color-wine-red)">Featured Collections</h2>

          <ProductShowcaseCarousel products={featuredProducts} />
          <Link href="/products">
            <Button variant="outline" className="mt-8 border-(--color-wine-red) text-(--color-ivory)">
              Step into heritage
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= SECTION 3 — KNOW THE LEGACY ================= */}
      <section className="bg-(--color-ivory) py-12 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h3 className="mb-4 text-2xl font-bold text-(--color-wine-red)">Know the Legacy</h3>
          <p className="text-lg text-(--color-wine-red)/70">Discover the intricate craftsmanship of master artisans</p>
        </div>
      </section>

      {/* ================= SECTION 4 — TRANSFORMING SPACES ================= */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h4 className="mb-12 text-xl font-semibold tracking-wide text-(--color-wine-red)">Transforming Spaces</h4>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { label: 'Statement Walls', slug: 'statement-walls' },
              { label: 'Vignette Shelves', slug: 'vignette-shelves' },
              { label: 'Elegant Surfaces', slug: 'elegant-surfaces' },
              { label: 'Soulful Landscapes', slug: 'soulful-landscapes' }
            ].map(item => (
              <Link key={item.slug} href={`/transforming-spaces/${item.slug}`} className="group relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-(--color-wine-red)/20 opacity-0 blur-xl transition group-hover:opacity-100" />

                {/* Circle button */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-(--color-wine-red) text-center text-xs font-semibold tracking-wide text-(--color-ivory) shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl md:h-32 md:w-32 md:text-sm">
                  <span className="px-3 leading-tight">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 5 — FAQ ================= */}
      <section className="bg-(--color-ivory) py-16">
        <div className="mx-auto max-w-7xl px-4">
          <FAQSection />
        </div>
      </section>

      {/* ================= SECTION 6 — CTA ================= */}
      <section className="relative overflow-hidden bg-(--color-wine-red) py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-4xl font-bold text-(--color-ivory) md:text-5xl">Have Questions?</h2>

          <p className="mx-auto mb-10 max-w-xl text-lg text-(--color-ivory)/80">
            Get in touch for queries or to simply chat!
          </p>

          <button
            onClick={() => setShowContactPopup(true)}
            className="group relative overflow-hidden rounded-xl bg-(--color-ivory) px-10 py-4 font-semibold text-(--color-wine-red) shadow-xl transition-all hover:scale-105"
          >
            <span className="relative z-10">Start a Conversation</span>
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>
      </section>

      {showContactPopup && <ContactFormPopup />}
    </>
  )
}
