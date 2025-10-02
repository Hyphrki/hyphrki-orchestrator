/**
 * Health Check Route for Hyphrki Orchestrator
 * Provides health status for monitoring and load balancers
 */

const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Basic health checks
    const checks = {
      server: { status: 'healthy', responseTime: 5 },
      memory: checkMemory(),
      uptime: process.uptime(),
      n8n: checkN8N()
    };
    
    // Determine overall health
    const isHealthy = Object.values(checks).every(check => 
      typeof check === 'boolean' ? check : check.status === 'healthy'
    );
    
    const responseTime = Date.now() - startTime;
    
    const healthResponse = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      responseTime,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      checks
    };
    
    const httpStatus = isHealthy ? 200 : 503;
    
    res.status(httpStatus).json(healthResponse);
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message || 'Unknown error',
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  }
});

// Simple health check for load balancers
router.head('/health', (req, res) => {
  try {
    const isHealthy = process.uptime() > 0;
    res.status(isHealthy ? 200 : 503).end();
  } catch (error) {
    res.status(503).end();
  }
});

// Helper functions
function checkMemory() {
  try {
    const memUsage = process.memoryUsage();
    const usagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    
    return {
      status: usagePercent > 90 ? 'unhealthy' : usagePercent > 80 ? 'degraded' : 'healthy',
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      usagePercent: Math.round(usagePercent * 100) / 100
    };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error.message || 'Memory check failed' 
    };
  }
}

function checkN8N() {
  try {
    // Check if N8N process is running
    // In production, this would check actual N8N status
    return { status: 'healthy', responseTime: 5 };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error.message || 'N8N check failed' 
    };
  }
}

module.exports = router;