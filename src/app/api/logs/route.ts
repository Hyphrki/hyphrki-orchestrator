import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const logPath = join(process.cwd(), 'logs', 'combined.log')
    
    try {
      const logContent = await readFile(logPath, 'utf-8')
      const lines = logContent.split('\n')
      const recentLines = lines.slice(-100).join('\n') // Last 100 lines
      
      return new NextResponse(recentLines, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    } catch {
      // If log file doesn't exist, return a message
      return new NextResponse('No logs available yet. Logs will appear here once the application starts.', {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to read logs',
      message: (error as Error).message
    }, { status: 500 })
  }
}
