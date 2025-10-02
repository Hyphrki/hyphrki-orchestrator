import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET() {
  try {
    // Check database connection
    const dbHealth = await db.healthCheck()
    
    // Check application status
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: dbHealth.status,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }

    // If database is unhealthy, mark overall status as degraded
    if (dbHealth.status !== 'healthy') {
      health.status = 'degraded'
    }

    return NextResponse.json(health, { 
      status: health.status === 'healthy' ? 200 : 503 
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: (error as Error).message
    }, { status: 503 })
  }
}
