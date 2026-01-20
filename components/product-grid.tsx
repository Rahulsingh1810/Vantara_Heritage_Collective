'use client'
import ProductCardEnhanced from '@/components/product-card-enhanced'
import { motion } from 'framer-motion'

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCardEnhanced product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
