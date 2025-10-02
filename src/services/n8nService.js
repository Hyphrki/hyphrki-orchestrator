const axios = require('axios');
const { Pool } = require('pg');
const WebSocket = require('ws');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://hyphrki_user:hyphrki123@localhost:5432/hyphrki_platform'
});

class N8NService {
  constructor() {
    this.baseUrl = process.env.N8N_URL || 'http://localhost:5679';
    this.apiKey = process.env.N8N_API_KEY || 'your-n8n-api-key';
    this.wsClients = new Map(); // Store WebSocket connections by user
    this.isInitialized = false;
  }

  // Initialize N8N connection
  async initialize() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v1/workflows`, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });
      console.log('N8N connection established');
      this.isInitialized = true;
      
      // Start WebSocket server for real-time updates
      this.startWebSocketServer();
      
      // Sync existing workflows from database
      await this.syncWorkflowsFromDatabase();
      
      return true;
    } catch (error) {
      console.error('Failed to connect to N8N:', error.message);
      return false;
    }
  }

  // Start WebSocket server for real-time updates
  startWebSocketServer() {
    const WebSocketServer = require('ws').WebSocketServer;
    const wss = new WebSocketServer({ port: process.env.WS_PORT || 5679 });
    
    wss.on('connection', (ws, req) => {
      console.log('New WebSocket connection');
      
      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message);
          
          if (data.type === 'authenticate') {
            // Verify JWT token
            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
            
            // Store connection with user info
            this.wsClients.set(decoded.userId, {
              ws,
              userId: decoded.userId,
              organizationId: decoded.organizationId
            });
            
            ws.send(JSON.stringify({ type: 'authenticated', userId: decoded.userId }));
          }
        } catch (error) {
          console.error('WebSocket message error:', error);
          ws.send(JSON.stringify({ type: 'error', message: 'Invalid message' }));
        }
      });
      
      ws.on('close', () => {
        // Remove client from map
        for (const [userId, client] of this.wsClients.entries()) {
          if (client.ws === ws) {
            this.wsClients.delete(userId);
            break;
          }
        }
      });
    });
    
    console.log(`WebSocket server started on port ${process.env.WS_PORT || 5679}`);
  }

  // Broadcast message to user's organization
  broadcastToOrganization(organizationId, message) {
    for (const [userId, client] of this.wsClients.entries()) {
      if (client.organizationId === organizationId && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(message));
      }
    }
  }

  // Sync workflows from database to N8N
  async syncWorkflowsFromDatabase() {
    try {
      const result = await pool.query(
        'SELECT id, name, description, definition, status FROM workflows WHERE status = $1',
        ['active']
      );
      
      for (const workflow of result.rows) {
        try {
          await this.deployWorkflowToN8N(workflow);
        } catch (error) {
          console.error(`Failed to sync workflow ${workflow.id}:`, error.message);
        }
      }
      
      console.log(`Synced ${result.rows.length} workflows to N8N`);
    } catch (error) {
      console.error('Failed to sync workflows from database:', error.message);
    }
  }

  // Deploy workflow to N8N
  async deployWorkflowToN8N(workflow) {
    try {
      const workflowDefinition = typeof workflow.definition === 'string' 
        ? JSON.parse(workflow.definition) 
        : workflow.definition;

      const n8nWorkflowData = {
        name: workflow.name,
        description: workflow.description || '',
        nodes: workflowDefinition.nodes || [],
        connections: workflowDefinition.connections || {},
        active: workflow.status === 'active',
        settings: workflowDefinition.settings || {}
      };

      const response = await axios.post(`${this.baseUrl}/api/v1/workflows`, n8nWorkflowData, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to deploy workflow to N8N:', error.message);
      throw error;
    }
  }

  // Create a new workflow
  async createWorkflow(workflowData) {
    try {
      // First, store workflow in database
      const dbResult = await pool.query(
        `INSERT INTO workflows (name, description, status, definition, owner_id, organization_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
         RETURNING id`,
        [
          workflowData.name,
          workflowData.description || '',
          'draft',
          JSON.stringify(workflowData.definition),
          workflowData.ownerId,
          workflowData.organizationId
        ]
      );

      const workflowId = dbResult.rows[0].id;

      // If workflow should be active, deploy to N8N
      if (workflowData.status === 'active') {
        try {
          const n8nResponse = await this.deployWorkflowToN8N({
            id: workflowId,
            name: workflowData.name,
            description: workflowData.description,
            definition: workflowData.definition,
            status: 'active'
          });

          // Update database with N8N workflow ID
          await pool.query(
            'UPDATE workflows SET n8n_workflow_id = $1, status = $2 WHERE id = $3',
            [n8nResponse.id, 'active', workflowId]
          );

          // Broadcast to organization
          this.broadcastToOrganization(workflowData.organizationId, {
            type: 'workflow_created',
            workflowId,
            workflowName: workflowData.name,
            status: 'active'
          });

        } catch (n8nError) {
          console.error('Failed to deploy to N8N, keeping as draft:', n8nError.message);
          // Keep workflow as draft if N8N deployment fails
        }
      }

      return { id: workflowId, ...workflowData };
    } catch (error) {
      console.error('Failed to create workflow:', error.message);
      throw error;
    }
  }

  // Update an existing workflow
  async updateWorkflow(workflowId, workflowData) {
    try {
      // Get N8N workflow ID from database
      const dbResult = await pool.query(
        'SELECT n8n_workflow_id FROM workflows WHERE id = $1',
        [workflowId]
      );

      if (dbResult.rows.length === 0) {
        throw new Error('Workflow not found');
      }

      const n8nWorkflowId = dbResult.rows[0].n8n_workflow_id;

      const response = await axios.put(`${this.baseUrl}/api/v1/workflows/${n8nWorkflowId}`, workflowData, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      // Update workflow in database
      await pool.query(
        `UPDATE workflows 
         SET name = $1, description = $2, definition = $3, updated_at = NOW()
         WHERE id = $4`,
        [workflowData.name, workflowData.description, JSON.stringify(workflowData), workflowId]
      );

      return response.data;
    } catch (error) {
      console.error('Failed to update workflow:', error.message);
      throw error;
    }
  }

  // Delete a workflow
  async deleteWorkflow(workflowId) {
    try {
      // Get N8N workflow ID from database
      const dbResult = await pool.query(
        'SELECT n8n_workflow_id FROM workflows WHERE id = $1',
        [workflowId]
      );

      if (dbResult.rows.length === 0) {
        throw new Error('Workflow not found');
      }

      const n8nWorkflowId = dbResult.rows[0].n8n_workflow_id;

      await axios.delete(`${this.baseUrl}/api/v1/workflows/${n8nWorkflowId}`, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      // Soft delete workflow in database
      await pool.query(
        'UPDATE workflows SET status = $1, updated_at = NOW() WHERE id = $2',
        ['inactive', workflowId]
      );

      return true;
    } catch (error) {
      console.error('Failed to delete workflow:', error.message);
      throw error;
    }
  }

  // Execute a workflow
  async executeWorkflow(workflowId, inputData = {}, userId, organizationId) {
    try {
      // Get workflow details from database
      const dbResult = await pool.query(
        'SELECT n8n_workflow_id, name FROM workflows WHERE id = $1 AND status = $2',
        [workflowId, 'active']
      );

      if (dbResult.rows.length === 0) {
        throw new Error('Workflow not found or inactive');
      }

      const { n8n_workflow_id, name: workflowName } = dbResult.rows[0];

      // Create execution record first
      const executionResult = await pool.query(
        `INSERT INTO workflow_executions (workflow_id, user_id, organization_id, status, mode, input_data, started_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())
         RETURNING id`,
        [
          workflowId,
          userId,
          organizationId,
          'pending',
          'manual',
          JSON.stringify(inputData)
        ]
      );

      const executionId = executionResult.rows[0].id;

      try {
        // Execute workflow in N8N
        const response = await axios.post(`${this.baseUrl}/api/v1/workflows/${n8n_workflow_id}/execute`, {
          data: inputData,
        }, {
          headers: {
            'X-N8N-API-KEY': this.apiKey,
            'Content-Type': 'application/json',
          },
        });

        // Update execution with N8N execution ID
        await pool.query(
          'UPDATE workflow_executions SET n8n_execution_id = $1, status = $2 WHERE id = $3',
          [response.data.executionId, 'running', executionId]
        );

        // Broadcast execution started
        this.broadcastToOrganization(organizationId, {
          type: 'execution_started',
          executionId,
          workflowId,
          workflowName,
          status: 'running',
          userId
        });

        // Start monitoring execution
        this.monitorExecution(executionId, response.data.executionId, organizationId);

        return {
          executionId,
          n8nExecutionId: response.data.executionId,
          status: 'running'
        };

      } catch (n8nError) {
        // Update execution status to failed
        await pool.query(
          'UPDATE workflow_executions SET status = $1, error_message = $2, completed_at = NOW() WHERE id = $3',
          ['failed', n8nError.message, executionId]
        );

        // Broadcast execution failed
        this.broadcastToOrganization(organizationId, {
          type: 'execution_failed',
          executionId,
          workflowId,
          workflowName,
          status: 'failed',
          error: n8nError.message,
          userId
        });

        throw n8nError;
      }

    } catch (error) {
      console.error('Failed to execute workflow:', error.message);
      throw error;
    }
  }

  // Monitor execution progress
  async monitorExecution(executionId, n8nExecutionId, organizationId) {
    const checkInterval = setInterval(async () => {
      try {
        const response = await axios.get(`${this.baseUrl}/api/v1/executions/${n8nExecutionId}`, {
          headers: {
            'X-N8N-API-KEY': this.apiKey,
          },
        });

        const execution = response.data;
        const isFinished = execution.finished;
        const status = isFinished ? (execution.success ? 'success' : 'failed') : 'running';

        // Update database
        await pool.query(
          `UPDATE workflow_executions 
           SET status = $1, output_data = $2, error_message = $3, completed_at = $4, duration_ms = $5
           WHERE id = $6`,
          [
            status,
            JSON.stringify(execution.data || {}),
            execution.error?.message || null,
            isFinished ? new Date() : null,
            execution.duration || null,
            executionId
          ]
        );

        // Broadcast status update
        this.broadcastToOrganization(organizationId, {
          type: 'execution_update',
          executionId,
          status,
          isFinished,
          duration: execution.duration,
          error: execution.error?.message
        });

        if (isFinished) {
          clearInterval(checkInterval);
        }

      } catch (error) {
        console.error('Failed to monitor execution:', error.message);
        clearInterval(checkInterval);
      }
    }, 2000); // Check every 2 seconds
  }

  // Get workflow execution status
  async getExecutionStatus(executionId) {
    try {
      const dbResult = await pool.query(
        'SELECT n8n_execution_id FROM workflow_executions WHERE id = $1',
        [executionId]
      );

      if (dbResult.rows.length === 0) {
        throw new Error('Execution not found');
      }

      const n8nExecutionId = dbResult.rows[0].n8n_execution_id;

      const response = await axios.get(`${this.baseUrl}/api/v1/executions/${n8nExecutionId}`, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      // Update execution status in database
      const status = response.data.finished ? 'success' : 'running';
      await pool.query(
        `UPDATE workflow_executions 
         SET status = $1, stopped_at = $2, data = $3
         WHERE id = $4`,
        [
          status,
          response.data.finished ? new Date() : null,
          JSON.stringify(response.data.data),
          executionId
        ]
      );

      return {
        id: executionId,
        status,
        data: response.data.data,
        finished: response.data.finished,
        startedAt: response.data.startedAt,
        stoppedAt: response.data.stoppedAt
      };
    } catch (error) {
      console.error('Failed to get execution status:', error.message);
      throw error;
    }
  }

  // Get all workflows
  async getWorkflows() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v1/workflows`, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to get workflows:', error.message);
      throw error;
    }
  }

  // Get workflow by ID
  async getWorkflow(workflowId) {
    try {
      // Get N8N workflow ID from database
      const dbResult = await pool.query(
        'SELECT n8n_workflow_id FROM workflows WHERE id = $1',
        [workflowId]
      );

      if (dbResult.rows.length === 0) {
        throw new Error('Workflow not found');
      }

      const n8nWorkflowId = dbResult.rows[0].n8n_workflow_id;

      const response = await axios.get(`${this.baseUrl}/api/v1/workflows/${n8nWorkflowId}`, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to get workflow:', error.message);
      throw error;
    }
  }

  // Get workflow executions
  async getExecutions(workflowId, limit = 20, offset = 0) {
    try {
      const result = await pool.query(
        `SELECT id, workflow_id, n8n_execution_id, status, mode, started_at, stopped_at, data
         FROM workflow_executions 
         WHERE workflow_id = $1
         ORDER BY started_at DESC
         LIMIT $2 OFFSET $3`,
        [workflowId, limit, offset]
      );

      return result.rows;
    } catch (error) {
      console.error('Failed to get executions:', error.message);
      throw error;
    }
  }

  // Create custom N8N node
  async createCustomNode(nodeData) {
    try {
      // This would integrate with N8N's custom node system
      // For now, we'll store the node definition in the database
      const result = await pool.query(
        `INSERT INTO custom_nodes (name, description, definition, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING id`,
        [nodeData.name, nodeData.description, JSON.stringify(nodeData)]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Failed to create custom node:', error.message);
      throw error;
    }
  }

  // Sync workflows with database
  async syncWorkflows() {
    try {
      const n8nWorkflows = await this.getWorkflows();
      
      for (const workflow of n8nWorkflows) {
        const existingWorkflow = await pool.query(
          'SELECT id FROM workflows WHERE n8n_workflow_id = $1',
          [workflow.id]
        );

        if (existingWorkflow.rows.length === 0) {
          // Create new workflow in database
          await pool.query(
            `INSERT INTO workflows (name, description, n8n_workflow_id, status, definition, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
            [
              workflow.name,
              workflow.description || '',
              workflow.id,
              workflow.active ? 'active' : 'inactive',
              JSON.stringify(workflow)
            ]
          );
        } else {
          // Update existing workflow
          await pool.query(
            `UPDATE workflows 
             SET name = $1, description = $2, status = $3, definition = $4, updated_at = NOW()
             WHERE n8n_workflow_id = $5`,
            [
              workflow.name,
              workflow.description || '',
              workflow.active ? 'active' : 'inactive',
              JSON.stringify(workflow),
              workflow.id
            ]
          );
        }
      }

      console.log('Workflows synced successfully');
      return true;
    } catch (error) {
      console.error('Failed to sync workflows:', error.message);
      throw error;
    }
  }
}

module.exports = new N8NService();
