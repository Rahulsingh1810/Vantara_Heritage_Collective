import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category_id, vendor_id, image_url, stock_quantity } = body

    if (!name || !price || !category_id || !vendor_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const categoryCheck = await sql`SELECT id FROM categories WHERE id = ${category_id}`
    if (categoryCheck.length === 0) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 })
    }

    const vendorCheck = await sql`SELECT id FROM vendors WHERE id = ${vendor_id}`
    if (vendorCheck.length === 0) {
      return NextResponse.json({ error: "Invalid vendor ID" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO products (name, description, price, category_id, vendor_id, image_url, stock_quantity)
      VALUES (${name}, ${description}, ${price}, ${category_id}, ${vendor_id}, ${image_url}, ${stock_quantity})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
