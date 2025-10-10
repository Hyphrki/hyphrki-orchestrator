#!/usr/bin/env node
/**
 * n8n Runtime for Orchestrator Platform
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const promClient = require('prometheus-api-metrics');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.N8N_RUNTIME_PORT || 8004;
const HOST = process.env.N8N_RUNTIME_HOST || '0.0.0.0';

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Prometheus metrics
app.use(promClient());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'n8n-runtime',
    timestamp: new Date().toISOString()
  });
});

// Execute workflow endpoint
app.post('/execute', async (req, res) => {
  try {
    const { config, inputs } = req.body;
    const executionId = `exec-${Date.now()}-${uuidv4().substring(0, 8)}`;

    // TODO: Implement actual n8n workflow execution
    // For now, return a mock response
    const result = {
      status: 'success',
      workflow_id: config?.id || 'mock-workflow',
      execution_id: executionId,
      output: {
        message: 'n8n workflow executed successfully',
        inputs: inputs
      }
    };

    console.log(`Executed n8n workflow: ${executionId}`);
    res.json(result);
  } catch (error) {
    console.error('Error executing n8n workflow:', error);
    res.status(500).json({ error: error.message });
  }
});

// List workflows endpoint
app.get('/workflows', (req, res) => {
  // TODO: Implement actual workflow listing
  res.json({
    workflows: [
      {
        id: 'sample-workflow',
        name: 'Sample n8n Workflow',
        description: 'A sample workflow for testing'
      }
    ]
  });
});

// Create workflow endpoint
app.post('/workflows', (req, res) => {
  try {
    const { config } = req.body;
    const workflowId = `workflow-${Date.now()}-${uuidv4().substring(0, 8)}`;

    // TODO: Implement actual workflow creation
    const workflow = {
      id: workflowId,
      name: config?.name || 'Unnamed Workflow',
      config: config,
      created_at: new Date().toISOString()
    };

    console.log(`Created n8n workflow: ${workflowId}`);
    res.json(workflow);
  } catch (error) {
    console.error('Error creating n8n workflow:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`n8n Runtime listening on ${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
