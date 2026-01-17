"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeaturedProductsSlider from "@/components/featured-products-slider"
import StatsCounter from "@/components/stats-counter"
import ProductShowcaseCarousel from "@/components/product-showcase-carousel"
import FAQSection from "@/components/faq-section"
import TestimonialsSlider from "@/components/testimonials-slider"
import HeroSectionAnimated from "@/components/hero-section-animated"
import FeaturedVendors from "@/components/featured-vendors"
import ContactFormPopup from "@/components/contact-form-popup"
import { useState } from "react"

const featuredProducts = [
  // Sample featured products data
  { id: 1, name: "Product 1", image: "/path/to/image1.jpg" },
  { id: 2, name: "Product 2", image: "/path/to/image2.jpg" },
  { id: 3, name: "Product 3", image: "/path/to/image3.jpg" },
  { id: 4, name: "Product 4", image: "/path/to/image4.jpg" },
]

export default function Page() {
  const [showContactPopup, setShowContactPopup] = useState(false)

  return (
    <>
      {/* Hero Section Animated */}
      <HeroSectionAnimated />

      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
              Heritage Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Discover Authentic Indian Artifacts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the beauty of traditional craftsmanship passed down through generations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Hand-Crafted", desc: "Made with traditional techniques", icon: "🎨" },
              { title: "Artisan Quality", desc: "Direct from master craftspeople", icon: "👨‍🎨" },
              { title: "Authentic Stories", desc: "Each piece has a unique heritage", icon: "📖" },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-background border border-border rounded-2xl hover:border-primary hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Slider Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 animate-fade-in-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Featured Collections</h2>
              <p className="text-muted-foreground">Explore our curated selection of authentic heritage pieces</p>
            </div>
            <Link href="/products" className="hidden md:inline">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <FeaturedProductsSlider products={featuredProducts} />

          <div className="text-center mt-8 md:hidden">
            <Link href="/products">
              <Button>View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Meet Our Master Artisans</h2>
            <p className="text-muted-foreground text-lg">
              Supporting traditional craftspeople and preserving heritage crafts
            </p>
          </div>

          <FeaturedVendors />
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <StatsCounter />
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6">The Art of Tradition</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Each artifact in our collection represents centuries of cultural heritage and skilled craftsmanship. Our
                mission is to preserve these traditions while supporting artisan communities.
              </p>
              <ul className="space-y-4">
                {[
                  "Ethically sourced from master craftspeople",
                  "Preserving traditional art forms",
                  "Supporting local communities",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden animate-float">
              <img
                src="/traditional-indian-crafts.jpg"
                alt="Artisan craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Carousel */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-balance animate-fade-in-up">
            Artisan Stories
          </h2>
          <ProductShowcaseCarousel products={featuredProducts.slice(0, 4)} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsSlider />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">Have Questions?</h2>
          <p className="text-white/90 text-lg mb-8">
            Get in touch with our team for custom orders, wholesale inquiries, or artisan collaborations
          </p>
          <button
            onClick={() => setShowContactPopup(true)}
            className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
