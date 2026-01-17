import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid" && session.metadata?.orderId) {
      await sql`
        UPDATE orders SET status = ${"processing"}, stripe_payment_id = ${session.id} WHERE id = ${Number.parseInt(session.metadata.orderId)}
      `

      return NextResponse.json({ success: true, orderId: session.metadata.orderId })
    }

    return NextResponse.json({ error: "Payment not confirmed" }, { status: 400 })
  } catch (error) {
    console.error("Success verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
