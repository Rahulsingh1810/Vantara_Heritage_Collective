import { sql } from '@/lib/db'
import { type NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { name, phone, address, city, state, zip } = await request.json()

    const result = await sql`
      UPDATE users 
      SET name = ${name}, phone = ${phone}, address = ${address}, city = ${city}, state = ${state}, zip = ${zip}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${Number.parseInt(userId)}
      RETURNING id, email, name, phone, address, city, state, zip
    `

    return NextResponse.json({ user: result[0] })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
