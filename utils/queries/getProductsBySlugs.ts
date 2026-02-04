import graphQlClient from '../contentful-graphql-client'
import { ProductsQueryResponse } from '@/type/page'

export default async function getProductsBySlugs(slugs: string[]) {
  const slugFilter = slugs.map(slug => `"${slug}"`).join(',')

  const query = `
    query {
      productCollection(where: { slug_in: [${slugFilter}] }, limit: ${slugs.length}) {
        items {
          productId
          slug
          productTitle
          productPrice
          productStock
          productImagesCollection(limit: 1) {
            items {
              url
            }
          }
        }
      }
    }
  `

  const { data } = await graphQlClient<{ data: any }>(query, ['cart-products'])

  return data.productCollection.items
}
