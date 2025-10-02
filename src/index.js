// Load environment variables FIRST before any other imports
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const { corsMiddleware, requestLogger, rateLimit } = require('./middleware/auth');
const n8nAuthBridge = require('./lib/n8n-auth-bridge');
const n8nIntegrated = require('./services/n8n-integrated');

const app = express();
const PORT = process.env.PORT || 5678;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for N8N iframe compatibility
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(morgan('combined'));
app.use(cookieParser()); // Add cookie parser for auth
app.use(corsMiddleware);
app.use(requestLogger);
app.use(rateLimit());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// N8N Configuration
const N8N_PORT = process.env.N8N_PORT || '8081';
const N8N_HOST = process.env.N8N_HOST || 'localhost';
const N8N_URL = `http://${N8N_HOST}:${N8N_PORT}`;

console.log('============================================');
console.log('Hyphrki Orchestrator - N8N Integration');
console.log('============================================');
console.log(`N8N will be proxied at: ${N8N_URL}`);
console.log(`Orchestrator URL: http://localhost:${PORT}`);
console.log('============================================');

// Auth middleware for all routes
app.use(n8nAuthBridge.authMiddleware.bind(n8nAuthBridge));

// Orchestrator API Routes
app.use('/api/auth', require('./api/auth'));
app.use('/api/users', require('./api/users'));
app.use('/api/billing', require('./api/billing'));
app.use('/api/webhooks', require('./api/webhooks'));
app.use('/api/workflows', require('./api/workflows'));
app.use('/api/executions', require('./api/executions'));
app.use('/api/agents', require('./api/agents'));
app.use('/api/admin', require('./api/admin'));
app.use('/health', require('./routes/health'));

// Admin UI Route
app.use('/admin', require('./routes/admin-ui'));

// N8N Proxy with authentication
app.use('/n8n', (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please login to access the workflow editor'
    });
  }

  // Check if user has access (admins only for now)
  if (!n8nAuthBridge.isAdmin(req.user)) {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Only administrators can access the workflow editor'
    });
  }

  next();
}, createProxyMiddleware({
  target: N8N_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/n8n': '', // Remove /n8n prefix when proxying
  },
  onProxyReq: (proxyReq, req, res) => {
    // Inject user information for N8N
    if (req.user) {
      proxyReq.setHeader('X-Hyphrki-User-Id', req.user.id);
      proxyReq.setHeader('X-Hyphrki-User-Email', req.user.email);
      proxyReq.setHeader('X-Hyphrki-User-Role', req.user.globalRole);
      proxyReq.setHeader('X-Hyphrki-Organization-Id', req.user.organizationId);
    }
  },
  ws: true, // Enable WebSocket proxying for real-time updates
  logLevel: 'warn'
}));

// Root route - serve orchestrator info
app.get('/', (req, res) => {
  const status = n8nIntegrated.getStatus();

  res.json({
    message: 'Hyphrki Orchestrator - AI Agent Platform',
    version: '1.0.0',
    status: 'running',
    n8n: {
      status: status.isRunning ? 'running' : 'stopped',
      url: status.url,
      processId: status.processId
    },
    endpoints: {
      health: '/health',
      api: '/api/*',
      n8n_editor: '/n8n',
      workflows: '/api/workflows',
      agents: '/api/agents',
      admin: '/api/admin'
    },
    authentication: {
      type: 'JWT',
      required: true,
      adminOnly: {
        n8n_editor: true,
        admin_api: true
      }
    },
    features: {
      workflow_editor: 'N8N integrated',
      agent_deployment: 'Available',
      multi_tenancy: 'Enabled',
      enterprise_features: 'Unlocked',
      analytics: 'Coming soon',
      api_keys: 'Available'
    }
  });
});

// Health check is now handled by the health route

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  n8nIntegrated.stop(); // Stop N8N
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  n8nIntegrated.stop(); // Stop N8N
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Hyphrki Orchestrator running on port ${PORT}`);
  console.log(`✓ Access at: http://localhost:${PORT}`);
  console.log('');
  console.log('Starting N8N...');

  // Start N8N integrated service
  n8nIntegrated.start();

  console.log('');
  console.log('============================================');
  console.log(`Ready! Access N8N at: http://localhost:${PORT}/n8n`);
  console.log('(Admin authentication required)');
  console.log('============================================');
});

module.exports = app;
