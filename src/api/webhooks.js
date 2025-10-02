const express = require('express');
const crypto = require('crypto');
const { Pool } = require('pg');
const { verifyApiKey, verifyHmacSignature } = require('../middleware/auth');
const router = express.Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:dev_password_123@localhost:5432/hyphrki_platform'
});

// Generic webhook handler
router.post('/generic', verifyApiKey, async (req, res) => {
  try {
    const { event, data, source } = req.body;

    // Log webhook
    await pool.query(
      `INSERT INTO webhook_logs (source, event, payload, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [source || 'unknown', event || 'unknown', JSON.stringify(data)]
    );

    // Process based on event type
    switch (event) {
      case 'workflow.completed':
        await handleWorkflowCompleted(data);
        break;
      case 'agent.status_changed':
        await handleAgentStatusChanged(data);
        break;
      case 'user.subscription_updated':
        await handleSubscriptionUpdated(data);
        break;
      default:
        console.log('Unhandled webhook event:', event);
    }

    res.json({ received: true, event });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// GitHub webhook handler
router.post('/github', verifyApiKey, async (req, res) => {
  try {
    const { action, repository, pull_request, issue } = req.body;

    // Log webhook
    await pool.query(
      `INSERT INTO webhook_logs (source, event, payload, created_at)
       VALUES ($1, $2, $3, NOW())`,
      ['github', action, JSON.stringify(req.body)]
    );

    // Process GitHub events
    switch (action) {
      case 'opened':
        if (pull_request) {
          await handlePullRequestOpened(pull_request, repository);
        } else if (issue) {
          await handleIssueOpened(issue, repository);
        }
        break;
      case 'closed':
        if (pull_request) {
          await handlePullRequestClosed(pull_request, repository);
        }
        break;
      default:
        console.log('Unhandled GitHub event:', action);
    }

    res.json({ received: true, action });
  } catch (error) {
    console.error('GitHub webhook error:', error);
    res.status(500).json({ error: 'GitHub webhook processing failed' });
  }
});

// Slack webhook handler
router.post('/slack', verifyApiKey, async (req, res) => {
  try {
    const { type, event, challenge } = req.body;

    // Handle Slack URL verification
    if (type === 'url_verification') {
      return res.json({ challenge });
    }

    // Log webhook
    await pool.query(
      `INSERT INTO webhook_logs (source, event, payload, created_at)
       VALUES ($1, $2, $3, NOW())`,
      ['slack', type, JSON.stringify(req.body)]
    );

    // Process Slack events
    if (type === 'event_callback') {
      await handleSlackEvent(event);
    }

    res.json({ received: true, type });
  } catch (error) {
    console.error('Slack webhook error:', error);
    res.status(500).json({ error: 'Slack webhook processing failed' });
  }
});

// Discord webhook handler
router.post('/discord', verifyApiKey, async (req, res) => {
  try {
    const { type, data } = req.body;

    // Log webhook
    await pool.query(
      `INSERT INTO webhook_logs (source, event, payload, created_at)
       VALUES ($1, $2, $3, NOW())`,
      ['discord', type, JSON.stringify(req.body)]
    );

    // Process Discord events
    switch (type) {
      case 'MESSAGE_CREATE':
        await handleDiscordMessage(data);
        break;
      case 'GUILD_MEMBER_ADD':
        await handleDiscordMemberJoin(data);
        break;
      default:
        console.log('Unhandled Discord event:', type);
    }

    res.json({ received: true, type });
  } catch (error) {
    console.error('Discord webhook error:', error);
    res.status(500).json({ error: 'Discord webhook processing failed' });
  }
});

// Webhook event handlers
async function handleWorkflowCompleted(data) {
  try {
    const { workflowId, executionId, status, result } = data;
    
    // Update workflow execution status
    await pool.query(
      `UPDATE workflow_executions 
       SET status = $1, result = $2, completed_at = NOW(), updated_at = NOW()
       WHERE id = $3`,
      [status, JSON.stringify(result), executionId]
    );

    // Trigger any dependent workflows
    await triggerDependentWorkflows(workflowId, result);
  } catch (error) {
    console.error('Handle workflow completed error:', error);
  }
}

async function handleAgentStatusChanged(data) {
  try {
    const { agentId, status, message } = data;
    
    // Update agent status
    await pool.query(
      `UPDATE agents 
       SET status = $1, status_message = $2, updated_at = NOW()
       WHERE id = $3`,
      [status, message, agentId]
    );

    // Notify users if agent is offline
    if (status === 'offline') {
      await notifyAgentOffline(agentId);
    }
  } catch (error) {
    console.error('Handle agent status changed error:', error);
  }
}

async function handleSubscriptionUpdated(data) {
  try {
    const { userId, plan, status, endDate } = data;
    
    // Update user subscription
    await pool.query(
      `UPDATE users 
       SET subscription_plan = $1, subscription_status = $2, 
           subscription_end_date = $3, updated_at = NOW()
       WHERE id = $4`,
      [plan, status, endDate, userId]
    );
  } catch (error) {
    console.error('Handle subscription updated error:', error);
  }
}

async function handlePullRequestOpened(pullRequest, repository) {
  try {
    // Create a workflow execution for PR review
    await pool.query(
      `INSERT INTO workflow_executions (workflow_id, user_id, status, input_data, created_at)
       VALUES ($1, $2, 'pending', $3, NOW())`,
      ['pr-review-workflow', null, JSON.stringify({ pullRequest, repository })]
    );
  } catch (error) {
    console.error('Handle PR opened error:', error);
  }
}

async function handleIssueOpened(issue, repository) {
  try {
    // Create a workflow execution for issue triage
    await pool.query(
      `INSERT INTO workflow_executions (workflow_id, user_id, status, input_data, created_at)
       VALUES ($1, $2, 'pending', $3, NOW())`,
      ['issue-triage-workflow', null, JSON.stringify({ issue, repository })]
    );
  } catch (error) {
    console.error('Handle issue opened error:', error);
  }
}

async function handleSlackEvent(event) {
  try {
    const { type, text, user, channel } = event;
    
    if (type === 'message' && text) {
      // Process Slack message
      await pool.query(
        `INSERT INTO webhook_logs (source, event, payload, created_at)
         VALUES ($1, $2, $3, NOW())`,
        ['slack-message', 'message', JSON.stringify({ text, user, channel })]
      );
    }
  } catch (error) {
    console.error('Handle Slack event error:', error);
  }
}

async function handleDiscordMessage(data) {
  try {
    const { content, author, channel_id } = data;
    
    // Process Discord message
    await pool.query(
      `INSERT INTO webhook_logs (source, event, payload, created_at)
       VALUES ($1, $2, $3, NOW())`,
      ['discord-message', 'message', JSON.stringify({ content, author, channel_id })]
    );
  } catch (error) {
    console.error('Handle Discord message error:', error);
  }
}

async function triggerDependentWorkflows(workflowId, result) {
  try {
    // Find workflows that depend on this one
    const dependentWorkflows = await pool.query(
      `SELECT id FROM workflows 
       WHERE trigger_conditions @> $1`,
      [JSON.stringify({ depends_on: workflowId })]
    );

    // Trigger each dependent workflow
    for (const workflow of dependentWorkflows.rows) {
      await pool.query(
        `INSERT INTO workflow_executions (workflow_id, user_id, status, input_data, created_at)
         VALUES ($1, $2, 'pending', $3, NOW())`,
        [workflow.id, null, JSON.stringify({ trigger: 'dependency', result })]
      );
    }
  } catch (error) {
    console.error('Trigger dependent workflows error:', error);
  }
}

async function notifyAgentOffline(agentId) {
  try {
    // Get agent details
    const agentResult = await pool.query(
      'SELECT name, user_id FROM agents WHERE id = $1',
      [agentId]
    );

    if (agentResult.rows.length > 0) {
      const agent = agentResult.rows[0];
      
      // Create notification
      await pool.query(
        `INSERT INTO notifications (user_id, type, title, message, created_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [agent.user_id, 'agent_offline', 'Agent Offline', `Agent "${agent.name}" is offline`]
      );
    }
  } catch (error) {
    console.error('Notify agent offline error:', error);
  }
}

// Get webhook logs (admin only)
router.get('/logs', async (req, res) => {
  try {
    const { page = 1, limit = 50, source, event } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, source, event, payload, created_at
      FROM webhook_logs
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (source) {
      paramCount++;
      query += ` AND source = $${paramCount}`;
      params.push(source);
    }

    if (event) {
      paramCount++;
      query += ` AND event = $${paramCount}`;
      params.push(event);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.json({
      logs: result.rows.map(log => ({
        id: log.id,
        source: log.source,
        event: log.event,
        payload: JSON.parse(log.payload),
        createdAt: log.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get webhook logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
