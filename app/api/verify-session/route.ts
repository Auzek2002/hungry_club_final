import { NextRequest, NextResponse } from 'next/server'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Verify payment was successful
    if (session.payment_status === 'paid') {
      // Get order data from metadata
      const orderData = JSON.parse(session.metadata.orderData)
      const compactCartItems = JSON.parse(session.metadata.cartItems || '[]')

      // Expand compact cart items
      const cartItems = compactCartItems.map((item: any) => ({
        name: item.n,
        price: item.p,
        quantity: item.q,
        description: item.d || '',
        image: '',
      }))

      return NextResponse.json({
        verified: true,
        paymentStatus: session.payment_status,
        orderData: orderData,
        cartItems: cartItems,
        amountTotal: session.amount_total,
        customerEmail: session.customer_details?.email,
      })
    } else {
      return NextResponse.json({
        verified: false,
        paymentStatus: session.payment_status,
      })
    }
  } catch (error: any) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify session' },
      { status: 500 }
    )
  }
}
