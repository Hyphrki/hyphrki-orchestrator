const axios = require('axios')
const crypto = require('crypto')
const { Pool } = require('pg')
const Redis = require('ioredis')
const WebSocket = require('ws')
const { EncryptionService } = require('../utils/encryption')

class EnhancedN8NService {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
    
    this.redis = new Redis(process.env.REDIS_URL, {
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    })
    
    this.n8nConfig = {
      apiUrl: process.env.N8N_API_URL || 'http://localhost:5678',
      apiKey: process.env.N8N_API_KEY,
      webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook',
      timeout: 30000,
      retries: 3
    }
    
    this.wsServer = null
    this.connections = new Map()
    this.workflowCache = new Map()
    this.executionCache = new Map()
    
    this.initializeWebSocketServer()
    this.setupEventHandlers()
  }

  // Initialize WebSocket server with Redis adapter for scaling
  initializeWebSocketServer() {
    const WebSocketServer = require('ws').Server
    this.wsServer = new WebSocketServer({ 
      port: process.env.WEBSOCKET_PORT || 8080,
      path: '/ws'
    })

    this.wsServer.on('connection', (ws, req) => {
      const connectionId = crypto.randomUUID()
      const userAgent = req.headers['user-agent']
      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      
      // Store connection info
      this.connections.set(connectionId, {
        ws,
        userAgent,
        ipAddress,
        connectedAt: new Date(),
        lastPing: new Date()
      })
      
      // Send connection confirmation
      ws.send(JSON.stringify({
        type: 'connection',
        connectionId,
        timestamp: new Date().toISOString()
      }))
      
      // Handle messages
      ws.on('message', (message) => {
        this.handleWebSocketMessage(connectionId, message)
      })
      
      // Handle disconnection
      ws.on('close', () => {
        this.handleDisconnection(connectionId)
      })
      
      // Handle ping/pong for connection health
      ws.on('pong', () => {
        const connection = this.connections.get(connectionId)
        if (connection) {
          connection.lastPing = new Date()
        }
      })
    })
    
    // Ping clients every 30 seconds
    setInterval(() => {
      this.pingClients()
    }, 30000)
  }

  // Handle WebSocket messages with authentication and rate limiting
  async handleWebSocketMessage(connectionId, message) {
    try {
      const data = JSON.parse(message.toString())
      const connection = this.connections.get(connectionId)
      
      if (!connection) return
      
      // Rate limiting per connection
      const rateLimitKey = `ws_rate_limit:${connection.ipAddress}`
      const currentRequests = await this.redis.incr(rateLimitKey)
      
      if (currentRequests === 1) {
        await this.redis.expire(rateLimitKey, 60) // 1 minute window
      }
      
      if (currentRequests > 100) { // 100 requests per minute
        connection.ws.send(JSON.stringify({
          type: 'error',
          message: 'Rate limit exceeded'
        }))
        return
      }
      
      // Handle different message types
      switch (data.type) {
        case 'subscribe':
          await this.handleSubscription(connectionId, data)
          break
        case 'unsubscribe':
          await this.handleUnsubscription(connectionId, data)
          break
        case 'ping':
          connection.ws.send(JSON.stringify({ type: 'pong' }))
          break
        default:
          connection.ws.send(JSON.stringify({
            type: 'error',
            message: 'Unknown message type'
          }))
      }
      
    } catch (error) {
      console.error('WebSocket message handling error:', error)
      const connection = this.connections.get(connectionId)
      if (connection) {
        connection.ws.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format'
        }))
      }
    }
  }

  // Handle WebSocket disconnection
  handleDisconnection(connectionId) {
    const connection = this.connections.get(connectionId)
    if (connection) {
      // Log disconnection
      console.log(`WebSocket disconnected: ${connectionId}`)
      
      // Clean up subscriptions
      this.redis.del(`ws_subscriptions:${connectionId}`)
      
      // Remove connection
      this.connections.delete(connectionId)
    }
  }

  // Ping all clients to check connection health
  pingClients() {
    this.connections.forEach((connection, connectionId) => {
      if (connection.ws.readyState === WebSocket.OPEN) {
        connection.ws.ping()
        
        // Check if client responded to last ping
        const timeSinceLastPing = Date.now() - connection.lastPing.getTime()
        if (timeSinceLastPing > 60000) { // 1 minute timeout
          console.log(`Closing stale connection: ${connectionId}`)
          connection.ws.terminate()
          this.connections.delete(connectionId)
        }
      }
    })
  }

  // Broadcast message to organization with Redis pub/sub
  async broadcastToOrganization(organizationId, message) {
    try {
      const channel = `org:${organizationId}`
      await this.redis.publish(channel, JSON.stringify(message))
      
      // Also broadcast to local WebSocket connections
      this.connections.forEach((connection, connectionId) => {
        if (connection.ws.readyState === WebSocket.OPEN) {
          // Check if connection is subscribed to this organization
          this.redis.get(`ws_subscriptions:${connectionId}`).then(subscriptions => {
            if (subscriptions) {
              const subs = JSON.parse(subscriptions)
              if (subs.includes(organizationId)) {
                connection.ws.send(JSON.stringify(message))
              }
            }
          })
        }
      })
      
    } catch (error) {
      console.error('Broadcast error:', error)
    }
  }

  // Handle subscription to organization events
  async handleSubscription(connectionId, data) {
    const { organizationId } = data
    
    if (!organizationId) {
      const connection = this.connections.get(connectionId)
      if (connection) {
        connection.ws.send(JSON.stringify({
          type: 'error',
          message: 'Organization ID required for subscription'
        }))
      }
      return
    }
    
    // Store subscription
    const subscriptions = await this.redis.get(`ws_subscriptions:${connectionId}`) || '[]'
    const subs = JSON.parse(subscriptions)
    
    if (!subs.includes(organizationId)) {
      subs.push(organizationId)
      await this.redis.set(`ws_subscriptions:${connectionId}`, JSON.stringify(subs))
    }
    
    // Subscribe to Redis channel
    await this.redis.subscribe(`org:${organizationId}`)
    
    const connection = this.connections.get(connectionId)
    if (connection) {
      connection.ws.send(JSON.stringify({
        type: 'subscribed',
        organizationId,
        timestamp: new Date().toISOString()
      }))
    }
  }

  // Handle unsubscription from organization events
  async handleUnsubscription(connectionId, data) {
    const { organizationId } = data
    
    if (!organizationId) {
      const connection = this.connections.get(connectionId)
      if (connection) {
        connection.ws.send(JSON.stringify({
          type: 'error',
          message: 'Organization ID required for unsubscription'
        }))
      }
      return
    }
    
    // Remove subscription
    const subscriptions = await this.redis.get(`ws_subscriptions:${connectionId}`) || '[]'
    const subs = JSON.parse(subscriptions)
    const filteredSubs = subs.filter(id => id !== organizationId)
    
    await this.redis.set(`ws_subscriptions:${connectionId}`, JSON.stringify(filteredSubs))
    
    // Unsubscribe from Redis channel
    await this.redis.unsubscribe(`org:${organizationId}`)
    
    const connection = this.connections.get(connectionId)
    if (connection) {
      connection.ws.send(JSON.stringify({
        type: 'unsubscribed',
        organizationId,
        timestamp: new Date().toISOString()
      }))
    }
  }

  // Enhanced workflow deployment with security
  async deployWorkflowToN8N(workflowData, userId, organizationId) {
    try {
      // Encrypt sensitive workflow data
      const encryptedWorkflow = await this.encryptWorkflowData(workflowData)
      
      // Validate workflow structure
      const validation = await this.validateWorkflow(encryptedWorkflow)
      if (!validation.valid) {
        throw new Error(`Workflow validation failed: ${validation.errors.join(', ')}`)
      }
      
      // Deploy to N8N
      const response = await this.makeN8NRequest('POST', '/workflows', encryptedWorkflow)
      
      if (response.data && response.data.id) {
        // Store workflow in database with encryption
        await this.storeWorkflowInDatabase({
          ...workflowData,
          n8n_id: response.data.id,
          user_id: userId,
          organization_id: organizationId,
          encrypted_data: encryptedWorkflow
        })
        
        // Broadcast workflow deployment event
        await this.broadcastToOrganization(organizationId, {
          type: 'workflow_deployed',
          workflowId: response.data.id,
          userId,
          timestamp: new Date().toISOString()
        })
        
        return {
          success: true,
          workflowId: response.data.id,
          n8nData: response.data
        }
      }
      
      throw new Error('Failed to deploy workflow to N8N')
      
    } catch (error) {
      console.error('Workflow deployment error:', error)
      
      // Log security audit event
      await this.logSecurityEvent('workflow_deployment_failed', {
        userId,
        organizationId,
        error: error.message
      })
      
      throw error
    }
  }

  // Encrypt sensitive workflow data
  async encryptWorkflowData(workflowData) {
    const sensitiveFields = ['credentials', 'nodes', 'connections']
    const encryptedWorkflow = { ...workflowData }
    
    for (const field of sensitiveFields) {
      if (workflowData[field]) {
        encryptedWorkflow[field] = EncryptionService.encryptField(
          JSON.stringify(workflowData[field])
        )
      }
    }
    
    return encryptedWorkflow
  }

  // Decrypt workflow data
  async decryptWorkflowData(encryptedWorkflow) {
    const sensitiveFields = ['credentials', 'nodes', 'connections']
    const decryptedWorkflow = { ...encryptedWorkflow }
    
    for (const field of sensitiveFields) {
      if (encryptedWorkflow[field]) {
        try {
          decryptedWorkflow[field] = JSON.parse(
            EncryptionService.decryptField(encryptedWorkflow[field])
          )
        } catch (error) {
          console.error(`Failed to decrypt field ${field}:`, error)
          decryptedWorkflow[field] = null
        }
      }
    }
    
    return decryptedWorkflow
  }

  // Validate workflow structure
  async validateWorkflow(workflowData) {
    const errors = []
    
    // Check required fields
    if (!workflowData.name) {
      errors.push('Workflow name is required')
    }
    
    if (!workflowData.nodes || !Array.isArray(workflowData.nodes)) {
      errors.push('Workflow must have nodes array')
    }
    
    if (!workflowData.connections || typeof workflowData.connections !== 'object') {
      errors.push('Workflow must have connections object')
    }
    
    // Validate nodes
    if (workflowData.nodes) {
      for (const node of workflowData.nodes) {
        if (!node.name || !node.type) {
          errors.push('Each node must have name and type')
        }
        
        // Check for potentially dangerous node types
        const dangerousTypes = ['exec', 'eval', 'Function']
        if (dangerousTypes.includes(node.type)) {
          errors.push(`Node type '${node.type}' is not allowed for security reasons`)
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  // Enhanced workflow execution with monitoring
  async executeWorkflow(workflowId, executionData, userId, organizationId) {
    try {
      // Check execution permissions
      const hasPermission = await this.checkExecutionPermission(workflowId, userId, organizationId)
      if (!hasPermission) {
        throw new Error('Insufficient permissions to execute workflow')
      }
      
      // Rate limiting for workflow execution
      const rateLimitKey = `workflow_execution:${userId}:${workflowId}`
      const currentExecutions = await this.redis.incr(rateLimitKey)
      
      if (currentExecutions === 1) {
        await this.redis.expire(rateLimitKey, 3600) // 1 hour window
      }
      
      if (currentExecutions > 10) { // 10 executions per hour per workflow
        throw new Error('Workflow execution rate limit exceeded')
      }
      
      // Execute workflow in N8N
      const response = await this.makeN8NRequest('POST', `/workflows/${workflowId}/execute`, executionData)
      
      if (response.data && response.data.executionId) {
        // Store execution in database
        await this.storeExecutionInDatabase({
          workflow_id: workflowId,
          execution_id: response.data.executionId,
          user_id: userId,
          organization_id: organizationId,
          status: 'running',
          input_data: executionData,
          started_at: new Date()
        })
        
        // Start monitoring execution
        this.monitorExecution(response.data.executionId, userId, organizationId)
        
        // Broadcast execution start event
        await this.broadcastToOrganization(organizationId, {
          type: 'workflow_execution_started',
          workflowId,
          executionId: response.data.executionId,
          userId,
          timestamp: new Date().toISOString()
        })
        
        return {
          success: true,
          executionId: response.data.executionId,
          status: 'running'
        }
      }
      
      throw new Error('Failed to execute workflow')
      
    } catch (error) {
      console.error('Workflow execution error:', error)
      
      // Log security audit event
      await this.logSecurityEvent('workflow_execution_failed', {
        workflowId,
        userId,
        organizationId,
        error: error.message
      })
      
      throw error
    }
  }

  // Check execution permissions
  async checkExecutionPermission(workflowId, userId, organizationId) {
    try {
      const result = await this.pool.query(`
        SELECT w.id, w.user_id, w.organization_id, w.visibility, w.status
        FROM workflows w
        WHERE w.id = $1 AND w.organization_id = $2
      `, [workflowId, organizationId])
      
      if (result.rows.length === 0) {
        return false
      }
      
      const workflow = result.rows[0]
      
      // Owner can always execute
      if (workflow.user_id === userId) {
        return true
      }
      
      // Check if workflow is public and active
      if (workflow.visibility === 'public' && workflow.status === 'active') {
        return true
      }
      
      // Check if user has execution permissions (implement RBAC here)
      const userRole = await this.getUserRole(userId, organizationId)
      if (userRole === 'admin' || userRole === 'editor') {
        return true
      }
      
      return false
      
    } catch (error) {
      console.error('Permission check error:', error)
      return false
    }
  }

  // Get user role in organization
  async getUserRole(userId, organizationId) {
    try {
      const result = await this.pool.query(`
        SELECT ur.role
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = $1 AND ur.organization_id = $2
      `, [userId, organizationId])
      
      return result.rows.length > 0 ? result.rows[0].role : 'user'
      
    } catch (error) {
      console.error('Get user role error:', error)
      return 'user'
    }
  }

  // Monitor workflow execution
  async monitorExecution(executionId, userId, organizationId) {
    const checkInterval = setInterval(async () => {
      try {
        const status = await this.getExecutionStatus(executionId)
        
        if (status.status === 'finished' || status.status === 'error') {
          // Update execution in database
          await this.updateExecutionInDatabase(executionId, {
            status: status.status,
            finished_at: new Date(),
            output_data: status.data,
            error_message: status.error
          })
          
          // Broadcast execution completion
          await this.broadcastToOrganization(organizationId, {
            type: 'workflow_execution_completed',
            executionId,
            status: status.status,
            userId,
            timestamp: new Date().toISOString()
          })
          
          // Clear monitoring
          clearInterval(checkInterval)
        }
        
      } catch (error) {
        console.error('Execution monitoring error:', error)
        clearInterval(checkInterval)
      }
    }, 5000) // Check every 5 seconds
  }

  // Enhanced N8N API request with retry logic and error handling
  async makeN8NRequest(method, endpoint, data = null) {
    const maxRetries = this.n8nConfig.retries
    let lastError
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const config = {
          method,
          url: `${this.n8nConfig.apiUrl}${endpoint}`,
          headers: {
            'Authorization': `Bearer ${this.n8nConfig.apiKey}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Hyphrki-Orchestrator/1.0'
          },
          timeout: this.n8nConfig.timeout,
          data: data ? JSON.stringify(data) : undefined
        }
        
        const response = await axios(config)
        return response
        
      } catch (error) {
        lastError = error
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000 // Exponential backoff
          console.log(`N8N request failed (attempt ${attempt}), retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    
    throw new Error(`N8N request failed after ${maxRetries} attempts: ${lastError.message}`)
  }

  // Store workflow in database
  async storeWorkflowInDatabase(workflowData) {
    try {
      const result = await this.pool.query(`
        INSERT INTO workflows (
          id, name, description, n8n_id, user_id, organization_id,
          status, visibility, encrypted_data, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          n8n_id = EXCLUDED.n8n_id,
          status = EXCLUDED.status,
          visibility = EXCLUDED.visibility,
          encrypted_data = EXCLUDED.encrypted_data,
          updated_at = NOW()
        RETURNING id
      `, [
        workflowData.id,
        workflowData.name,
        workflowData.description,
        workflowData.n8n_id,
        workflowData.user_id,
        workflowData.organization_id,
        workflowData.status || 'active',
        workflowData.visibility || 'private',
        JSON.stringify(workflowData.encrypted_data)
      ])
      
      return result.rows[0].id
      
    } catch (error) {
      console.error('Store workflow error:', error)
      throw error
    }
  }

  // Store execution in database
  async storeExecutionInDatabase(executionData) {
    try {
      const result = await this.pool.query(`
        INSERT INTO workflow_executions (
          id, workflow_id, execution_id, user_id, organization_id,
          status, input_data, started_at, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        RETURNING id
      `, [
        executionData.id || crypto.randomUUID(),
        executionData.workflow_id,
        executionData.execution_id,
        executionData.user_id,
        executionData.organization_id,
        executionData.status,
        JSON.stringify(executionData.input_data),
        executionData.started_at
      ])
      
      return result.rows[0].id
      
    } catch (error) {
      console.error('Store execution error:', error)
      throw error
    }
  }

  // Update execution in database
  async updateExecutionInDatabase(executionId, updateData) {
    try {
      const result = await this.pool.query(`
        UPDATE workflow_executions SET
          status = $2,
          finished_at = $3,
          output_data = $4,
          error_message = $5,
          updated_at = NOW()
        WHERE execution_id = $1
        RETURNING id
      `, [
        executionId,
        updateData.status,
        updateData.finished_at,
        updateData.output_data ? JSON.stringify(updateData.output_data) : null,
        updateData.error_message
      ])
      
      return result.rows[0]?.id
      
    } catch (error) {
      console.error('Update execution error:', error)
      throw error
    }
  }

  // Get execution status from N8N
  async getExecutionStatus(executionId) {
    try {
      const response = await this.makeN8NRequest('GET', `/executions/${executionId}`)
      return response.data
      
    } catch (error) {
      console.error('Get execution status error:', error)
      return { status: 'error', error: error.message }
    }
  }

  // Log security events
  async logSecurityEvent(eventType, eventData) {
    try {
      await this.pool.query(`
        INSERT INTO security_audit_events (
          user_id, event_type, event_data, success, created_at, organization_id
        ) VALUES ($1, $2, $3, $4, NOW(), $5)
      `, [
        eventData.userId,
        eventType,
        JSON.stringify(eventData),
        !eventData.error,
        eventData.organizationId
      ])
      
    } catch (error) {
      console.error('Security event logging error:', error)
    }
  }

  // Setup event handlers
  setupEventHandlers() {
    // Handle Redis pub/sub messages
    this.redis.on('message', (channel, message) => {
      try {
        const data = JSON.parse(message)
        this.broadcastToLocalConnections(channel, data)
      } catch (error) {
        console.error('Redis message handling error:', error)
      }
    })
    
    // Handle Redis errors
    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error)
    })
    
    // Handle database connection errors
    this.pool.on('error', (error) => {
      console.error('Database connection error:', error)
    })
  }

  // Broadcast to local WebSocket connections
  broadcastToLocalConnections(channel, message) {
    const organizationId = channel.replace('org:', '')
    
    this.connections.forEach((connection, connectionId) => {
      if (connection.ws.readyState === WebSocket.OPEN) {
        this.redis.get(`ws_subscriptions:${connectionId}`).then(subscriptions => {
          if (subscriptions) {
            const subs = JSON.parse(subscriptions)
            if (subs.includes(organizationId)) {
              connection.ws.send(JSON.stringify(message))
            }
          }
        })
      }
    })
  }

  // Graceful shutdown
  async shutdown() {
    console.log('Shutting down N8N service...')
    
    // Close WebSocket server
    if (this.wsServer) {
      this.wsServer.close()
    }
    
    // Close Redis connection
    if (this.redis) {
      await this.redis.quit()
    }
    
    // Close database pool
    if (this.pool) {
      await this.pool.end()
    }
    
    console.log('N8N service shutdown complete')
  }
}

module.exports = EnhancedN8NService
