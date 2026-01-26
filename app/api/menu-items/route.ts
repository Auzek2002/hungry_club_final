import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import MenuItem from '@/models/MenuItem'

// GET all menu items or filter by restaurant/section
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const restaurant = searchParams.get('restaurant')
    const section = searchParams.get('section')
    const active = searchParams.get('active')

    // Build query
    const query: any = {}
    if (restaurant) query.restaurant = restaurant
    if (section) query.section = section
    if (active !== null && active !== undefined) query.active = active === 'true'

    const menuItems = await MenuItem.find(query).sort({ restaurant: 1, section: 1, order: 1, name: 1 })

    return NextResponse.json({
      success: true,
      menuItems,
    })
  } catch (error: any) {
    console.error('Fetch menu items error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

// POST - Create new menu item
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    const menuItem = await MenuItem.create(body)

    return NextResponse.json({
      success: true,
      menuItem,
    })
  } catch (error: any) {
    console.error('Create menu item error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create menu item' },
      { status: 500 }
    )
  }
}
