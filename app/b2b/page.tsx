'use client'

import type React from 'react'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Check, Package, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function B2BPage() {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    employees: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('B2B form submitted:', formData)
    setFormData({ company: '', email: '', phone: '', employees: '', message: '' })
    alert('Thank you! We will contact you shortly.')
  }

  const pricingTiers = [
    {
      name: 'Starter',
      minOrder: '10+',
      discount: '10%',
      features: ['Minimum 10 units', 'Dedicated support', 'Custom packaging']
    },
    {
      name: 'Growth',
      minOrder: '50+',
      discount: '15%',
      features: ['Minimum 50 units', 'Priority support', 'Custom branding', 'Flexible payment terms']
    },
    {
      name: 'Enterprise',
      minOrder: '500+',
      discount: '25%',
      features: ['Minimum 500 units', '24/7 support', 'Custom solutions', 'Direct account manager']
    }
  ]

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="from-primary to-accent bg-[var(--color-wine-red)] py-20 text-[var(--color-ivory)] md:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 text-5xl font-bold md:text-6xl"
          >
            Wholesale Solutions for Your Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-xl opacity-90 md:text-2xl"
          >
            Partner with Vandanya Heritage Collective for authentic traditional artifacts
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Button size="lg" className="bg-background text-primary hover:bg-background/90">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-[var(--color-wine-red)]">
            Why Choose Our B2B Program?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Package, title: 'Bulk Discounts', desc: 'Up to 25% off on wholesale orders' },
              { icon: Users, title: 'Dedicated Support', desc: 'Personal account manager for your business' },
              { icon: TrendingUp, title: 'Growth Partners', desc: 'We grow when you grow' },
              { icon: Check, title: 'Flexible Terms', desc: 'Custom payment and delivery options' }
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}>
                <Card className="hover:border-primary h-full transition-colors">
                  <CardContent className="pt-8 text-center">
                    <item.icon className="mx-auto mb-4 h-12 w-12 text-[var(--color-ivory)]" />
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-[var(--color-ivory)]/80">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-[var(--color-wine-red)]">Wholesale Pricing Tiers</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className={`h-full border-2 ${i === 1 ? 'border-primary' : 'border-border'}`}>
                  <CardHeader className="from-primary/10 to-accent/10 bg-gradient-to-br">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <p className="mt-2 text-sm text-[var(--color-ivory)]/80">Orders of {tier.minOrder} units</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-primary mb-6 text-4xl font-bold">{tier.discount} Off</div>
                    <ul className="mb-6 space-y-3">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <Check className="text-primary h-5 w-5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Learn More</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-4xl font-bold text-[var(--color-wine-red)]">Register Your Business</h2>
          <p className="text-muted-foreground mb-12 text-center">
            Join hundreds of retailers and wholesalers already partnering with us
          </p>

          <Card className="border-primary border-2">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    required
                    className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Number of Employees</label>
                  <select
                    value={formData.employees}
                    onChange={e => setFormData({ ...formData, employees: e.target.value })}
                    required
                    className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1-10</option>
                    <option value="10-50">10-50</option>
                    <option value="50-100">50-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="border-border focus:ring-primary w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold">Have Questions?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Our B2B team is ready to help you find the perfect partnership solution
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
