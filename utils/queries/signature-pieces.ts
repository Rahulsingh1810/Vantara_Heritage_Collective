// utils/queries/signature-pieces.ts  (or keep in page.ts if you prefer)

import { Product, ProductsQueryResponse } from '@/type/page' // adjust import path as needed
import graphQlClient from '../contentful-graphql-client'

export default async function fetchSignatureProducts() {
  const query = `
    {
      pageCollection(limit: 1) {
        items {
          productsCollection(
            limit: 100
            where: {
              featured: true
            }
          ) {
            items {
              productId
              productTitle
              bestSellers
              featured
              productOrigin
              productDescription
              slug
              productImagesCollection(limit: 3) {
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
  } = await graphQlClient<{ data: ProductsQueryResponse }>(query, ['signature-products'])

  return pageCollection?.items?.[0]?.productsCollection?.items ?? []
}
