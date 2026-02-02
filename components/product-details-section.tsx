'use client'

import type React from 'react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface ProductDetailsSectionProps {
  category?: string
  material?: string
  dimensions?: string
  weight?: string | number
  origin?: string
  cultureSignificance?: string
  careInstructions?: string
  stylingNotes?: string
  inYourSpace?: string
}

export default function ProductDetailsSection({
  category,
  material = 'Handcrafted with traditional techniques',
  dimensions = 'Varies by piece (please refer to images)',
  weight = 'Varies',
  origin = 'India',
  cultureSignificance = 'This piece embodies generations of skilled craftsmanship and deep cultural meaning, preserving living traditions of Indian heritage.',
  careInstructions = 'Handle gently. Dust with a soft, dry cloth. Avoid prolonged direct sunlight and moisture.',
  stylingNotes,
  inYourSpace
}: ProductDetailsSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    specs: true,
    significance: false,
    care: false,
    styling: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const Section = ({
    title,
    icon,
    sectionKey,
    children
  }: {
    title: string
    icon?: string
    sectionKey: string
    children: React.ReactNode
  }) => (
    <div className="border-b border-[var(--color-wine-red)]/20 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex w-full items-center justify-between px-1 py-4 text-left transition-colors hover:bg-[var(--color-wine-red)]/5"
        aria-expanded={expandedSections[sectionKey]}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="text-lg font-semibold text-[var(--color-wine-red)]">{title}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-[var(--color-wine-red)] transition-transform duration-300 ${
            expandedSections[sectionKey] ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expandedSections[sectionKey] && (
        <div className="animate-fade-in px-1 pt-1 pb-5 text-[var(--color-wine-red)]/80">{children}</div>
      )}
    </div>
  )

  return (
    <div className="mt-12 md:mt-16">
      <div className="overflow-hidden rounded-xl border border-[var(--color-wine-red)]/25 bg-[var(--color-ivory)]/70 shadow-sm backdrop-blur-sm">
        {/* Specifications */}
        <Section title="Product Specifications" sectionKey="specs" icon="📋">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {category && (
              <div>
                <dt className="text-xs font-semibold tracking-wide text-[var(--color-wine-red)]/70 uppercase">
                  Category
                </dt>
                <dd className="mt-1 text-[var(--color-wine-red)]">{category}</dd>
              </div>
            )}

            <div>
              <dt className="text-xs font-semibold tracking-wide text-[var(--color-wine-red)]/70 uppercase">
                Material
              </dt>
              <dd className="mt-1 text-[var(--color-wine-red)]">{material}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold tracking-wide text-[var(--color-wine-red)]/70 uppercase">
                Dimensions
              </dt>
              <dd className="mt-1 text-[var(--color-wine-red)]">{dimensions}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold tracking-wide text-[var(--color-wine-red)]/70 uppercase">Weight</dt>
              <dd className="mt-1 text-[var(--color-wine-red)]">{weight}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold tracking-wide text-[var(--color-wine-red)]/70 uppercase">Origin</dt>
              <dd className="mt-1 text-[var(--color-wine-red)]">{origin}</dd>
            </div>
          </div>
        </Section>

        {/* Cultural Significance */}
        <Section title="Cultural & Historical Significance" sectionKey="significance" icon="🏛️">
          <p className="text-sm leading-relaxed">{cultureSignificance}</p>

          <div className="mt-5 rounded-lg border border-[var(--color-wine-red)]/15 bg-[var(--color-wine-red)]/5 p-5">
            <p className="mb-2 font-medium text-[var(--color-wine-red)]">Artisan Heritage Note</p>
            <p className="text-sm text-[var(--color-wine-red)]/80">
              Handcrafted using time-honored techniques passed down through generations, supporting living cultural
              traditions.
            </p>
          </div>
        </Section>

        {/* Care Instructions */}
        <Section title="Care & Maintenance" sectionKey="care" icon="✨">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[var(--color-wine-red)]">•</span>
              <span>{careInstructions}</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[var(--color-wine-red)]">•</span>
              <span>Keep away from direct sunlight and high humidity</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[var(--color-wine-red)]">•</span>
              <span>Store in a stable, dry environment</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[var(--color-wine-red)]">•</span>
              <span>Use soft tools only for cleaning detailed areas</span>
            </li>
          </ul>
        </Section>

        {/* Optional: Styling & Placement Notes */}
        {(stylingNotes || inYourSpace) && (
          <Section title="Styling & Placement Ideas" sectionKey="styling" icon="🪔">
            {stylingNotes && <p className="mb-4 text-sm leading-relaxed">{stylingNotes}</p>}
            {inYourSpace && (
              <div className="rounded-lg border border-[var(--color-wine-red)]/15 bg-[var(--color-wine-red)]/5 p-5">
                <p className="mb-2 font-medium text-[var(--color-wine-red)]">In Your Space</p>
                <p className="text-sm text-[var(--color-wine-red)]/80">{inYourSpace}</p>
              </div>
            )}
          </Section>
        )}
      </div>

      {/* Heritage badge / trust element */}
      <div className="mt-8 rounded-xl border border-[var(--color-wine-red)]/20 bg-gradient-to-br from-[var(--color-ivory)] to-white/80 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-3xl">🇮🇳</div>
          <div>
            <p className="mb-1.5 font-semibold text-[var(--color-wine-red)]">Authentic Indian Heritage</p>
            <p className="text-sm leading-relaxed text-[var(--color-wine-red)]/75">
              Each piece is thoughtfully sourced to honor and sustain traditional craftsmanship across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
