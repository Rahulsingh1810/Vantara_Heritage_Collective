"use client"

import type React from "react"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

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
  material = "Traditional Handcrafted",
  dimensions = "Varies",
  weight = "Varies",
  origin = "India",
  cultureSignificance = "This artifact represents generations of traditional Indian craftsmanship and cultural heritage.",
  careInstructions = "Handle with care. Clean gently with a dry cloth. Avoid direct sunlight for extended periods.",
}: ProductDetailsSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    specs: true,
    significance: false,
    care: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const Section = ({
    title,
    sectionKey,
    children,
  }: {
    title: string
    sectionKey: string
    children: React.ReactNode
  }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full py-4 flex items-center justify-between hover:bg-muted/50 transition-colors duration-300 px-2"
      >
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${expandedSections[sectionKey] ? "rotate-180" : ""}`}
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4 text-muted-foreground animate-fade-in-up">{children}</div>
      )}
    </div>
  )

  return (
    <div className="space-y-6 mt-12">
      <div className="bg-card rounded-xl p-6 border border-border">
        {/* Specifications */}
        <Section title="📋 Product Specifications" sectionKey="specs">
          <div className="grid grid-cols-2 gap-4">
            {category && (
              <div>
                <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Category</p>
                <p className="text-foreground">{category}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Material</p>
              <p className="text-foreground">{material}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Dimensions</p>
              <p className="text-foreground">{dimensions}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Weight</p>
              <p className="text-foreground">{weight}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Origin</p>
              <p className="text-foreground">{origin}</p>
            </div>
          </div>
        </Section>

        {/* Cultural Significance */}
        <Section title="🏛️ Cultural Significance" sectionKey="significance">
          <p className="leading-relaxed text-sm">{cultureSignificance}</p>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-2">Artisan Heritage</p>
            <p className="text-xs text-muted-foreground">
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
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/30">
        <div className="flex gap-4 items-start">
          <div className="text-3xl">🇮🇳</div>
          <div>
            <p className="font-semibold text-foreground mb-1">Authentic Indian Heritage</p>
            <p className="text-sm text-muted-foreground">
              Every piece in our collection is carefully curated to ensure authenticity and support traditional artisans
              across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
