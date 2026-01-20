import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import type { Metadata } from 'next'
import AddToCartButton from '@/components/add-to-cart-button'
import ProductImageGallery from '@/components/product-image-gallery'
import ProductDetailsSection from '@/components/product-details-section'

import fetchProductBySlug from '@/utils/queries/slugpage' // or wherever fetchProductBySlug lives now
// If you renamed it to fetchProductByProductId earlier → change the name here

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  // ── Fetch here ──
  const product = await fetchProductBySlug(slug) // ← using slug or id — match your field

  return {
    title: product ? `${product.productTitle} - The Heritage Collective` : 'Product Not Found',
    description: product?.productDescription?.substring(0, 160) || ''
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // ── Fetch here ──
  const data = await fetchProductBySlug(slug)

  // Map to shape your components expect
  // const product = {
  //   id: cfProduct.slug || slug,
  //   name: cfProduct.productTitle || "Unnamed Product",
  //   description: cfProduct.productDescription || "",
  //   image_url:
  //     cfProduct.productImagesCollection?.items?.[0]?.url ||
  //     "/traditional-indian-artifact.jpg",
  //   image_urls: cfProduct.productImagesCollection?.items?.map((item: any) => item.url) || [],
  //   price: Number.parseFloat(String(cfProduct.productPrice || "0")) || 0,
  //   stock_quantity: 999,
  // }

  // const vendor = cfProduct.vendor || {
  //   vendorName: "Heritage Artisan",
  //   vendorDescription: "",
  //   vendorLocation: "India",
  // }

  // const primaryImage = product.image_url

  // rest of your JSX remains the same...

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="py-20 text-center">Loading product details...</div>}>
        {/* Breadcrumb */}
        <div className="bg-card border-border sticky top-0 z-40 border-b">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/products"
              className="text-primary hover:text-accent flex items-center gap-2 font-medium transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </div>

        <section className="bg-background py-8 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="animate-slide-in-left">
                <ProductImageGallery product={data ?? ({} as any)} />
              </div>

              <div className="animate-fade-in-up flex flex-col space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
                    {data?.productCategory}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-primary text-primary h-4 w-4" />
                    ))}
                    <span className="text-muted-foreground ml-2 text-sm">(42 reviews)</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-foreground mb-4 text-5xl leading-tight font-bold text-balance md:text-6xl">
                    {data?.productTitle}
                  </h1>
                  <p className="text-muted-foreground text-lg">{data?.productDescription}</p>
                </div>

                {data?.vendor && (
                  <div className="bg-card border-border rounded-xl border p-6 transition-shadow duration-300 hover:shadow-lg">
                    <p className="text-muted-foreground mb-1 text-sm">Crafted by</p>
                    <h3 className="text-foreground mb-2 text-xl font-bold">{data.vendor.vendorName}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{data.vendor.vendorDescription}</p>
                    <div className="border-border mt-4 border-t pt-4">
                      <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                        {data.vendor.vendorLocation}
                      </p>
                    </div>
                  </div>
                )}

                <div className="from-primary/5 to-accent/5 border-primary/20 rounded-xl border bg-gradient-to-r p-8">
                  <div className="mb-6 flex items-baseline gap-4">
                    <span className="text-primary text-5xl font-bold">₹{data?.productPrice.toFixed(2)}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-lg font-semibold ${
                        data?.productStock && data?.productStock > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {data?.productStock && data?.productStock > 0 ? `${data?.productStock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <AddToCartButton
                      product={data ?? ({} as any)}
                      disabled={!data?.productStock || data.productStock === 0}
                      className="w-full px-6 py-3 text-lg"
                    />

                    {data?.productStock === 0 && (
                      <p className="text-muted-foreground bg-muted rounded-lg p-4 text-center text-sm">
                        This item is currently out of stock. Please check back soon or inquire for custom orders.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border-border rounded-lg border p-4 text-center">
                    <p className="mb-1 text-2xl">✓</p>
                    <p className="text-primary text-xs font-semibold uppercase">Authentic</p>
                    <p className="text-muted-foreground text-xs">Verified Original</p>
                  </div>
                  <div className="bg-card border-border rounded-lg border p-4 text-center">
                    <p className="mb-1 text-2xl">🚚</p>
                    <p className="text-primary text-xs font-semibold uppercase">Secure Shipping</p>
                    <p className="text-muted-foreground text-xs">Insured Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            <ProductDetailsSection
              category={data?.productCategory}
              material={data?.productMaterial}
              cultureSignificance={data?.productCulturalSignificance}
              careInstructions={data?.productCare}
            />
          </div>
        </section>

        <section className="bg-card border-border border-t py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-foreground mb-4 text-4xl font-bold">Discover More Treasures</h2>
            <p className="text-muted-foreground mb-12">Explore our curated collection of authentic Indian artifacts</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="from-primary/10 to-accent/10 border-primary/20 flex min-h-64 flex-col items-center justify-center rounded-xl border bg-gradient-to-br p-8 text-center">
                <p className="mb-4 text-4xl">🎨</p>
                <p className="text-muted-foreground">More items from this collection coming soon...</p>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  )
}
