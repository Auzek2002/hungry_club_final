import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import MenuItem from '@/models/MenuItem'

// This is a one-time migration endpoint to populate the database
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Check if items already exist
    const existingCount = await MenuItem.countDocuments()
    if (existingCount > 0) {
      return NextResponse.json({
        success: false,
        message: `Database already has ${existingCount} menu items. Clear the collection first if you want to re-migrate.`,
      })
    }

    const { items } = await request.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      )
    }

    // Insert all items
    const result = await MenuItem.insertMany(items)

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${result.length} menu items`,
      count: result.length,
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to migrate menu items' },
      { status: 500 }
    )
  }
}

// DELETE endpoint to clear all menu items (use with caution!)
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const result = await MenuItem.deleteMany({})

    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} menu items`,
      deletedCount: result.deletedCount,
    })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete menu items' },
      { status: 500 }
    )
  }
}
