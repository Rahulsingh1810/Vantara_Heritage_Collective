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
import fetchProducts, { fetchProductBySlug } from '@/utils/queries/page'

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
      {/* Hero Section Animated */}
      <HeroSectionAnimated />

      <section className="from-background via-primary/5 to-background relative overflow-hidden bg-gradient-to-b py-20 md:py-32">
        <div className="bg-primary/10 absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up mb-16 text-center">
            <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold">
              Heritage Collection
            </span>
            <h2 className="mb-4 text-4xl font-bold text-balance md:text-5xl">Discover Authentic Indian Artifacts</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Experience the beauty of traditional craftsmanship passed down through generations
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: 'Hand-Crafted', desc: 'Made with traditional techniques', icon: '🎨' },
              { title: 'Artisan Quality', desc: 'Direct from master craftspeople', icon: '👨‍🎨' },
              { title: 'Authentic Stories', desc: 'Each piece has a unique heritage', icon: '📖' }
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-background border-border hover:border-primary animate-fade-in-up rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-125">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Slider Section */}
      <section className="bg-background overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-balance md:text-4xl">Featured Collections</h2>
              <p className="text-muted-foreground">Explore our curated selection of authentic heritage pieces</p>
            </div>
            <Link href="/products" className="hidden md:inline">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <FeaturedProductsSlider products={featuredProducts} />

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
            <h2 className="mb-3 text-3xl font-bold text-balance md:text-4xl">Meet Our Master Artisans</h2>
            <p className="text-muted-foreground text-lg">
              Supporting traditional craftspeople and preserving heritage crafts
            </p>
          </div>

          <FeaturedVendors />
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-accent text-accent-foreground py-16 md:py-24">
        <StatsCounter />
      </section>

      <section className="from-background to-primary/5 relative overflow-hidden bg-gradient-to-b py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="animate-fade-in-up">
              <h2 className="mb-6 text-4xl font-bold">The Art of Tradition</h2>
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
            <div className="from-primary/20 to-accent/20 animate-float relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br">
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
          <h2 className="animate-fade-in-up mb-12 text-center text-3xl font-bold text-balance md:text-4xl">
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
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialsSlider />
        </div>
      </section>

      <section className="from-primary via-accent to-primary relative overflow-hidden bg-gradient-to-r py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-white mix-blend-multiply blur-xl filter" />
          <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-white mix-blend-multiply blur-xl filter" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up mb-4 text-3xl font-bold text-white md:text-4xl">Have Questions?</h2>
          <p className="mb-8 text-lg text-white/90">
            Get in touch with our team for custom orders, wholesale inquiries, or artisan collaborations
          </p>
          <button
            onClick={() => setShowContactPopup(true)}
            className="text-primary rounded-lg bg-white px-8 py-3 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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
