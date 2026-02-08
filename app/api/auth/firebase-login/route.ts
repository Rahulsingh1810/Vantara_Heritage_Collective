import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()
    if (!idToken) {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
    }

    // Verify Firebase ID token
    const decoded = await adminAuth.verifyIdToken(idToken)
    const { uid, email, name } = decoded

    if (!email) {
      return NextResponse.json({ error: 'No email in Firebase token' }, { status: 400 })
    }

    // Ensure user exists in DB
    const users = await sql`
      SELECT id, email, name FROM users WHERE firebase_uid = ${uid}
    `

    let user
    if (users.length === 0) {
      const result = await sql`
        INSERT INTO users (firebase_uid, email, name)
        VALUES (${uid}, ${email}, ${name || ''})
        RETURNING id, email, name
      `
      user = result[0]
    } else {
      user = users[0]
    }

    const response = NextResponse.json({ user }, { status: 200 })

    // 🍪 Store ONLY Firebase UID in cookie
    response.cookies.set('session', uid, {
      httpOnly: true,
      secure: false, // localhost dev
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error('Firebase login error:', error)
    return NextResponse.json({ error: 'Failed to authenticate with Firebase' }, { status: 500 })
  }
}
