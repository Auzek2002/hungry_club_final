import { NextRequest, NextResponse } from 'next/server'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderData, totalPrice, cartItems } = body

    console.log('Creating Stripe session with:', { orderData, totalPrice, cartItemsCount: cartItems?.length })

    // Store order data in a temporary collection or use client_reference_id
    // For now, we'll pass minimal data in metadata and reconstruct from localStorage on success page

    // Create compact metadata (Stripe has 500 char limit per value)
    const compactOrderData = {
      fullName: orderData.fullName,
      email: orderData.email,
      phone: orderData.phone,
      deliveryType: orderData.deliveryType,
      streetAddress: orderData.streetAddress,
      city: orderData.city,
      postalCode: orderData.postalCode,
      timeOption: orderData.timeOption,
      scheduledTime: orderData.scheduledTime,
      remarks: orderData.remarks,
      paymentMethod: orderData.paymentMethod,
      totalPrice: totalPrice,
    }

    // Compact cart items - just names and quantities
    const compactCartItems = cartItems.map((item: any) => ({
      n: item.name,
      p: item.price,
      q: item.quantity,
    }))

    const metadataOrderData = JSON.stringify(compactOrderData)
    const metadataCartItems = JSON.stringify(compactCartItems)

    console.log('Metadata sizes:', {
      orderData: metadataOrderData.length,
      cartItems: metadataCartItems.length,
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Hungry Club Order',
              description: `${orderData.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} order`,
            },
            unit_amount: Math.round(parseFloat(totalPrice.replace(',', '.')) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cart`,
      metadata: {
        orderData: metadataOrderData,
        cartItems: metadataCartItems,
        totalPrice: totalPrice,
      },
    })

    console.log('Stripe session created successfully:', session.id)
    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe session error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      raw: error.raw,
    })
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
