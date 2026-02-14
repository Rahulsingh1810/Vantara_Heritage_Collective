import { Product, ProductsQueryResponse } from '@/type/page'
import graphQlClient from '../contentful-graphql-client'

export default async function fetchProducts() {
  const query = `
    {
      pageCollection(limit: 1) {
        items {
          productsCollection(limit: 100) {
            items {
              productId
              productTitle
              productDescription
              slug
              productImagesCollection(limit: 1) {
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
  } = await graphQlClient<{ data: ProductsQueryResponse }>(query, ['products'])

  return pageCollection?.items?.[0]?.productsCollection?.items ?? []
}
