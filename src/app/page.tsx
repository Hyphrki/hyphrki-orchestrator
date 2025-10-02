"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Bot, 
  Users, 
  Settings, 
  BarChart3, 
  Plus,
  Workflow
} from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  email: string
  name: string
  role: string
  status: string
  emailVerified: boolean
  createdAt: string
  lastLogin: string
}

export default function Home() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('orchestrator_token')
        if (token) {
          const response = await fetch('/api/users', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            setUsers(data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    if (isAuthenticated) {
      fetchUsers()
    }
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Hyphrki Orchestrator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage agent templates, monitor deployments, and oversee the platform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Instances</CardTitle>
              <Workflow className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +5 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">
                +0.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Agent Templates</span>
              </CardTitle>
              <CardDescription>
                Create, edit, and manage AI agent templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button asChild className="flex-1">
                  <Link href="/templates">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/templates">View All</Link>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• 12 published templates</p>
                <p>• 8 draft templates</p>
                <p>• 4 pending review</p>
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>
                View and manage all registered platform users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/users">
                  <Users className="h-4 w-4 mr-2" />
                  View All Users
                </Link>
              </Button>
              <div className="text-sm text-muted-foreground">
                <p>• Total users: {users?.length || 0}</p>
                <p>• Active users: {users?.filter((u: { status: string }) => u.status === 'active').length || 0}</p>
                <p>• New this month: {users?.filter((u: { createdAt: string }) => {
                  const createdAt = new Date(u.createdAt)
                  const now = new Date()
                  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
                  return createdAt >= oneMonthAgo
                }).length || 0}</p>
              </div>
            </CardContent>
          </Card>

          {/* N8N Workflow Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Workflow className="h-5 w-5" />
                <span>N8N Workflows</span>
              </CardTitle>
              <CardDescription>
                Manage workflow automation and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open('http://localhost:5678', '_blank')}
                >
                  <Workflow className="h-4 w-4 mr-2" />
                  Open N8N
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/templates/create">Create Workflow</Link>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• N8N Status: Running</p>
                <p>• Active workflows: 15</p>
                <p>• Last sync: 5 min ago</p>
              </div>
            </CardContent>
          </Card>

          {/* System Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>System Management</span>
              </CardTitle>
              <CardDescription>
                Monitor system health and manage configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/organizations">
                    <Users className="h-4 w-4 mr-2" />
                    Organizations
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Link>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• System status: Healthy</p>
                <p>• Last backup: 2 hours ago</p>
                <p>• Active users: 1,234</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest changes and deployments across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New template published</p>
                  <p className="text-xs text-muted-foreground">Lead Qualification Agent v2.1</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Template updated</p>
                  <p className="text-xs text-muted-foreground">Customer Support Bot v1.3</p>
                </div>
                <span className="text-xs text-muted-foreground">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Deployment failed</p>
                  <p className="text-xs text-muted-foreground">Email Marketing Agent</p>
                </div>
                <span className="text-xs text-muted-foreground">6 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
    } catch (error: unknown) {
      setError((error as Error).message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Hyphrki Orchestrator</CardTitle>
          <CardDescription>
            Admin portal for managing AI agent templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                placeholder="admin@hyphrki.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 p-3 text-xs text-muted-foreground bg-muted rounded-md">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@hyphrki.com</p>
            <p>Password: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}