import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import MenuItem from '@/models/MenuItem'

// GET single menu item by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const menuItem = await MenuItem.findById(id)

    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      menuItem,
    })
  } catch (error: any) {
    console.error('Fetch menu item error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch menu item' },
      { status: 500 }
    )
  }
}

// PATCH - Update menu item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const body = await request.json()
    const { id } = await params

    const menuItem = await MenuItem.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      menuItem,
    })
  } catch (error: any) {
    console.error('Update menu item error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update menu item' },
      { status: 500 }
    )
  }
}

// DELETE - Delete menu item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const menuItem = await MenuItem.findByIdAndDelete(id)

    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Menu item deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete menu item error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete menu item' },
      { status: 500 }
    )
  }
}
