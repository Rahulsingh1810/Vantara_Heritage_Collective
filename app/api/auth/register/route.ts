import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json()

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const passwordHash = hashPassword(password)

    const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${email}, ${name}, ${passwordHash})
      RETURNING id, email, name
    `

    // Set session cookie
    const response = NextResponse.json({ user: result[0] }, { status: 201 })
    response.cookies.set("userId", result[0].id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error: any) {
    if (error.code === "23505" || error.message?.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Email already exists. Please use a different email or sign in." },
        { status: 400 },
      )
    }
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
