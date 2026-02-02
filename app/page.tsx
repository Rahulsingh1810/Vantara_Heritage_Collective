'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FeaturedProductsSlider from '@/components/featured-products-slider'
import StatsCounter from '@/components/stats-counter'
import ProductShowcaseCarousel from '@/components/product-showcase-carousel'
import FAQSection from '@/components/faq-section'
import TestimonialsSlider from '@/components/testimonials-slider'
import HeroSectionAnimated from '@/components/hero-section-animated'
import FeaturedVendors from '@/components/featured-vendors'
import ContactFormPopup from '@/components/contact-form-popup'
import { useState } from 'react'
import HeroSectionVideo from '@/components/hero-section-video'
import fetchProducts from '@/utils/queries/page'

const featuredProducts = [
  // Sample featured products data
  { id: 1, name: 'Product 1', image: '/path/to/image1.jpg' },
  { id: 2, name: 'Product 2', image: '/path/to/image2.jpg' },
  { id: 3, name: 'Product 3', image: '/path/to/image3.jpg' },
  { id: 4, name: 'Product 4', image: '/path/to/image4.jpg' }
]

export default async function Page() {
  const [showContactPopup, setShowContactPopup] = useState(false)
  // const data = await fetchProducts();

  // console.log("Fetched Products:", data);

  // const products = await fetchProductBySlug("Vase-rahul");
  // console.log("products",products);

  return (
    <>
      {/* Home Page / Landing Page Content */}
      <section className="from-background via-primary/5 to-background relative overflow-hidden bg-gradient-to-b py-16 md:py-24">
        <div className="bg-primary/10 absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Visual Asset 1: Logo */}
          {/* <img
            src="/logo.png"
            alt="Vadānya Heritage Collective Logo"
            className="mx-auto mb-6 h-20 w-20 object-contain"
          /> */}

          {/* <HeroSectionVideo /> */}
          {/* Company Name + Tagline */}
          <h1 className="mb-2 text-4xl font-extrabold text-[var(--color-wine-red)] md:text-5xl">
            Vadānya Heritage Collective
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-[var(--color-wine-red)]/80 md:text-2xl">
            Regal Tradition. Timeless Curation.
          </h2>
          {/* Brief Intro */}
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg font-medium">
            Premium heritage decor curated from enduring cultural traditions.
          </p>
          {/* Crafting Our Story */}
          <div className="text-foreground mx-auto mb-8 max-w-3xl text-left text-base md:text-center">
            <h3 className="mb-2 text-2xl font-bold text-[var(--color-wine-red)]">Crafting Our Story</h3>
            <p className="mb-4">
              Vadānya Heritage Collective is an homage to art that endures.
              <br />
              Born from a deep regard for India’s living craft traditions, we curate artefacts shaped by hand, guided by
              geography, and refined through generations of artistic devotion. Each piece echoes a legacy imprinted by
              the rhythm of practiced hands, the patience of process, and the wisdom of time-honoured techniques.
            </p>
            <p className="mb-4">
              Our quest is to capture the essence of GI-tagged artefacts by situating them in lived and experienced
              spaces. Let’s celebrate heritage art as an enduring phenomenon of experience.
            </p>
          </div>
          {/* Transforming Spaces */}
          {/* Transforming Spaces */}
          <div className="mx-auto max-w-3xl text-center">
            <h4 className="mb-6 text-xl font-semibold text-[var(--color-wine-red)]">Transforming Spaces</h4>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {['Statement Walls', 'Vignette Shelves', 'Elegant Surfaces', 'Soulful Landscapes'].map(label => (
                <div
                  key={label}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-wine-red)] bg-[var(--color-wine-red)] text-center text-sm font-medium text-[var(--color-ivory)] shadow-sm transition-transform hover:scale-105 md:h-25 md:w-25 md:text-base"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section Animated */}
      {/* <HeroSectionAnimated /> */}
      {/* ...existing code... */}

      {/* Featured Products Slider Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up mb-12 flex flex-col items-center justify-center">
            <h2 className="mb-3 text-center text-3xl font-bold text-balance text-[var(--color-wine-red)] md:text-4xl">
              Featured Collections
            </h2>
            <p className="text-muted-foreground text-center">
              Explore our curated selection of authentic heritage pieces
            </p>
            <Link href="/products" className="mt-4">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <ProductShowcaseCarousel products={featuredProducts.slice(0, 4)} />

          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button>View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="from-primary/5 via-background to-accent/5 bg-gradient-to-r py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold text-balance text-[var(--color-wine-red)] md:text-4xl">
              Know the Legacy
            </h2>
            <p className="text-muted-foreground text-lg">Discover the intricate craftsmanship of master artisans</p>
          </div>

          {/* <FeaturedVendors /> */}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-[var(--color-wine-red)] py-16 text-[var(--color-ivory)] md:py-24">
        <StatsCounter />
      </section>

      <section className="from-background to-primary/5 relative overflow-hidden bg-gradient-to-b py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="animate-fade-in-up">
              <h2 className="mb-6 text-4xl font-bold text-[var(--color-wine-red)]">The Art of Tradition</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Each artifact in our collection represents centuries of cultural heritage and skilled craftsmanship. Our
                mission is to preserve these traditions while supporting artisan communities.
              </p>
              <ul className="space-y-4">
                {[
                  'Ethically sourced from master craftspeople',
                  'Preserving traditional art forms',
                  'Supporting local communities'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="from-primary/20 to-accent/20 relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br">
              <img
                src="/traditional-indian-crafts.jpg"
                alt="Artisan craftsmanship"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Carousel */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up mb-12 text-center text-3xl font-bold text-balance text-[var(--color-wine-red)] md:text-4xl">
            Artisan Stories
          </h2>
          <ProductShowcaseCarousel products={featuredProducts.slice(0, 4)} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="from-background via-primary/5 to-background bg-gradient-to-b py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="bg---colour-wine-red py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialsSlider />
        </div>
      </section>

      <section className="from-primary via-accent to-primary relative overflow-hidden bg-[var(--color-wine-red)] py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-white mix-blend-multiply blur-xl filter" />
          <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-white mix-blend-multiply blur-xl filter" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up mb-4 text-3xl font-bold text-white md:text-4xl">Have Questions?</h2>
          <p className="mb-8 text-lg text-white/90">Get in touch for queries or to simply chat!</p>
          <button
            onClick={() => setShowContactPopup(true)}
            className="rounded-lg bg-[var(--color-wine-red)] px-8 py-3 font-bold text-[var(--color-ivory)] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Start a Conversation
          </button>
        </div>
      </section>

      {/* Contact Popup */}
      {showContactPopup && <ContactFormPopup onClose={() => setShowContactPopup(false)} />}
    </>
  )
}
