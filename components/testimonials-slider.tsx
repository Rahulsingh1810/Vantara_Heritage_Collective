'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Interior Designer',
    content:
      "The quality and authenticity of these artifacts transformed my client's living space. Each piece tells a beautiful story of cultural heritage.",
    rating: 5,
    image: '👩‍💼'
  },
  {
    name: 'Marcus Johnson',
    role: 'Art Collector',
    content:
      "I've been collecting traditional artifacts for years, and Vandanya Heritage Collective offers the finest pieces I've encountered. Highly recommended!",
    rating: 5,
    image: '👨‍💼'
  },
  {
    name: 'Anjali Patel',
    role: 'Home Enthusiast',
    content:
      "Not only are the products beautiful, but knowing I'm supporting traditional artisans makes every purchase meaningful. Exceptional service!",
    rating: 5,
    image: '👩‍🦱'
  },
  {
    name: 'David Chen',
    role: 'Gallery Owner',
    content:
      'The craftsmanship is unparalleled. My customers absolutely love these pieces, and the ethical sourcing aligns perfectly with our values.',
    rating: 5,
    image: '👨‍🦲'
  },
  {
    name: 'Fatima Al-Mansouri',
    role: 'Cultural Enthusiast',
    content:
      'Each artifact arrived in perfect condition and with detailed information about its origins. A truly premium shopping experience!',
    rating: 5,
    image: '👩‍🦳'
  }
]

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const next = () => {
    setCurrent(prev => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const prev = () => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  return (
    <section className="bg-card border-border border-t py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance text-[var(--color-wine-red)] md:text-4xl">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied customers who love our heritage artifacts
          </p>
        </div>

        <div className="relative">
          {/* Testimonial */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-background border-border rounded-lg border p-8 text-center md:p-12"
          >
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="fill-primary text-primary h-5 w-5" />
              ))}
            </div>

            <p className="mb-8 text-xl font-medium text-balance italic md:text-2xl">
              "{testimonials[current].content}"
            </p>

            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">{testimonials[current].image}</span>
              <div className="text-left">
                <p className="text-lg font-semibold">{testimonials[current].name}</p>
                <p className="text-muted-foreground">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={prev} variant="outline" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setIsAutoPlay(false)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? 'bg-primary w-8' : 'bg-border w-2'
                  }`}
                />
              ))}
            </div>
            <Button onClick={next} variant="outline" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
