import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY name`
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
