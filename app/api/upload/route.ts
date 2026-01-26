import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const restaurant = formData.get('restaurant') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant name is required' },
        { status: 400 }
      )
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create directory path based on restaurant name
    const restaurantFolder = restaurant.toUpperCase().replace(/_/g, ' ')
    const publicPath = path.join(process.cwd(), 'public', restaurantFolder)

    // Create directory if it doesn't exist
    if (!existsSync(publicPath)) {
      await mkdir(publicPath, { recursive: true })
    }

    // Generate filename (use original filename)
    const filename = file.name
    const filePath = path.join(publicPath, filename)

    // Write file
    await writeFile(filePath, buffer)

    // Return the public URL path
    const imageUrl = `/${restaurantFolder}/${filename}`

    return NextResponse.json({
      success: true,
      imageUrl,
      message: 'File uploaded successfully'
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    )
  }
}
