import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import AddToCartButton from '@/components/add-to-cart-button'
import ProductImageGallery from '@/components/product-image-gallery'
import ProductDetailsSection from '@/components/product-details-section'
import fetchProductBySlug from '@/utils/queries/slugpage'
import { Product } from '@/type/page'
import fetchProducts from '@/utils/queries/page'

// Deduplicate across generateMetadata + page render
const getProduct = cache(fetchProductBySlug)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  return {
    title: product ? `${product.productTitle} - Vandanya Heritage Collective` : 'Product Not Found',
    description: product?.productDescription?.substring(0, 160) || ''
  }
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const products = await fetchProducts()

  return products.map(product => ({
    slug: product.slug
  }))
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getProduct(slug)

  if (!data) notFound()

  return (
    <main className="bg-background min-h-screen">
      {/* Sticky breadcrumb */}
      <div className="sticky top-0 z-40 border-b border-(--color-wine-red)/20 bg-(--color-wine-red)">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-medium text-(--color-ivory) hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Main */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            {/* Gallery */}
            <ProductImageGallery product={data ?? ({} as Product)} />

            {/* Product Info */}
            <div className="flex flex-col space-y-8">
              {/* Title + description */}
              <div>
                <h1 className="mb-4 text-4xl leading-tight font-bold text-(--color-wine-red) md:text-5xl">
                  {data.productTitle}
                </h1>

                <p className="text-lg leading-relaxed text-(--color-wine-red)/70">{data.productDescription}</p>
              </div>

              {/* Price box */}
              <div className="rounded-2xl border border-(--color-wine-red)/20 bg-(--color-ivory) p-8 shadow-sm">
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <span className="text-4xl font-bold text-(--color-wine-red)">₹{data.productPrice.toFixed(2)}</span>
                </div>

                <AddToCartButton
                  product={data ?? ({} as Product)}
                  disabled={!data.productStock || data.productStock === 0}
                  className="w-full rounded-xl px-6 py-3 text-lg"
                />

                {data.productStock === 0 && (
                  <p className="mt-4 rounded-lg bg-(--color-wine-red)/5 p-4 text-center text-sm text-(--color-wine-red)/70">
                    This item is currently unavailable. Please check back soon or inquire for custom orders.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Details accordion */}
          <div className="mt-16">
            <ProductDetailsSection
              category={data.productCategory}
              material={data.productMaterial}
              dimensions={data.productDimensions}
              weight={data.productWeight}
              origin={data.productOrigin}
              stylingNotes={data.placementsAndStylingNotes}
              inYourSpace={data.inYourSpace}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
