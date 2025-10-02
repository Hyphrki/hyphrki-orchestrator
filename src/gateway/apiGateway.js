const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const rateLimit = require('express-rate-limit')
const RedisStore = require('rate-limit-redis')
const Redis = require('ioredis')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const { Pool } = require('pg')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

class APIGateway {
  constructor() {
    this.app = express()
    this.redis = new Redis(process.env.REDIS_URL)
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
    
    this.services = {
      frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:3000',
        healthCheck: '/health'
      },
      orchestrator: {
        url: process.env.ORCHESTRATOR_URL || 'http://localhost:3001',
        healthCheck: '/health'
      },
      n8n: {
        url: process.env.N8N_URL || 'http://localhost:5678',
        healthCheck: '/healthz'
      }
    }
    
    this.setupMiddleware()
    this.setupRoutes()
    this.setupHealthChecks()
    this.setupCircuitBreakers()
  }

  setupMiddleware() {
    // Security headers
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "ws:", "wss:"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    }))

    // CORS configuration
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }))

    // Compression
    this.app.use(compression())

    // Request logging
    this.app.use((req, res, next) => {
      const start = Date.now()
      res.on('finish', () => {
        const duration = Date.now() - start
        console.log(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`)
      })
      next()
    })

    // Global rate limiting
    const globalRateLimit = rateLimit({
      store: new RedisStore({
        sendCommand: (...args) => this.redis.call(...args),
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // 1000 requests per window
      message: {
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: '15 minutes'
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
    this.app.use(globalRateLimit)

    // API-specific rate limiting
    const apiRateLimit = rateLimit({
      store: new RedisStore({
        sendCommand: (...args) => this.redis.call(...args),
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // 500 API requests per window
      message: {
        error: 'API rate limit exceeded, please try again later.',
        retryAfter: '15 minutes'
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
    this.app.use('/api', apiRateLimit)
  }

  setupRoutes() {
    // Authentication middleware
    const authenticateToken = async (req, res, next) => {
      try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
          return res.status(401).json({ error: 'Access token required' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Check if user still exists and is active
        const userResult = await this.pool.query(`
          SELECT id, email, role, organization_id, locked_until
          FROM users 
          WHERE id = $1
        `, [decoded.userId])

        if (userResult.rows.length === 0) {
          return res.status(401).json({ error: 'User not found' })
        }

        const user = userResult.rows[0]
        
        if (user.locked_until && user.locked_until > new Date()) {
          return res.status(423).json({ error: 'Account locked' })
        }

        req.user = {
          userId: user.id,
          email: user.email,
          role: user.role,
          organizationId: user.organization_id
        }

        next()
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({ error: 'Invalid token' })
        }
        console.error('Authentication error:', error)
        return res.status(500).json({ error: 'Authentication failed' })
      }
    }

    // Service discovery and load balancing
    this.app.use('/api/auth', this.createServiceProxy('orchestrator', '/api/auth'))
    this.app.use('/api/users', authenticateToken, this.createServiceProxy('orchestrator', '/api/users'))
    this.app.use('/api/workflows', authenticateToken, this.createServiceProxy('orchestrator', '/api/workflows'))
    this.app.use('/api/agents', authenticateToken, this.createServiceProxy('orchestrator', '/api/agents'))
    this.app.use('/api/marketplace', authenticateToken, this.createServiceProxy('frontend', '/api/marketplace'))
    this.app.use('/api/billing', authenticateToken, this.createServiceProxy('orchestrator', '/api/billing'))
    this.app.use('/api/webhooks', authenticateToken, this.createServiceProxy('orchestrator', '/api/webhooks'))
    this.app.use('/api/admin', authenticateToken, this.createServiceProxy('orchestrator', '/api/admin'))

    // N8N proxy with authentication
    this.app.use('/n8n', authenticateToken, this.createServiceProxy('n8n', '/'))

    // WebSocket proxy
    this.app.use('/ws', authenticateToken, this.createWebSocketProxy())

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: this.getServiceHealth()
      })
    })

    // Metrics endpoint
    this.app.get('/metrics', authenticateToken, (req, res) => {
      res.json({
        requests: this.getRequestMetrics(),
        services: this.getServiceMetrics(),
        timestamp: new Date().toISOString()
      })
    })
  }

  createServiceProxy(serviceName, path) {
    const service = this.services[serviceName]
    
    return createProxyMiddleware({
      target: service.url,
      changeOrigin: true,
      pathRewrite: {
        [`^${path}`]: path
      },
      onError: (err, req, res) => {
        console.error(`Proxy error for ${serviceName}:`, err)
        res.status(503).json({
          error: 'Service temporarily unavailable',
          service: serviceName,
          timestamp: new Date().toISOString()
        })
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add request ID for tracing
        const requestId = crypto.randomUUID()
        proxyReq.setHeader('X-Request-ID', requestId)
        proxyReq.setHeader('X-Gateway-Timestamp', new Date().toISOString())
        
        // Add user context
        if (req.user) {
          proxyReq.setHeader('X-User-ID', req.user.userId)
          proxyReq.setHeader('X-Organization-ID', req.user.organizationId)
          proxyReq.setHeader('X-User-Role', req.user.role)
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        // Add response headers
        proxyRes.headers['X-Gateway-Service'] = serviceName
        proxyRes.headers['X-Gateway-Timestamp'] = new Date().toISOString()
        
        // Log response metrics
        this.recordResponseMetrics(serviceName, proxyRes.statusCode, Date.now() - req.startTime)
      }
    })
  }

  createWebSocketProxy() {
    return (req, res, next) => {
      // WebSocket proxy implementation would go here
      // For now, return a 501 Not Implemented
      res.status(501).json({
        error: 'WebSocket proxy not implemented',
        message: 'Use direct WebSocket connection to orchestrator service'
      })
    }
  }

  setupHealthChecks() {
    // Check service health every 30 seconds
    setInterval(async () => {
      for (const [serviceName, service] of Object.entries(this.services)) {
        try {
          const response = await fetch(`${service.url}${service.healthCheck}`, {
            timeout: 5000
          })
          
          this.updateServiceHealth(serviceName, response.ok)
        } catch (error) {
          console.error(`Health check failed for ${serviceName}:`, error.message)
          this.updateServiceHealth(serviceName, false)
        }
      }
    }, 30000)
  }

  setupCircuitBreakers() {
    this.circuitBreakers = {}
    
    for (const serviceName of Object.keys(this.services)) {
      this.circuitBreakers[serviceName] = {
        state: 'CLOSED', // CLOSED, OPEN, HALF_OPEN
        failureCount: 0,
        lastFailureTime: null,
        successCount: 0,
        threshold: 5, // Open circuit after 5 failures
        timeout: 60000, // 1 minute timeout
        resetTimeout: 300000 // 5 minutes reset timeout
      }
    }
  }

  updateServiceHealth(serviceName, isHealthy) {
    const breaker = this.circuitBreakers[serviceName]
    
    if (isHealthy) {
      breaker.failureCount = 0
      breaker.successCount++
      
      if (breaker.state === 'HALF_OPEN' && breaker.successCount >= 3) {
        breaker.state = 'CLOSED'
        breaker.successCount = 0
        console.log(`Circuit breaker for ${serviceName} is now CLOSED`)
      }
    } else {
      breaker.failureCount++
      breaker.lastFailureTime = Date.now()
      
      if (breaker.failureCount >= breaker.threshold) {
        breaker.state = 'OPEN'
        console.log(`Circuit breaker for ${serviceName} is now OPEN`)
      }
    }
  }

  getServiceHealth() {
    const health = {}
    
    for (const [serviceName, breaker] of Object.entries(this.circuitBreakers)) {
      health[serviceName] = {
        status: breaker.state === 'OPEN' ? 'unhealthy' : 'healthy',
        circuitState: breaker.state,
        failureCount: breaker.failureCount,
        lastFailureTime: breaker.lastFailureTime
      }
    }
    
    return health
  }

  recordResponseMetrics(serviceName, statusCode, responseTime) {
    const key = `metrics:${serviceName}:${statusCode}`
    this.redis.incr(key)
    this.redis.expire(key, 3600) // 1 hour TTL
    
    const responseTimeKey = `metrics:${serviceName}:response_time`
    this.redis.lpush(responseTimeKey, responseTime)
    this.redis.ltrim(responseTimeKey, 0, 999) // Keep last 1000 measurements
    this.redis.expire(responseTimeKey, 3600)
  }

  getRequestMetrics() {
    // This would typically aggregate metrics from Redis
    return {
      totalRequests: 0,
      averageResponseTime: 0,
      errorRate: 0
    }
  }

  getServiceMetrics() {
    const metrics = {}
    
    for (const serviceName of Object.keys(this.services)) {
      metrics[serviceName] = {
        requests: 0,
        errors: 0,
        averageResponseTime: 0,
        circuitState: this.circuitBreakers[serviceName].state
      }
    }
    
    return metrics
  }

  // Service discovery methods
  async registerService(serviceName, serviceInfo) {
    const key = `service:${serviceName}`
    await this.redis.hset(key, {
      url: serviceInfo.url,
      healthCheck: serviceInfo.healthCheck,
      registeredAt: new Date().toISOString(),
      lastHeartbeat: new Date().toISOString()
    })
    
    await this.redis.expire(key, 300) // 5 minute TTL
  }

  async discoverService(serviceName) {
    const key = `service:${serviceName}`
    const serviceInfo = await this.redis.hgetall(key)
    
    if (Object.keys(serviceInfo).length === 0) {
      return this.services[serviceName] // Fallback to static config
    }
    
    return {
      url: serviceInfo.url,
      healthCheck: serviceInfo.healthCheck,
      registeredAt: serviceInfo.registeredAt,
      lastHeartbeat: serviceInfo.lastHeartbeat
    }
  }

  async heartbeat(serviceName) {
    const key = `service:${serviceName}`
    await this.redis.hset(key, 'lastHeartbeat', new Date().toISOString())
    await this.redis.expire(key, 300) // Refresh TTL
  }

  // Load balancing methods
  getServiceInstance(serviceName) {
    const service = this.services[serviceName]
    
    // Simple round-robin load balancing
    // In production, this would be more sophisticated
    return service.url
  }

  // Request routing with failover
  async routeRequest(serviceName, path, options = {}) {
    const breaker = this.circuitBreakers[serviceName]
    
    // Check circuit breaker state
    if (breaker.state === 'OPEN') {
      if (Date.now() - breaker.lastFailureTime > breaker.resetTimeout) {
        breaker.state = 'HALF_OPEN'
        breaker.successCount = 0
      } else {
        throw new Error(`Service ${serviceName} is unavailable (circuit breaker OPEN)`)
      }
    }
    
    try {
      const serviceUrl = this.getServiceInstance(serviceName)
      const response = await fetch(`${serviceUrl}${path}`, {
        timeout: 10000,
        ...options
      })
      
      if (!response.ok) {
        throw new Error(`Service ${serviceName} returned ${response.status}`)
      }
      
      // Record success
      if (breaker.state === 'HALF_OPEN') {
        breaker.successCount++
      }
      
      return response
      
    } catch (error) {
      // Record failure
      breaker.failureCount++
      breaker.lastFailureTime = Date.now()
      
      if (breaker.failureCount >= breaker.threshold) {
        breaker.state = 'OPEN'
      }
      
      throw error
    }
  }

  // Start the gateway
  start(port = 8080) {
    this.app.listen(port, () => {
      console.log(`API Gateway running on port ${port}`)
      console.log('Available services:', Object.keys(this.services))
    })
  }

  // Graceful shutdown
  async shutdown() {
    console.log('Shutting down API Gateway...')
    
    if (this.redis) {
      await this.redis.quit()
    }
    
    if (this.pool) {
      await this.pool.end()
    }
    
    console.log('API Gateway shutdown complete')
  }
}

module.exports = APIGateway
