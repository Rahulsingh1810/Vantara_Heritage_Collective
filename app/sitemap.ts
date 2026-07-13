import { MetadataRoute } from 'next'
import fetchProducts from '@/utils/queries/page'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts()

  const productEntries: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `https://vadanyaheritage.in/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  return [
    {
      url: 'https://vadanyaheritage.in',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://vadanyaheritage.in/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://vadanyaheritage.in/our-story',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://vadanyaheritage.in/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5
    },
    ...productEntries
  ]
}
