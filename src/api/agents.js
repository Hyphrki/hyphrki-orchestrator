const express = require('express');
const { Pool } = require('pg');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:dev_password_123@localhost:5432/hyphrki_platform'
});

// Get all agents
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, status } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, name, description, status, version, created_by, created_at, updated_at, metadata
      FROM agents
      WHERE is_deleted = false
    `;
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM agents WHERE is_deleted = false';
    const countParams = [];
    let countParamCount = 0;

    if (category) {
      countParamCount++;
      countQuery += ` AND category = $${countParamCount}`;
      countParams.push(category);
    }

    if (status) {
      countParamCount++;
      countQuery += ` AND status = $${countParamCount}`;
      countParams.push(status);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      agents: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new agent (admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, category, iconUrl, price, currency, metadata } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const result = await pool.query(
      'INSERT INTO agents (name, description, category, icon_url, price, currency, metadata, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, description, category, iconUrl, price || 0, currency || 'USD', metadata || {}, req.user.userId]
    );

    res.status(201).json({
      message: 'Agent created successfully',
      agent: result.rows[0]
    });
  } catch (error) {
    console.error('Create agent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific agent
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM agents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json({ agent: result.rows[0] });
  } catch (error) {
    console.error('Get agent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update agent (admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, iconUrl, price, currency, metadata, status } = req.body;

    const result = await pool.query(
      'UPDATE agents SET name = $1, description = $2, category = $3, icon_url = $4, price = $5, currency = $6, metadata = $7, status = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *',
      [name, description, category, iconUrl, price, currency, metadata, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json({
      message: 'Agent updated successfully',
      agent: result.rows[0]
    });
  } catch (error) {
    console.error('Update agent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete agent (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM agents WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Delete agent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Execute agent
router.post('/:id/execute', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { inputData = {} } = req.body;

    // Check if agent exists and is active
    const agentResult = await pool.query(
      'SELECT * FROM agents WHERE id = $1 AND status = $2',
      [id, 'active']
    );

    if (agentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Agent not found or inactive' });
    }

    // Create execution record
    const executionResult = await pool.query(
      'INSERT INTO user_agent_executions (user_id, agent_id, input_data, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.userId, id, inputData, 'pending']
    );

    const execution = executionResult.rows[0];

    // TODO: Trigger actual agent execution via N8N
    // This would typically involve calling the N8N service to execute the agent's workflow

    res.json({
      message: 'Agent execution started',
      execution
    });
  } catch (error) {
    console.error('Execute agent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get agent categories
router.get('/categories/list', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM agents WHERE category IS NOT NULL ORDER BY category'
    );

    const categories = result.rows.map(row => row.category);

    res.json({ categories });
  } catch (error) {
    console.error('Get agent categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
