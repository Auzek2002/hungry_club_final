import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Reservation from '@/models/Reservation'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    const result = await Reservation.findByIdAndDelete(id)

    if (!result) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Reservation deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete reservation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete reservation' },
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

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      reservation,
    })
  } catch (error: any) {
    console.error('Update reservation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update reservation' },
      { status: 500 }
    )
  }
}
