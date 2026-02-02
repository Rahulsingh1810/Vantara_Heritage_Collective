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
      {/* Hero */}
      <section className="bg-(--color-wine-red) py-24 text-(--color-ivory)">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 text-5xl font-bold"
          >
            Wholesale Solutions for Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10 text-xl opacity-90"
          >
            Partner with Vandanya Heritage Collective for authentic traditional artifacts
          </motion.p>

          <Button size="lg" className="bg-(--color-ivory) text-(--color-wine-red) hover:bg-(--color-ivory)/90">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-(--color-wine-red)">Why Choose Our B2B Program?</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[Package, Users, TrendingUp, Check].map((Icon, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border border-(--color-wine-red)/15 bg-(--color-ivory) shadow-md">
                  <CardContent className="pt-10 text-center">
                    <Icon className="mx-auto mb-4 h-12 w-12 text-(--color-wine-red)" />
                    <h3 className="mb-2 text-xl font-bold text-(--color-wine-red)">
                      {['Bulk Discounts', 'Dedicated Support', 'Growth Partners', 'Flexible Terms'][i]}
                    </h3>
                    <p className="text-(--color-wine-red)/70">
                      {
                        [
                          'Up to 25% off wholesale',
                          'Personal account manager',
                          'We grow together',
                          'Custom payment options'
                        ][i]
                      }
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-(--color-wine-red)">Wholesale Pricing Tiers</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Card
                key={i}
                className={`border bg-(--color-ivory) shadow-lg ${
                  i === 1 ? 'border-(--color-wine-red)' : 'border-(--color-wine-red)/20'
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-(--color-wine-red)">{tier.name}</CardTitle>
                  <p className="text-sm text-(--color-wine-red)/70">Orders of {tier.minOrder}</p>
                </CardHeader>

                <CardContent>
                  <div className="mb-6 text-4xl font-bold text-(--color-wine-red)">{tier.discount} OFF</div>

                  <ul className="mb-6 space-y-3 text-sm text-(--color-wine-red)/80">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Check className="h-4 w-4" /> {f}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-(--color-wine-red) text-(--color-ivory)">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-10 text-center text-4xl font-bold text-(--color-wine-red)">Register Your Business</h2>

          <Card className="border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-xl">
            <CardContent className="space-y-6 pt-10">
              {['Company', 'Email', 'Phone'].map((label, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-(--color-wine-red)">{label}</label>
                  <input className="mt-2 w-full rounded-lg border border-(--color-wine-red)/25 bg-(--color-ivory) px-4 py-2 text-(--color-wine-red) outline-none focus:ring-2 focus:ring-(--color-wine-red)/40" />
                </div>
              ))}

              <Button size="lg" className="w-full bg-(--color-wine-red) text-(--color-ivory)">
                Submit Registration
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold text-(--color-wine-red)">Have Questions?</h2>
        <p className="mb-8 text-(--color-wine-red)/70">Our B2B team is ready to help.</p>

        <div className="flex justify-center gap-4">
          <Button className="bg-(--color-wine-red) text-(--color-ivory)">Contact Us</Button>
          <Button variant="outline" className="border-(--color-wine-red) text-(--color-wine-red)">
            Browse Products
          </Button>
        </div>
      </section>
    </main>
  )
}
