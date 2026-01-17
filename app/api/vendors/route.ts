import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const vendors = await sql`SELECT * FROM vendors ORDER BY name`
    return NextResponse.json(vendors)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, image_url } = body

    const result = await sql`
      INSERT INTO vendors (name, description, image_url)
      VALUES (${name}, ${description}, ${image_url})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 })
  }
}
