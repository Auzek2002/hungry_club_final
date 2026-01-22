import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Reservation from '@/models/Reservation'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, phone, date, time, guests } = body

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Retry logic to handle potential duplicate key errors from race conditions
    const maxRetries = 3
    let lastError: any = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Create reservation in database
        const reservation = await Reservation.create({
          name,
          email,
          phone,
          date,
          time,
          guests: parseInt(guests),
          status: 'confirmed',
        })

        return NextResponse.json({
          success: true,
          reservationId: reservation._id,
          reservationNumber: reservation.reservationNumber,
          message: 'Reservation confirmed successfully',
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
    console.error('Reservation creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create reservation' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const date = searchParams.get('date')
    const limit = parseInt(searchParams.get('limit') || '50')

    const query: any = {}
    if (status) query.status = status
    if (date) query.date = date

    const reservations = await Reservation.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)

    return NextResponse.json({
      success: true,
      reservations,
    })
  } catch (error: any) {
    console.error('Fetch reservations error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reservations' },
      { status: 500 }
    )
  }
}
