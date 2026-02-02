import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Vandanya Heritage Collective',
  description: 'Get in touch with us for inquiries, support, or partnership opportunities.'
}

export default function Contact() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[var(--color-wine-red)] py-16 text-[var(--color-ivory)] md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold text-balance md:text-5xl">Get in Touch</h1>
          <p className="text-lg text-balance opacity-90 md:text-xl">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Info Cards */}
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">To be created</p>
                <p className="text-muted-foreground mt-2 text-sm">We respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">+91 7259311212</p>
                <p className="text-muted-foreground mt-2 text-sm">Monday – Saturday, 9AM – 6PM IST</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-semibold">Address</h3>
                <p className="text-muted-foreground">No. 33, 2nd Cross, SBM Colony</p>
                <p className="text-muted-foreground text-sm">
                  Brindavan Nagar, Mathikere,
                  <br />
                  Bengaluru – 560054
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-bold">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      className="border-border focus:ring-primary w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                  </div>

                  <Button size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">What is your return policy?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day return policy on most items. Products must be in their original condition with all
                  packaging intact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">How long does shipping take?</h3>
                <p className="text-muted-foreground">
                  Domestic orders typically ship within 3-5 business days. International orders may take 10-20 business
                  days depending on destination.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">Are all items authentic?</h3>
                <p className="text-muted-foreground">
                  Yes, every artifact in our collection is verified for authenticity and comes with documentation of its
                  origin and craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">Can I become a vendor?</h3>
                <p className="text-muted-foreground">
                  We're always looking for talented artisans and craftspeople. Please contact us at
                  partnerships@heritagecollective.com to discuss opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
