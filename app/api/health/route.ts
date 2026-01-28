import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

// Health check endpoint - used by UptimeRobot to prevent cold starts
// Ping this endpoint every 5 minutes to keep the serverless function warm
export async function GET() {
  try {
    const startTime = Date.now()

    // Connect to database (warms the connection)
    await connectDB()

    const responseTime = Date.now() - startTime

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
    })
  } catch (error: any) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
