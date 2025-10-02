const express = require('express');
const { Pool } = require('pg');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:dev_password_123@localhost:5432/hyphrki_platform'
});

// Get system statistics
router.get('/stats', verifyToken, requireAdmin, async (req, res) => {
  try {
    const stats = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM users'),
      pool.query('SELECT COUNT(*) as count FROM agents'),
      pool.query('SELECT COUNT(*) as count FROM workflows'),
      pool.query('SELECT COUNT(*) as count FROM workflow_executions'),
      pool.query('SELECT COUNT(*) as count FROM user_agent_executions'),
      pool.query('SELECT COUNT(*) as count FROM ai_city_tasks'),
      pool.query('SELECT COUNT(*) as count FROM training_pipeline_runs')
    ]);

    res.json({
      users: parseInt(stats[0].rows[0].count),
      agents: parseInt(stats[1].rows[0].count),
      workflows: parseInt(stats[2].rows[0].count),
      workflowExecutions: parseInt(stats[3].rows[0].count),
      userAgentExecutions: parseInt(stats[4].rows[0].count),
      aiCityTasks: parseInt(stats[5].rows[0].count),
      trainingPipelineRuns: parseInt(stats[6].rows[0].count)
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get system logs
router.get('/logs', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50, level } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, level, message, context, user_id, created_at
      FROM system_logs
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (level) {
      paramCount++;
      query += ` AND level = $${paramCount}`;
      params.push(level);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM system_logs WHERE 1=1';
    const countParams = [];
    let countParamCount = 0;

    if (level) {
      countParamCount++;
      countQuery += ` AND level = $${countParamCount}`;
      countParams.push(level);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      logs: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get admin logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user management data
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, role } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, email, first_name, last_name, role, status, subscription_plan, subscription_status, created_at, last_login
      FROM users
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (role) {
      paramCount++;
      query += ` AND role = $${paramCount}`;
      params.push(role);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM users WHERE 1=1';
    const countParams = [];
    let countParamCount = 0;

    if (status) {
      countParamCount++;
      countQuery += ` AND status = $${countParamCount}`;
      countParams.push(status);
    }

    if (role) {
      countParamCount++;
      countQuery += ` AND role = $${countParamCount}`;
      countParams.push(role);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      users: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user (admin only)
router.post('/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, passwordHash, firstName, lastName, role || 'user']
    );

    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user status/role
router.put('/users/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, role } = req.body;

    const result = await pool.query(
      'UPDATE users SET status = $1, role = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [status, role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get billing overview
router.get('/billing', verifyToken, requireAdmin, async (req, res) => {
  try {
    const billingStats = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM billing_transactions'),
      pool.query('SELECT SUM(amount) as total FROM billing_transactions WHERE status = $1', ['completed']),
      pool.query('SELECT COUNT(*) as count FROM users WHERE subscription_status = $1', ['active']),
      pool.query('SELECT subscription_plan, COUNT(*) as count FROM users GROUP BY subscription_plan')
    ]);

    res.json({
      totalTransactions: parseInt(billingStats[0].rows[0].count),
      totalRevenue: parseFloat(billingStats[1].rows[0].total || 0),
      activeSubscriptions: parseInt(billingStats[2].rows[0].count),
      subscriptionBreakdown: billingStats[3].rows
    });
  } catch (error) {
    console.error('Get admin billing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get workflow management data
router.get('/workflows', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT w.*, u.email as created_by_email
      FROM workflows w
      LEFT JOIN users u ON w.created_by = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND w.status = $${paramCount}`;
      params.push(status);
    }

    query += ` ORDER BY w.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM workflows w WHERE 1=1';
    const countParams = [];
    let countParamCount = 0;

    if (status) {
      countParamCount++;
      countQuery += ` AND w.status = $${countParamCount}`;
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
    console.error('Get admin workflows error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get execution analytics
router.get('/executions/analytics', verifyToken, requireAdmin, async (req, res) => {
  try {
    const analytics = await Promise.all([
      pool.query('SELECT status, COUNT(*) as count FROM workflow_executions GROUP BY status'),
      pool.query('SELECT DATE(started_at) as date, COUNT(*) as count FROM workflow_executions WHERE started_at >= NOW() - INTERVAL \'30 days\' GROUP BY DATE(started_at) ORDER BY date'),
      pool.query('SELECT w.name, COUNT(e.id) as execution_count FROM workflows w LEFT JOIN workflow_executions e ON w.id = e.workflow_id GROUP BY w.id, w.name ORDER BY execution_count DESC LIMIT 10')
    ]);

    res.json({
      statusBreakdown: analytics[0].rows,
      dailyExecutions: analytics[1].rows,
      topWorkflows: analytics[2].rows
    });
  } catch (error) {
    console.error('Get execution analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
