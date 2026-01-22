import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const {
      orderData,
      totalPrice,
      cartItems,
      paymentStatus = 'pending',
      stripeSessionId,
    } = body

    // Parse total price (convert from "25,50" to 25.50)
    const totalAmount = parseFloat(totalPrice.replace(',', '.'))

    // Clean cart items - store essential data (name, price, quantity, description for customizations)
    const cleanedItems = (cartItems || []).map((item: any) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description || '',
    }))

    // Retry logic to handle potential duplicate key errors from race conditions
    const maxRetries = 3
    let lastError: any = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Create order in database
        const order = await Order.create({
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
          paymentStatus: paymentStatus,
          stripeSessionId: stripeSessionId,
          totalAmount: totalAmount,
          currency: 'EUR',
          items: cleanedItems,
          status: paymentStatus === 'paid' ? 'confirmed' : 'pending',
        })

        return NextResponse.json({
          success: true,
          orderId: order._id,
          orderNumber: order.orderNumber,
        })
      } catch (error: any) {
        lastError = error
        // If it's a duplicate key error, retry with a small delay
        if (error.code === 11000 && attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)))
          continue
        }
        // If it's not a duplicate key error or we've exhausted retries, throw
        throw error
      }
    }

    throw lastError
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    const query = status ? { status } : {}
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)

    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (error: any) {
    console.error('Fetch orders error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
