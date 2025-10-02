const express = require('express');
const { Pool } = require('pg');
const { verifyToken, requireAdmin, requireOwnership } = require('../middleware/auth');
const n8nService = require('../services/n8nService');
const router = express.Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:dev_password_123@localhost:5432/hyphrki_platform'
});

// Get all workflows
router.get('/', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, name, description, n8n_workflow_id, status, version, created_by, created_at, updated_at
      FROM workflows
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM workflows WHERE 1=1';
    const countParams = [];
    let countParamCount = 0;

    if (status) {
      countParamCount++;
      countQuery += ` AND status = $${countParamCount}`;
      countParams.push(status);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      workflows: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get workflows error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new workflow
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description, definition, status = 'draft' } = req.body;

    if (!name || !definition) {
      return res.status(400).json({ error: 'Name and definition are required' });
    }

    const workflowData = {
      name,
      description: description || '',
      definition,
      status,
      ownerId: req.user.userId,
      organizationId: req.user.organizationId
    };

    const workflow = await n8nService.createWorkflow(workflowData);

    res.status(201).json({
      message: 'Workflow created successfully',
      workflow
    });
  } catch (error) {
    console.error('Create workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific workflow
router.get('/:id', verifyToken, requireOwnership('workflow'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM workflows WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    const workflow = result.rows[0];

    // Get N8N workflow details
    try {
      const n8nWorkflow = await n8nService.getWorkflow(id);
      workflow.n8nDetails = n8nWorkflow;
    } catch (error) {
      console.error('Failed to get N8N workflow details:', error);
    }

    res.json({ workflow });
  } catch (error) {
    console.error('Get workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update workflow
router.put('/:id', verifyToken, requireOwnership('workflow'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, definition } = req.body;

    const workflowData = {
      name,
      description,
      definition
    };

    const workflow = await n8nService.updateWorkflow(id, workflowData);

    res.json({
      message: 'Workflow updated successfully',
      workflow
    });
  } catch (error) {
    console.error('Update workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete workflow
router.delete('/:id', verifyToken, requireOwnership('workflow'), async (req, res) => {
  try {
    const { id } = req.params;

    await n8nService.deleteWorkflow(id);

    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    console.error('Delete workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Execute workflow
router.post('/:id/execute', verifyToken, requireOwnership('workflow'), async (req, res) => {
  try {
    const { id } = req.params;
    const { inputData = {} } = req.body;

    const execution = await n8nService.executeWorkflow(
      id, 
      inputData, 
      req.user.userId, 
      req.user.organizationId
    );

    res.json({
      message: 'Workflow execution started',
      execution
    });
  } catch (error) {
    console.error('Execute workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get workflow executions
router.get('/:id/executions', verifyToken, requireOwnership('workflow'), async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const executions = await n8nService.getExecutions(id, limit, offset);

    res.json({ executions });
  } catch (error) {
    console.error('Get workflow executions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync workflows with N8N
router.post('/sync', verifyToken, requireAdmin, async (req, res) => {
  try {
    await n8nService.syncWorkflows();

    res.json({ message: 'Workflows synced successfully' });
  } catch (error) {
    console.error('Sync workflows error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
