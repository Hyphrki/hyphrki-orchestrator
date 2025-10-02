const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:hyphrki123@localhost:5432/hyphrki_platform'
});

// Verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Verify API key for inter-server communication
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const expectedApiKey = process.env.INTER_SERVER_API_KEY;

  if (!apiKey || !expectedApiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  if (apiKey !== expectedApiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

// Verify HMAC signature for inter-server communication
const verifyHmacSignature = (req, res, next) => {
  const signature = req.headers['x-hmac-signature'];
  const timestamp = req.headers['x-timestamp'];
  const expectedSignature = req.headers['x-expected-signature'];

  if (!signature || !timestamp || !expectedSignature) {
    return res.status(401).json({ error: 'Missing signature headers' });
  }

  // Check timestamp to prevent replay attacks (within 5 minutes)
  const now = Date.now();
  const requestTime = parseInt(timestamp);
  if (now - requestTime > 300000) { // 5 minutes
    return res.status(401).json({ error: 'Request timestamp too old' });
  }

  // Verify HMAC signature
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.HMAC_SECRET || 'your-hmac-secret');
  hmac.update(JSON.stringify(req.body));
  hmac.update(timestamp);
  const computedSignature = hmac.digest('hex');

  if (signature !== computedSignature) {
    return res.status(401).json({ error: 'Invalid HMAC signature' });
  }

  next();
};

// Check user role
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
  return requireRole(['admin', 'super_admin'])(req, res, next);
};

// Check if user owns the resource
const requireOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userId = req.user.userId;

      let query;
      switch (resourceType) {
        case 'agent':
          query = 'SELECT user_id FROM agents WHERE id = $1';
          break;
        case 'workflow':
          query = 'SELECT created_by as user_id FROM workflows WHERE id = $1';
          break;
        case 'execution':
          query = 'SELECT user_id FROM user_agent_executions WHERE id = $1';
          break;
        default:
          return res.status(400).json({ error: 'Invalid resource type' });
      }

      const result = await pool.query(query, [resourceId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      const resourceUserId = result.rows[0].user_id;

      // Allow if user owns the resource or is admin
      if (resourceUserId !== userId && !['admin', 'super_admin'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

// Rate limiting middleware
const rateLimit = (windowMs = 900000, maxRequests = 100) => { // 15 minutes, 100 requests
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    if (requests.has(key)) {
      const userRequests = requests.get(key).filter(time => time > windowStart);
      requests.set(key, userRequests);
    } else {
      requests.set(key, []);
    }

    const userRequests = requests.get(key);

    if (userRequests.length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    userRequests.push(now);
    requests.set(key, userRequests);

    next();
  };
};

// CORS middleware
const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:3000',
    'https://hyphrki.com',
    'https://www.hyphrki.com',
    'https://app.hyphrki.com',
  ];

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-Key, X-HMAC-Signature, X-Timestamp');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = {
  verifyToken,
  verifyApiKey,
  verifyHmacSignature,
  requireRole,
  requireAdmin,
  requireOwnership,
  rateLimit,
  corsMiddleware,
  requestLogger,
};
