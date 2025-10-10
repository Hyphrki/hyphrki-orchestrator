import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Upload, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/utils/cn'

interface Agent {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  version: string
  publicationStatus: 'draft' | 'published' | 'unpublished'
  pricingTier: 'free' | 'basic' | 'pro' | 'enterprise'
  createdAt: string
  updatedAt: string
  publishedAt?: string
  totalDeployments: number
  createdBy: {
    id: string
    name: string
    email: string
  }
}

interface AgentListPageProps {
  className?: string
}

export function AgentListPage({ className }: AgentListPageProps) {
  const navigate = useNavigate()
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [pricingFilter, setPricingFilter] = useState<string>('all')

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/agents')
      
      if (!response.ok) {
        throw new Error('Failed to fetch agents')
      }
      
      const data = await response.json()
      setAgents(data.agents || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents')
    } finally {
      setLoading(false)
    }
  }

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || agent.publicationStatus === statusFilter
    const matchesCategory = categoryFilter === 'all' || agent.category === categoryFilter
    const matchesPricing = pricingFilter === 'all' || agent.pricingTier === pricingFilter
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPricing
  })

  const getStatusBadge = (status: Agent['publicationStatus']) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      published: { label: 'Published', className: 'bg-green-100 text-green-800' },
      unpublished: { label: 'Unpublished', className: 'bg-red-100 text-red-800' }
    }
    
    const config = statusConfig[status]
    return (
      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', config.className)}>
        {config.label}
      </span>
    )
  }

  const getPricingBadge = (tier: Agent['pricingTier']) => {
    const tierConfig = {
      free: { label: 'Free', className: 'bg-blue-100 text-blue-800' },
      basic: { label: 'Basic', className: 'bg-purple-100 text-purple-800' },
      pro: { label: 'Pro', className: 'bg-orange-100 text-orange-800' },
      enterprise: { label: 'Enterprise', className: 'bg-red-100 text-red-800' }
    }
    
    const config = tierConfig[tier]
    return (
      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', config.className)}>
        {config.label}
      </span>
    )
  }

  const handlePublish = async (agentId: string, isBreakingUpdate: boolean = false) => {
    try {
      const response = await fetch(`/api/marketplace/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agentId,
          isBreakingUpdate
        })
      })

      if (!response.ok) {
        throw new Error('Failed to publish agent')
      }

      // Refresh agents list
      await fetchAgents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish agent')
    }
  }

  const handleUnpublish = async (agentId: string) => {
    try {
      const response = await fetch(`/api/marketplace/unpublish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agentId })
      })

      if (!response.ok) {
        throw new Error('Failed to unpublish agent')
      }

      // Refresh agents list
      await fetchAgents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unpublish agent')
    }
  }

  const handleDelete = async (agentId: string) => {
    if (!confirm('Are you sure you want to delete this agent? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete agent')
      }

      // Refresh agents list
      await fetchAgents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete agent')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading agents...</div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
          <p className="text-gray-600 mt-2">
            Manage your N8N workflow agents and publish them to the marketplace
          </p>
        </div>
        <Button onClick={() => navigate('/agents/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
                <SelectItem value="data-processing">Data Processing</SelectItem>
                <SelectItem value="integration">Integration</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={pricingFilter} onValueChange={setPricingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pricing</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Agents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {agent.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(agent.publicationStatus)}
                  {getPricingBadge(agent.pricingTier)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {agent.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {agent.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{agent.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Version {agent.version}</span>
                  <span>{agent.totalDeployments} deployments</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/agents/${agent.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/agents/${agent.id}/edit`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>

                  <div className="flex space-x-1">
                    {agent.publicationStatus === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePublish(agent.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {agent.publicationStatus === 'published' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnpublish(agent.id)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(agent.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {agents.length === 0 ? 'No agents created yet' : 'No agents match your filters'}
            </h3>
            <p className="text-gray-600 mb-4">
              {agents.length === 0 
                ? 'Create your first agent by uploading an N8N workflow'
                : 'Try adjusting your search criteria or filters'
              }
            </p>
            {agents.length === 0 && (
              <Button onClick={() => navigate('/agents/create')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Agent
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
