import { ProductsQueryResponse } from '@/type/page'
import graphQlClient from '../contentful-graphql-client'

export default async function fetchProductBySlug(slug: string) {
  const query = `
    query  {
      pageCollection(limit: 1) {
        items {
          productsCollection(limit: 1, where: { slug: $slug }) {
            items {
              productId
              productTitle
              productDescription
              slug
              productStock
              productMaterial
              productImagesCollection(limit: 20) {
                items {
                  title
                  
                  description
                  url
                  height
                  width
                }
              }
              productCulturalSignificance
              productCategory
              productCare
              vendor {
                vendorName
                vendorLocation
                vendorDescription
              }
              productPrice
              productStock
              productWeight
              productDimensions
              productCulturalSignificance
              productCare
              placementsAndStylingNotes
              inYourSpace
              productOrigin
            }
          }
        }
      }
    }
  `

  const {
    data: { pageCollection }
  } = await graphQlClient<{ data: ProductsQueryResponse }>(query.replace('$slug', `"${slug}"`), [`product-${slug}`])

  return pageCollection?.items?.[0]?.productsCollection?.items?.[0] ?? null
}
