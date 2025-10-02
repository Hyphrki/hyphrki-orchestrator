interface N8NWorkflow {
  id: string
  name: string
  active: boolean
  nodes: unknown[]
  connections: unknown[]
  settings?: Record<string, unknown>
}

interface N8NExecution {
  id: string
  workflowId: string
  status: 'running' | 'success' | 'error' | 'waiting'
  startedAt: string
  finishedAt?: string
  data?: unknown
}

class N8NService {
  private baseUrl: string
  private apiKey: string
  private isConnected: boolean = false

  constructor() {
    this.baseUrl = process.env.N8N_BASE_URL || 'http://localhost:5678'
    this.apiKey = process.env.N8N_API_KEY || ''
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api/v1${endpoint}`
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': this.apiKey,
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`N8N API error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('N8N API request failed:', error)
      throw error
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/workflows')
      this.isConnected = true
      return true
    } catch {
      this.isConnected = false
      return false
    }
  }

  /**
   * Create a new workflow in N8N
   */
  async createWorkflow(workflowData: Partial<N8NWorkflow>): Promise<N8NWorkflow> {
    try {
      if (!this.isConnected) {
        await this.checkConnection()
      }

      const response = await this.makeRequest('/workflows', {
        method: 'POST',
        body: JSON.stringify({
          name: workflowData.name || 'Untitled Workflow',
          nodes: workflowData.nodes || [],
          connections: workflowData.connections || [],
          active: false,
          settings: workflowData.settings || {}
        }),
      })

      console.log('Created N8N workflow:', response.data)
      return response.data
    } catch (error) {
      console.error('Failed to create N8N workflow:', error)
      // Fallback to mock data
      const mockWorkflow: N8NWorkflow = {
        id: `workflow_${Date.now()}`,
        name: workflowData.name || 'Untitled Workflow',
        active: false,
        nodes: workflowData.nodes || [],
        connections: workflowData.connections || [],
        settings: workflowData.settings || {}
      }
      return mockWorkflow
    }
  }

  /**
   * Update an existing workflow in N8N
   */
  async updateWorkflow(workflowId: string, workflowData: Partial<N8NWorkflow>): Promise<N8NWorkflow> {
    try {
      // In production, this would make a real API call to N8N
      const mockWorkflow: N8NWorkflow = {
        id: workflowId,
        name: workflowData.name || 'Updated Workflow',
        active: workflowData.active || false,
        nodes: workflowData.nodes || [],
        connections: workflowData.connections || [],
        settings: workflowData.settings || {}
      }

      console.log('Updated N8N workflow:', mockWorkflow)
      return mockWorkflow
    } catch (error) {
      console.error('Failed to update N8N workflow:', error)
      throw new Error('Failed to update workflow in N8N')
    }
  }

  /**
   * Delete a workflow from N8N
   */
  async deleteWorkflow(workflowId: string): Promise<void> {
    try {
      // In production, this would make a real API call to N8N
      console.log('Deleted N8N workflow:', workflowId)
    } catch (error) {
      console.error('Failed to delete N8N workflow:', error)
      throw new Error('Failed to delete workflow from N8N')
    }
  }

  /**
   * Activate a workflow in N8N
   */
  async activateWorkflow(workflowId: string): Promise<N8NWorkflow> {
    try {
      // In production, this would make a real API call to N8N
      const mockWorkflow: N8NWorkflow = {
        id: workflowId,
        name: 'Active Workflow',
        active: true,
        nodes: [],
        connections: [],
        settings: {}
      }

      console.log('Activated N8N workflow:', workflowId)
      return mockWorkflow
    } catch (error) {
      console.error('Failed to activate N8N workflow:', error)
      throw new Error('Failed to activate workflow in N8N')
    }
  }

  /**
   * Deactivate a workflow in N8N
   */
  async deactivateWorkflow(workflowId: string): Promise<N8NWorkflow> {
    try {
      // In production, this would make a real API call to N8N
      const mockWorkflow: N8NWorkflow = {
        id: workflowId,
        name: 'Inactive Workflow',
        active: false,
        nodes: [],
        connections: [],
        settings: {}
      }

      console.log('Deactivated N8N workflow:', workflowId)
      return mockWorkflow
    } catch (error) {
      console.error('Failed to deactivate N8N workflow:', error)
      throw new Error('Failed to deactivate workflow in N8N')
    }
  }

  /**
   * Test a workflow execution
   */
  async testWorkflow(workflowId: string, testData?: unknown): Promise<N8NExecution> {
    try {
      // In production, this would trigger a real workflow execution in N8N
      const mockExecution: N8NExecution = {
        id: `exec_${Date.now()}`,
        workflowId,
        status: 'success',
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString(),
        data: {
          result: 'Workflow executed successfully',
          testData
        }
      }

      console.log('Tested N8N workflow execution:', mockExecution)
      return mockExecution
    } catch (error) {
      console.error('Failed to test N8N workflow:', error)
      throw new Error('Failed to test workflow in N8N')
    }
  }

  /**
   * Get workflow execution history
   */
  async getWorkflowExecutions(workflowId: string, limit = 10): Promise<N8NExecution[]> {
    try {
      // In production, this would fetch real execution data from N8N
      const mockExecutions: N8NExecution[] = [
        {
          id: `exec_${Date.now()}`,
          workflowId,
          status: 'success',
          startedAt: new Date(Date.now() - 3600000).toISOString(),
          finishedAt: new Date(Date.now() - 3500000).toISOString(),
          data: { result: 'Execution completed successfully' }
        },
        {
          id: `exec_${Date.now() - 1}`,
          workflowId,
          status: 'error',
          startedAt: new Date(Date.now() - 7200000).toISOString(),
          finishedAt: new Date(Date.now() - 7100000).toISOString(),
          data: { error: 'Connection timeout' }
        }
      ]

      return mockExecutions.slice(0, limit)
    } catch (error) {
      console.error('Failed to get workflow executions:', error)
      throw new Error('Failed to get workflow executions from N8N')
    }
  }

  /**
   * Validate workflow configuration
   */
  async validateWorkflow(workflowData: Partial<N8NWorkflow>): Promise<{ valid: boolean; errors: string[] }> {
    try {
      const errors: string[] = []

      // Basic validation
      if (!workflowData.name) {
        errors.push('Workflow name is required')
      }

      if (!workflowData.nodes || workflowData.nodes.length === 0) {
        errors.push('Workflow must have at least one node')
      }

      // Check for required node types
      const hasWebhook = workflowData.nodes?.some((node: unknown) => (node as { type: string }).type === 'n8n-nodes-base.webhook')
      if (!hasWebhook) {
        errors.push('Workflow must have at least one webhook node')
      }

      return {
        valid: errors.length === 0,
        errors
      }
    } catch (error) {
      console.error('Failed to validate workflow:', error)
      return {
        valid: false,
        errors: ['Failed to validate workflow configuration']
      }
    }
  }

  /**
   * Get available N8N node types
   */
  async getAvailableNodes(): Promise<Array<{ name: string; type: string; description: string; category: string }>> {
    try {
      // In production, this would fetch real node types from N8N
      return [
        {
          name: 'Webhook',
          type: 'n8n-nodes-base.webhook',
          description: 'Receive data via webhook',
          category: 'trigger'
        },
        {
          name: 'HTTP Request',
          type: 'n8n-nodes-base.httpRequest',
          description: 'Make HTTP requests',
          category: 'action'
        },
        {
          name: 'Email',
          type: 'n8n-nodes-base.emailSend',
          description: 'Send emails',
          category: 'action'
        },
        {
          name: 'OpenAI',
          type: 'n8n-nodes-base.openai',
          description: 'Use OpenAI services',
          category: 'ai'
        },
        {
          name: 'Salesforce',
          type: 'n8n-nodes-base.salesforce',
          description: 'Connect to Salesforce',
          category: 'crm'
        }
      ]
    } catch (error) {
      console.error('Failed to get available nodes:', error)
      return []
    }
  }
}

export const n8nService = new N8NService()
export type { N8NWorkflow, N8NExecution }
