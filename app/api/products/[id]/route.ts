import { sql } from '@/lib/db'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const products = await sql`SELECT * FROM products WHERE id = ${Number.parseInt(id)}`

    if (products.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(products[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, price, category_id, vendor_id, image_url, stock_quantity } = body

    const result = await sql`
      UPDATE products SET name = ${name}, description = ${description}, price = ${price}, category_id = ${category_id}, vendor_id = ${vendor_id}, image_url = ${image_url}, stock_quantity = ${stock_quantity}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${Number.parseInt(id)}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await sql`DELETE FROM products WHERE id = ${Number.parseInt(id)}`
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
