const Redis = require('ioredis')
const { EventEmitter } = require('events')
const crypto = require('crypto')
const { Pool } = require('pg')

class EventBus extends EventEmitter {
  constructor() {
    super()
    
    this.redis = new Redis(process.env.REDIS_URL, {
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    })
    
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
    
    this.subscribers = new Map()
    this.eventHandlers = new Map()
    this.eventHistory = new Map()
    this.maxHistorySize = 1000
    
    this.setupRedisSubscriptions()
    this.setupEventHandlers()
    this.setupEventPersistence()
  }

  // Publish an event
  async publish(eventType, eventData, options = {}) {
    try {
      const event = {
        id: crypto.randomUUID(),
        type: eventType,
        data: eventData,
        timestamp: new Date().toISOString(),
        source: options.source || 'system',
        organizationId: options.organizationId,
        userId: options.userId,
        correlationId: options.correlationId || crypto.randomUUID(),
        version: options.version || '1.0',
        metadata: options.metadata || {}
      }

      // Validate event data
      const validation = this.validateEvent(event)
      if (!validation.valid) {
        throw new Error(`Event validation failed: ${validation.errors.join(', ')}`)
      }

      // Store event in history
      this.storeEventInHistory(event)

      // Persist event to database
      await this.persistEvent(event)

      // Publish to Redis
      const channel = this.getChannelName(eventType, options.organizationId)
      await this.redis.publish(channel, JSON.stringify(event))

      // Emit locally
      this.emit(eventType, event)

      // Log event publication
      console.log(`Event published: ${eventType} (${event.id})`)

      return event.id

    } catch (error) {
      console.error('Event publication error:', error)
      throw error
    }
  }

  // Subscribe to events
  async subscribe(eventType, handler, options = {}) {
    try {
      const subscriptionId = crypto.randomUUID()
      const channel = this.getChannelName(eventType, options.organizationId)

      // Store handler
      this.eventHandlers.set(subscriptionId, {
        eventType,
        handler,
        options,
        channel,
        createdAt: new Date()
      })

      // Subscribe to Redis channel
      await this.redis.subscribe(channel)

      // Store subscription
      this.subscribers.set(subscriptionId, {
        eventType,
        channel,
        handler,
        options
      })

      console.log(`Subscribed to event: ${eventType} (${subscriptionId})`)

      return subscriptionId

    } catch (error) {
      console.error('Event subscription error:', error)
      throw error
    }
  }

  // Unsubscribe from events
  async unsubscribe(subscriptionId) {
    try {
      const subscription = this.subscribers.get(subscriptionId)
      if (!subscription) {
        throw new Error(`Subscription ${subscriptionId} not found`)
      }

      // Unsubscribe from Redis channel
      await this.redis.unsubscribe(subscription.channel)

      // Remove handlers
      this.subscribers.delete(subscriptionId)
      this.eventHandlers.delete(subscriptionId)

      console.log(`Unsubscribed from event: ${subscription.eventType} (${subscriptionId})`)

    } catch (error) {
      console.error('Event unsubscription error:', error)
      throw error
    }
  }

  // Setup Redis message handling
  setupRedisSubscriptions() {
    this.redis.on('message', async (channel, message) => {
      try {
        const event = JSON.parse(message)
        await this.handleIncomingEvent(event, channel)
      } catch (error) {
        console.error('Redis message handling error:', error)
      }
    })

    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error)
    })
  }

  // Handle incoming events from Redis
  async handleIncomingEvent(event, channel) {
    try {
      // Find matching handlers
      const matchingHandlers = Array.from(this.eventHandlers.values())
        .filter(handler => handler.channel === channel)

      // Execute handlers
      for (const handlerInfo of matchingHandlers) {
        try {
          await handlerInfo.handler(event)
        } catch (error) {
          console.error(`Event handler error for ${event.type}:`, error)
          
          // Emit error event
          this.emit('handler_error', {
            eventId: event.id,
            eventType: event.type,
            handlerId: handlerInfo.subscriptionId,
            error: error.message
          })
        }
      }

    } catch (error) {
      console.error('Incoming event handling error:', error)
    }
  }

  // Setup default event handlers
  setupEventHandlers() {
    // User events
    this.subscribe('user.created', async (event) => {
      console.log('User created:', event.data.userId)
      // Send welcome email, create default settings, etc.
    })

    this.subscribe('user.updated', async (event) => {
      console.log('User updated:', event.data.userId)
      // Update caches, notify other services, etc.
    })

    this.subscribe('user.deleted', async (event) => {
      console.log('User deleted:', event.data.userId)
      // Clean up user data, revoke tokens, etc.
    })

    // Workflow events
    this.subscribe('workflow.created', async (event) => {
      console.log('Workflow created:', event.data.workflowId)
      // Deploy to N8N, update marketplace, etc.
    })

    this.subscribe('workflow.updated', async (event) => {
      console.log('Workflow updated:', event.data.workflowId)
      // Update N8N deployment, invalidate caches, etc.
    })

    this.subscribe('workflow.deleted', async (event) => {
      console.log('Workflow deleted:', event.data.workflowId)
      // Remove from N8N, clean up executions, etc.
    })

    this.subscribe('workflow.execution.started', async (event) => {
      console.log('Workflow execution started:', event.data.executionId)
      // Update execution status, notify users, etc.
    })

    this.subscribe('workflow.execution.completed', async (event) => {
      console.log('Workflow execution completed:', event.data.executionId)
      // Update execution status, send notifications, etc.
    })

    this.subscribe('workflow.execution.failed', async (event) => {
      console.log('Workflow execution failed:', event.data.executionId)
      // Log error, notify users, retry if needed, etc.
    })

    // Agent events
    this.subscribe('agent.created', async (event) => {
      console.log('Agent created:', event.data.agentId)
      // Add to marketplace, update search index, etc.
    })

    this.subscribe('agent.updated', async (event) => {
      console.log('Agent updated:', event.data.agentId)
      // Update marketplace, invalidate caches, etc.
    })

    this.subscribe('agent.deleted', async (event) => {
      console.log('Agent deleted:', event.data.agentId)
      // Remove from marketplace, clean up data, etc.
    })

    // Billing events
    this.subscribe('billing.subscription.created', async (event) => {
      console.log('Subscription created:', event.data.subscriptionId)
      // Activate features, send confirmation email, etc.
    })

    this.subscribe('billing.subscription.updated', async (event) => {
      console.log('Subscription updated:', event.data.subscriptionId)
      // Update feature access, notify users, etc.
    })

    this.subscribe('billing.subscription.cancelled', async (event) => {
      console.log('Subscription cancelled:', event.data.subscriptionId)
      // Deactivate features, send cancellation email, etc.
    })

    this.subscribe('billing.payment.succeeded', async (event) => {
      console.log('Payment succeeded:', event.data.paymentId)
      // Update subscription status, send receipt, etc.
    })

    this.subscribe('billing.payment.failed', async (event) => {
      console.log('Payment failed:', event.data.paymentId)
      // Retry payment, notify user, suspend service, etc.
    })

    // Security events
    this.subscribe('security.login.success', async (event) => {
      console.log('Login success:', event.data.userId)
      // Update last login, log security event, etc.
    })

    this.subscribe('security.login.failed', async (event) => {
      console.log('Login failed:', event.data.email)
      // Increment failed attempts, check for brute force, etc.
    })

    this.subscribe('security.token.revoked', async (event) => {
      console.log('Token revoked:', event.data.userId)
      // Clean up sessions, notify other services, etc.
    })

    this.subscribe('security.mfa.enabled', async (event) => {
      console.log('MFA enabled:', event.data.userId)
      // Send confirmation email, update security settings, etc.
    })

    // System events
    this.subscribe('system.maintenance.started', async (event) => {
      console.log('Maintenance started')
      // Notify users, disable non-critical services, etc.
    })

    this.subscribe('system.maintenance.completed', async (event) => {
      console.log('Maintenance completed')
      // Re-enable services, notify users, etc.
    })

    this.subscribe('system.error.critical', async (event) => {
      console.log('Critical error:', event.data.error)
      // Send alerts, create incident, etc.
    })
  }

  // Persist events to database
  async persistEvent(event) {
    try {
      await this.pool.query(`
        INSERT INTO event_store (
          id, event_type, event_data, timestamp, source, organization_id,
          user_id, correlation_id, version, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        event.id,
        event.type,
        JSON.stringify(event.data),
        event.timestamp,
        event.source,
        event.organizationId,
        event.userId,
        event.correlationId,
        event.version,
        JSON.stringify(event.metadata)
      ])
    } catch (error) {
      console.error('Event persistence error:', error)
      // Don't throw - event should still be processed even if persistence fails
    }
  }

  // Store event in memory history
  storeEventInHistory(event) {
    const historyKey = `${event.type}:${event.organizationId || 'global'}`
    
    if (!this.eventHistory.has(historyKey)) {
      this.eventHistory.set(historyKey, [])
    }
    
    const history = this.eventHistory.get(historyKey)
    history.push(event)
    
    // Limit history size
    if (history.length > this.maxHistorySize) {
      history.shift()
    }
  }

  // Get event history
  getEventHistory(eventType, organizationId = null, limit = 100) {
    const historyKey = `${eventType}:${organizationId || 'global'}`
    const history = this.eventHistory.get(historyKey) || []
    
    return history.slice(-limit)
  }

  // Validate event data
  validateEvent(event) {
    const errors = []
    
    if (!event.id || typeof event.id !== 'string') {
      errors.push('Event ID is required and must be a string')
    }
    
    if (!event.type || typeof event.type !== 'string') {
      errors.push('Event type is required and must be a string')
    }
    
    if (!event.timestamp || isNaN(Date.parse(event.timestamp))) {
      errors.push('Valid timestamp is required')
    }
    
    if (!event.data) {
      errors.push('Event data is required')
    }
    
    // Validate event type format
    if (event.type && !/^[a-z]+\.[a-z]+(\.[a-z]+)*$/.test(event.type)) {
      errors.push('Event type must follow pattern: domain.action.subaction')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  // Get channel name for event type
  getChannelName(eventType, organizationId = null) {
    if (organizationId) {
      return `events:${organizationId}:${eventType}`
    }
    return `events:global:${eventType}`
  }

  // Replay events (for event sourcing)
  async replayEvents(eventType, organizationId = null, fromTimestamp = null) {
    try {
      let query = `
        SELECT * FROM event_store 
        WHERE event_type = $1
      `
      const params = [eventType]
      
      if (organizationId) {
        query += ` AND organization_id = $2`
        params.push(organizationId)
      }
      
      if (fromTimestamp) {
        query += ` AND timestamp >= $${params.length + 1}`
        params.push(fromTimestamp)
      }
      
      query += ` ORDER BY timestamp ASC`
      
      const result = await this.pool.query(query, params)
      
      return result.rows.map(row => ({
        id: row.id,
        type: row.event_type,
        data: JSON.parse(row.event_data),
        timestamp: row.timestamp,
        source: row.source,
        organizationId: row.organization_id,
        userId: row.user_id,
        correlationId: row.correlation_id,
        version: row.version,
        metadata: JSON.parse(row.metadata || '{}')
      }))
      
    } catch (error) {
      console.error('Event replay error:', error)
      throw error
    }
  }

  // Get event statistics
  async getEventStats(organizationId = null, timeRange = '24h') {
    try {
      let query = `
        SELECT 
          event_type,
          COUNT(*) as count,
          MIN(timestamp) as first_event,
          MAX(timestamp) as last_event
        FROM event_store
      `
      const params = []
      
      if (organizationId) {
        query += ` WHERE organization_id = $1`
        params.push(organizationId)
      }
      
      if (timeRange === '24h') {
        query += ` ${organizationId ? 'AND' : 'WHERE'} timestamp >= NOW() - INTERVAL '24 hours'`
      } else if (timeRange === '7d') {
        query += ` ${organizationId ? 'AND' : 'WHERE'} timestamp >= NOW() - INTERVAL '7 days'`
      } else if (timeRange === '30d') {
        query += ` ${organizationId ? 'AND' : 'WHERE'} timestamp >= NOW() - INTERVAL '30 days'`
      }
      
      query += ` GROUP BY event_type ORDER BY count DESC`
      
      const result = await this.pool.query(query, params)
      return result.rows
      
    } catch (error) {
      console.error('Event stats error:', error)
      return []
    }
  }

  // Cleanup old events
  async cleanupOldEvents(retentionDays = 90) {
    try {
      const result = await this.pool.query(`
        DELETE FROM event_store 
        WHERE timestamp < NOW() - INTERVAL '${retentionDays} days'
      `)
      
      console.log(`Cleaned up ${result.rowCount} old events`)
      return result.rowCount
      
    } catch (error) {
      console.error('Event cleanup error:', error)
      throw error
    }
  }

  // Get active subscriptions
  getActiveSubscriptions() {
    return Array.from(this.subscribers.entries()).map(([id, subscription]) => ({
      id,
      eventType: subscription.eventType,
      channel: subscription.channel,
      createdAt: subscription.createdAt
    }))
  }

  // Health check
  async healthCheck() {
    try {
      // Check Redis connection
      await this.redis.ping()
      
      // Check database connection
      await this.pool.query('SELECT 1')
      
      return {
        status: 'healthy',
        redis: 'connected',
        database: 'connected',
        activeSubscriptions: this.subscribers.size,
        eventHistorySize: Array.from(this.eventHistory.values()).reduce((sum, history) => sum + history.length, 0)
      }
      
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      }
    }
  }

  // Graceful shutdown
  async shutdown() {
    console.log('Shutting down Event Bus...')
    
    // Unsubscribe from all channels
    for (const [id, subscription] of this.subscribers) {
      await this.unsubscribe(id)
    }
    
    // Close Redis connection
    if (this.redis) {
      await this.redis.quit()
    }
    
    // Close database connection
    if (this.pool) {
      await this.pool.end()
    }
    
    console.log('Event Bus shutdown complete')
  }
}

module.exports = EventBus
