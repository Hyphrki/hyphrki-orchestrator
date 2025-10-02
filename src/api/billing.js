const express = require('express');
const { Pool } = require('pg');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:dev_password_123@localhost:5432/hyphrki_platform'
});

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const plans = [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        currency: 'USD',
        interval: 'month',
        features: [
          '5 AI agents',
          '10 workflow executions per month',
          'Basic support',
          'Community access'
        ],
        limits: {
          agents: 5,
          executions: 10,
          storage: '1GB'
        }
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 29,
        currency: 'USD',
        interval: 'month',
        features: [
          '50 AI agents',
          '1000 workflow executions per month',
          'Priority support',
          'Advanced analytics',
          'Custom integrations'
        ],
        limits: {
          agents: 50,
          executions: 1000,
          storage: '10GB'
        }
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99,
        currency: 'USD',
        interval: 'month',
        features: [
          'Unlimited AI agents',
          'Unlimited workflow executions',
          '24/7 dedicated support',
          'Custom AI training',
          'On-premise deployment',
          'SLA guarantee'
        ],
        limits: {
          agents: -1, // unlimited
          executions: -1, // unlimited
          storage: '100GB'
        }
      }
    ];

    res.json({ plans });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's current subscription
router.get('/subscription', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT subscription_plan, subscription_status, subscription_start_date, 
              subscription_end_date, subscription_cancel_at_period_end
       FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      plan: user.subscription_plan || 'free',
      status: user.subscription_status || 'inactive',
      startDate: user.subscription_start_date,
      endDate: user.subscription_end_date,
      cancelAtPeriodEnd: user.subscription_cancel_at_period_end || false
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create subscription
router.post('/subscribe', verifyToken, async (req, res) => {
  try {
    const { planId, paymentMethodId } = req.body;

    if (!planId) {
      return res.status(400).json({ error: 'Plan ID is required' });
    }

    // Validate plan
    const validPlans = ['free', 'pro', 'enterprise'];
    if (!validPlans.includes(planId)) {
      return res.status(400).json({ error: 'Invalid plan ID' });
    }

    // For free plan, no payment required
    if (planId === 'free') {
      await pool.query(
        `UPDATE users 
         SET subscription_plan = $1, subscription_status = 'active',
             subscription_start_date = NOW(), subscription_end_date = NULL,
             updated_at = NOW()
         WHERE id = $2`,
        [planId, req.user.userId]
      );

      return res.json({
        message: 'Subscription created successfully',
        subscription: {
          plan: planId,
          status: 'active',
          startDate: new Date().toISOString()
        }
      });
    }

    // For paid plans, integrate with payment processor (Stripe, etc.)
    // This is a placeholder implementation
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Monthly subscription

    await pool.query(
      `UPDATE users 
       SET subscription_plan = $1, subscription_status = 'active',
           subscription_start_date = $2, subscription_end_date = $3,
           updated_at = NOW()
       WHERE id = $4`,
      [planId, startDate, endDate, req.user.userId]
    );

    res.json({
      message: 'Subscription created successfully',
      subscription: {
        plan: planId,
        status: 'active',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel subscription
router.post('/cancel', verifyToken, async (req, res) => {
  try {
    const { cancelAtPeriodEnd = true } = req.body;

    await pool.query(
      `UPDATE users 
       SET subscription_cancel_at_period_end = $1, updated_at = NOW()
       WHERE id = $2`,
      [cancelAtPeriodEnd, req.user.userId]
    );

    res.json({
      message: cancelAtPeriodEnd 
        ? 'Subscription will be cancelled at the end of the current period'
        : 'Subscription cancelled immediately'
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get billing history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT id, amount, currency, status, description, created_at
       FROM billing_transactions 
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [req.user.userId, limit, offset]
    );

    // Get total count
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM billing_transactions WHERE user_id = $1',
      [req.user.userId]
    );
    const total = parseInt(countResult.rows[0].count);

    res.json({
      transactions: result.rows.map(transaction => ({
        id: transaction.id,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        description: transaction.description,
        createdAt: transaction.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get billing history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get usage statistics
router.get('/usage', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get current month usage
    const usageResult = await pool.query(
      `SELECT 
        COUNT(*) as total_executions,
        COUNT(CASE WHEN status = 'success' THEN 1 END) as successful_executions,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_executions
       FROM workflow_executions 
       WHERE user_id = $1 AND created_at >= DATE_TRUNC('month', NOW())`,
      [userId]
    );

    // Get agent count
    const agentResult = await pool.query(
      'SELECT COUNT(*) as agent_count FROM agents WHERE user_id = $1 AND status = $2',
      [userId, 'active']
    );

    // Get storage usage (placeholder)
    const storageUsage = {
      used: '250MB',
      limit: '1GB',
      percentage: 25
    };

    res.json({
      executions: {
        total: parseInt(usageResult.rows[0].total_executions),
        successful: parseInt(usageResult.rows[0].successful_executions),
        failed: parseInt(usageResult.rows[0].failed_executions)
      },
      agents: {
        count: parseInt(agentResult.rows[0].agent_count)
      },
      storage: storageUsage
    });
  } catch (error) {
    console.error('Get usage error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Webhook for payment processor (Stripe, etc.)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    // This is a placeholder for payment webhook handling
    // In a real implementation, you would verify the webhook signature
    // and handle different event types (payment.succeeded, invoice.payment_failed, etc.)

    const event = req.body;
    
    switch (event.type) {
      case 'invoice.payment_succeeded':
        // Handle successful payment
        console.log('Payment succeeded:', event.data.object);
        break;
      case 'invoice.payment_failed':
        // Handle failed payment
        console.log('Payment failed:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        console.log('Subscription cancelled:', event.data.object);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
