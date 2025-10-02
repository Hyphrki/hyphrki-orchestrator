import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get authorization token from request headers
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Fetch users from the API gateway
    const response = await fetch('https://api.hyprki.com/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Failed to fetch users from API gateway:', response.status, response.statusText)
      // Return mock data for development if API gateway is not available
      return NextResponse.json([
        {
          id: 'user-1',
          email: 'demo@hyphrki.com',
          name: 'Demo User',
          role: 'user',
          status: 'active',
          emailVerified: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
      ])
    }

    const users = await response.json()
    return NextResponse.json(users)

  } catch (error) {
    console.error('Error fetching users:', error)
    // Return mock data for development
    return NextResponse.json([
      {
        id: 'user-1',
        email: 'demo@hyphrki.com',
        name: 'Demo User',
        role: 'user',
        status: 'active',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }
    ])
  }
}
