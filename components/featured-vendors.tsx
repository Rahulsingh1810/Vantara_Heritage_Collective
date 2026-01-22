'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Vendor {
  id: string
  name: string
  description: string
  image_url: string
}

export default function FeaturedVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('/api/vendors')
        const data = await response.json()
        // Get only first 6 vendors for featured section
        setVendors(Array.isArray(data) ? data.slice(0, 6) : [])
      } catch (error) {
        console.error('Failed to fetch vendors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-muted h-80 animate-pulse rounded-xl" />
        ))}
      </div>
    )
  }

  if (vendors.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No vendors available at the moment</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {vendors.map(vendor => (
        <motion.div
          key={vendor.id}
          variants={itemVariants}
          className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl"
        >
          {/* Background Image */}
          <div className="from-primary/20 to-accent/20 absolute inset-0 bg-gradient-to-br">
            {vendor.image_url && (
              <img
                src={vendor.image_url || '/placeholder.svg'}
                alt={vendor.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50" />

          {/* Artisan Badge */}
          <div className="bg-primary/90 absolute top-4 right-4 rounded-full px-3 py-1 text-sm font-semibold text-white transition-transform duration-300 group-hover:scale-110">
            ✨ Master Artisan
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="group-hover:text-primary mb-2 text-2xl font-bold transition-colors">{vendor.name}</h3>
              <p className="mb-3 line-clamp-2 text-sm text-white/80 transition-all group-hover:line-clamp-none">
                {vendor.description}
              </p>
              <div className="text-primary flex items-center gap-2 font-semibold transition-all group-hover:gap-3">
                <span>View Collection</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover Border */}
          <div className="border-primary/0 group-hover:border-primary/50 absolute inset-0 rounded-2xl border-2 transition-all duration-300" />
        </motion.div>
      ))}
    </motion.div>
  )
}
