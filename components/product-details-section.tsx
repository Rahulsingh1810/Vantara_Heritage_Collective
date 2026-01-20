'use client'

import type React from 'react'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface ProductDetailsSectionProps {
  category?: string
  material?: string
  dimensions?: string
  weight?: string
  origin?: string
  cultureSignificance?: string
  careInstructions?: string
}

export default function ProductDetailsSection({
  category,
  material = 'Traditional Handcrafted',
  dimensions = 'Varies',
  weight = 'Varies',
  origin = 'India',
  cultureSignificance = 'This artifact represents generations of traditional Indian craftsmanship and cultural heritage.',
  careInstructions = 'Handle with care. Clean gently with a dry cloth. Avoid direct sunlight for extended periods.'
}: ProductDetailsSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    specs: true,
    significance: false,
    care: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const Section = ({
    title,
    sectionKey,
    children
  }: {
    title: string
    sectionKey: string
    children: React.ReactNode
  }) => (
    <div className="border-border border-b last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="hover:bg-muted/50 flex w-full items-center justify-between px-2 py-4 transition-colors duration-300"
      >
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections[sectionKey] ? 'rotate-180' : ''}`}
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="text-muted-foreground animate-fade-in-up px-4 pb-4">{children}</div>
      )}
    </div>
  )

  return (
    <div className="mt-12 space-y-6">
      <div className="bg-card border-border rounded-xl border p-6">
        {/* Specifications */}
        <Section title="📋 Product Specifications" sectionKey="specs">
          <div className="grid grid-cols-2 gap-4">
            {category && (
              <div>
                <p className="text-primary mb-1 text-xs font-semibold tracking-wider uppercase">Category</p>
                <p className="text-foreground">{category}</p>
              </div>
            )}
            <div>
              <p className="text-primary mb-1 text-xs font-semibold tracking-wider uppercase">Material</p>
              <p className="text-foreground">{material}</p>
            </div>
            <div>
              <p className="text-primary mb-1 text-xs font-semibold tracking-wider uppercase">Dimensions</p>
              <p className="text-foreground">{dimensions}</p>
            </div>
            <div>
              <p className="text-primary mb-1 text-xs font-semibold tracking-wider uppercase">Weight</p>
              <p className="text-foreground">{weight}</p>
            </div>
            <div className="col-span-2">
              <p className="text-primary mb-1 text-xs font-semibold tracking-wider uppercase">Origin</p>
              <p className="text-foreground">{origin}</p>
            </div>
          </div>
        </Section>

        {/* Cultural Significance */}
        <Section title="🏛️ Cultural Significance" sectionKey="significance">
          <p className="text-sm leading-relaxed">{cultureSignificance}</p>
          <div className="bg-primary/10 border-primary/20 mt-4 rounded-lg border p-4">
            <p className="text-primary mb-2 text-sm font-semibold">Artisan Heritage</p>
            <p className="text-muted-foreground text-xs">
              This piece is crafted using traditional techniques passed down through generations of artisans, preserving
              the authentic cultural heritage of India.
            </p>
          </div>
        </Section>

        {/* Care Instructions */}
        <Section title="✨ Care & Maintenance" sectionKey="care">
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>{careInstructions}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Store in a cool, dry place away from moisture</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Protect from extreme temperature changes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>If needed, use a soft brush to clean intricate details</span>
            </li>
          </ul>
        </Section>
      </div>

      {/* Heritage Badge */}
      <div className="from-primary/20 to-accent/20 border-primary/30 rounded-xl border bg-gradient-to-r p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🇮🇳</div>
          <div>
            <p className="text-foreground mb-1 font-semibold">Authentic Indian Heritage</p>
            <p className="text-muted-foreground text-sm">
              Every piece in our collection is carefully curated to ensure authenticity and support traditional artisans
              across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
