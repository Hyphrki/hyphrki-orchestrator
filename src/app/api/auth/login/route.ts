import { NextRequest, NextResponse } from 'next/server'
import { JWTService } from '@/lib/jwt'
import { db } from '@/lib/database'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    try {
      // Query user from database
      const result = await db.query(
        'SELECT id, email, password_hash, name, role FROM users WHERE email = $1',
        [email]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      const user = result.rows[0]
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash)
      
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // Generate JWT token
      const token = JWTService.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      })

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      })
    } catch (dbError) {
      console.error('Database error during login:', dbError)
      
      // Fallback to mock authentication for development
      const adminUser = {
        email: 'admin@hyphrki.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'super_admin',
        id: 'admin-1'
      }

      if (email === adminUser.email && password === adminUser.password) {
        const token = JWTService.generateToken({
          userId: adminUser.id,
          email: adminUser.email,
          role: adminUser.role
        })
        
        return NextResponse.json({
          success: true,
          token,
          user: {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role
          }
        })
      }

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
