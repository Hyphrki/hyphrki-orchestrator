const express = require('express');
const { Pool } = require('pg');
const { verifyToken, requireOwnership } = require('../middleware/auth');
const n8nService = require('../services/n8nService');
const router = express.Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:dev_password_123@localhost:5432/hyphrki_platform'
});

// Get all executions
router.get('/', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, workflowId } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT e.*, w.name as workflow_name
      FROM workflow_executions e
      LEFT JOIN workflows w ON e.workflow_id = w.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND e.status = $${paramCount}`;
      params.push(status);
    }

    if (workflowId) {
      paramCount++;
      query += ` AND e.workflow_id = $${paramCount}`;
      params.push(workflowId);
    }

    query += ` ORDER BY e.started_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM workflow_executions e WHERE 1=1';
    const countParams = [];
    let countParamCount = 0;

    if (status) {
      countParamCount++;
      countQuery += ` AND e.status = $${countParamCount}`;
      countParams.push(status);
    }

    if (workflowId) {
      countParamCount++;
      countQuery += ` AND e.workflow_id = $${countParamCount}`;
      countParams.push(workflowId);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      executions: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get executions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Trigger workflow execution
router.post('/trigger', verifyToken, async (req, res) => {
  try {
    const { workflowId, inputData = {} } = req.body;

    if (!workflowId) {
      return res.status(400).json({ error: 'Workflow ID is required' });
    }

    const execution = await n8nService.executeWorkflow(workflowId, inputData);

    res.json({
      message: 'Workflow triggered successfully',
      execution
    });
  } catch (error) {
    console.error('Trigger workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific execution
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT e.*, w.name as workflow_name FROM workflow_executions e LEFT JOIN workflows w ON e.workflow_id = w.id WHERE e.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Execution not found' });
    }

    const execution = result.rows[0];

    // Get N8N execution details
    try {
      const n8nExecution = await n8nService.getExecution(id);
      execution.n8nDetails = n8nExecution;
    } catch (error) {
      console.error('Failed to get N8N execution details:', error);
    }

    res.json({ execution });
  } catch (error) {
    console.error('Get execution error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel execution
router.post('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await n8nService.cancelExecution(id);

    res.json({ message: 'Execution cancelled successfully' });
  } catch (error) {
    console.error('Cancel execution error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get execution logs
router.get('/:id/logs', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const logs = await n8nService.getExecutionLogs(id);

    res.json({ logs });
  } catch (error) {
    console.error('Get execution logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
