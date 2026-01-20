import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const order = await Order.findById(id)

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error: any) {
    console.error('Fetch order error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const body = await request.json()
    const { status } = body

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'completed', 'cancelled']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Update order
    const updateData: any = {}
    if (status) {
      updateData.status = status
      // Set completedAt timestamp when marking as completed
      if (status === 'completed') {
        updateData.completedAt = new Date()
      }
    }

    const order = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error: any) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const order = await Order.findByIdAndDelete(id)

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete order error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete order' },
      { status: 500 }
    )
  }
}
