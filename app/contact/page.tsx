import type { Metadata } from 'next'
import ContactForm from '@/components/contact-form'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Contact Us - Vadānya Heritage Collective',
  description: 'Get in touch with us for inquiries, support, or partnership opportunities.'
}

export default function Contact() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-(--color-wine-red) py-16 text-(--color-ivory) md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Get in Touch</h1>
          <p className="text-lg opacity-90 md:text-xl">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          {/* Info Cards */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                icon: Mail,
                title: 'Email',
                main: 'info@vadanyaheritage.in',
                sub: 'We respond within 24 hours'
              },
              {
                icon: Phone,
                title: 'Phone',
                main: '+91 7259311212',
                sub: 'Monday – Saturday, 9AM – 6PM IST'
              },
              {
                icon: MapPin,
                title: 'Address',
                main: 'No. 33, 2nd Cross, SBM Colony',
                sub: 'Brindavan Nagar, Mathikere, Bengaluru – 560054'
              }
            ].map((item, i) => (
              <Card key={i} className="border border-(--color-wine-red)/15 bg-(--color-ivory) shadow-md">
                <CardContent className="p-8 text-center">
                  <item.icon className="mx-auto mb-4 h-10 w-10 text-(--color-wine-red)" />
                  <h3 className="mb-2 text-lg font-semibold text-(--color-wine-red)">{item.title}</h3>
                  <p className="text-(--color-wine-red)">{item.main}</p>
                  <p className="mt-2 text-sm text-(--color-wine-red)/70">{item.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Form */}
          <div className="mx-auto max-w-2xl">
            <Card className="border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-lg">
              <CardContent className="p-10">
                <h2 className="mb-6 text-2xl font-bold text-(--color-wine-red)">Send us a Message</h2>

                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
