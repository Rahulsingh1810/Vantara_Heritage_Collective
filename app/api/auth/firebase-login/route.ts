import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import app from '@/lib/firebase-admin'
import { sql } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()
    if (!idToken) {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
    }

    const decoded = await getAuth(app).verifyIdToken(idToken)
    const { uid, email, name } = decoded

    if (!email) {
      return NextResponse.json({ error: 'No email in Firebase token' }, { status: 400 })
    }

    //Find user by Firebase UID
    let users = await sql`
      SELECT id, email, name FROM users WHERE firebase_uid = ${uid}
    `
    let user

    if (users.length === 0) {
      // Create new user
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
    response.cookies.set('userId', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error('Firebase login error:', error)
    return NextResponse.json({ error: 'Failed to authenticate with Firebase' }, { status: 500 })
  }
}
