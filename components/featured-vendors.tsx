"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

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
        const response = await fetch("/api/vendors")
        const data = await response.json()
        // Get only first 6 vendors for featured section
        setVendors(Array.isArray(data) ? data.slice(0, 6) : [])
      } catch (error) {
        console.error("Failed to fetch vendors:", error)
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
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No vendors available at the moment</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {vendors.map((vendor) => (
        <motion.div
          key={vendor.id}
          variants={itemVariants}
          className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20">
            {vendor.image_url && (
              <img
                src={vendor.image_url || "/placeholder.svg"}
                alt={vendor.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />

          {/* Artisan Badge */}
          <div className="absolute top-4 right-4 bg-primary/90 px-3 py-1 rounded-full text-sm font-semibold text-white group-hover:scale-110 transition-transform duration-300">
            ✨ Master Artisan
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{vendor.name}</h3>
              <p className="text-white/80 text-sm line-clamp-2 group-hover:line-clamp-none transition-all mb-3">
                {vendor.description}
              </p>
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                <span>View Collection</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-all duration-300" />
        </motion.div>
      ))}
    </motion.div>
  )
}
