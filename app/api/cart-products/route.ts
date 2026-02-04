import { NextRequest, NextResponse } from 'next/server'
import getProductsBySlugs from '@/utils/queries/getProductsBySlugs'

export async function POST(req: NextRequest) {
  try {
    const { slugs } = await req.json()

    if (!Array.isArray(slugs)) {
      return NextResponse.json({ error: 'Invalid slugs' }, { status: 400 })
    }

    const products = await getProductsBySlugs(slugs)

    return NextResponse.json(products)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
