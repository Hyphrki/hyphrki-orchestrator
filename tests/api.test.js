const request = require('supertest');
const app = require('../src/index');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

// Mock database
jest.mock('pg');
const mockPool = {
  query: jest.fn(),
  connect: jest.fn(),
  end: jest.fn()
};
Pool.mockImplementation(() => mockPool);

describe('API Routes', () => {
  let authToken;
  let adminToken;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create test tokens
    authToken = jwt.sign(
      { userId: 'user-123', email: 'test@example.com', role: 'user' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );

    adminToken = jwt.sign(
      { userId: 'admin-123', email: 'admin@example.com', role: 'admin' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  describe('Authentication Routes', () => {
    describe('POST /api/auth/login', () => {
      it('should login with valid credentials', async () => {
        const mockUser = {
          id: 'user-123',
          email: 'test@example.com',
          password_hash: '$2a$10$hashedpassword',
          first_name: 'Test',
          last_name: 'User'
        };

        mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });

        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'password123'
          });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
      });

      it('should reject invalid credentials', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [] });

        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword'
          });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
      });
    });

    describe('POST /api/auth/register', () => {
      it('should register a new user', async () => {
        const mockUser = {
          id: 'user-123',
          email: 'newuser@example.com',
          first_name: 'New',
          last_name: 'User'
        };

        mockPool.query
          .mockResolvedValueOnce({ rows: [] }) // Check if user exists
          .mockResolvedValueOnce({ rows: [mockUser] }); // Insert user

        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: 'newuser@example.com',
            password: 'password123',
            firstName: 'New',
            lastName: 'User'
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
      });

      it('should reject duplicate email', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [{ id: 'existing-user' }] });

        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: 'existing@example.com',
            password: 'password123',
            firstName: 'Existing',
            lastName: 'User'
          });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });
    });
  });

  describe('User Routes', () => {
    describe('GET /api/users/profile', () => {
      it('should get user profile with valid token', async () => {
        const mockProfile = {
          id: 'user-123',
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User'
        };

        mockPool.query.mockResolvedValueOnce({ rows: [mockProfile] });

        const response = await request(app)
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProfile);
      });

      it('should reject request without token', async () => {
        const response = await request(app)
          .get('/api/users/profile');

        expect(response.status).toBe(401);
      });
    });

    describe('PUT /api/users/profile', () => {
      it('should update user profile', async () => {
        const mockUpdatedUser = {
          id: 'user-123',
          first_name: 'Updated',
          last_name: 'User'
        };

        mockPool.query
          .mockResolvedValueOnce({ rows: [mockUpdatedUser] }) // Update user
          .mockResolvedValueOnce({ rows: [{ id: 'profile-123' }] }); // Update profile

        const response = await request(app)
          .put('/api/users/profile')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            first_name: 'Updated',
            last_name: 'User',
            timezone: 'UTC'
          });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
      });
    });
  });

  describe('Agent Routes', () => {
    describe('GET /api/agents', () => {
      it('should get all agents', async () => {
        const mockAgents = [
          { id: 'agent-1', name: 'Agent 1', category: 'productivity' },
          { id: 'agent-2', name: 'Agent 2', category: 'marketing' }
        ];

        mockPool.query
          .mockResolvedValueOnce({ rows: mockAgents }) // Get agents
          .mockResolvedValueOnce({ rows: [{ count: '2' }] }); // Get count

        const response = await request(app)
          .get('/api/agents');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('agents');
        expect(response.body).toHaveProperty('pagination');
      });

      it('should filter agents by category', async () => {
        const mockAgents = [
          { id: 'agent-1', name: 'Agent 1', category: 'productivity' }
        ];

        mockPool.query
          .mockResolvedValueOnce({ rows: mockAgents })
          .mockResolvedValueOnce({ rows: [{ count: '1' }] });

        const response = await request(app)
          .get('/api/agents?category=productivity');

        expect(response.status).toBe(200);
        expect(response.body.agents).toHaveLength(1);
      });
    });

    describe('POST /api/agents', () => {
      it('should create agent with admin token', async () => {
        const mockAgent = {
          id: 'agent-123',
          name: 'New Agent',
          description: 'A new agent',
          category: 'productivity'
        };

        mockPool.query.mockResolvedValueOnce({ rows: [mockAgent] });

        const response = await request(app)
          .post('/api/agents')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            name: 'New Agent',
            description: 'A new agent',
            category: 'productivity'
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('agent');
      });

      it('should reject creation without admin token', async () => {
        const response = await request(app)
          .post('/api/agents')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            name: 'New Agent',
            description: 'A new agent'
          });

        expect(response.status).toBe(403);
      });
    });
  });

  describe('Workflow Routes', () => {
    describe('GET /api/workflows', () => {
      it('should get workflows with valid token', async () => {
        const mockWorkflows = [
          { id: 'workflow-1', name: 'Workflow 1', status: 'active' },
          { id: 'workflow-2', name: 'Workflow 2', status: 'active' }
        ];

        mockPool.query
          .mockResolvedValueOnce({ rows: mockWorkflows })
          .mockResolvedValueOnce({ rows: [{ count: '2' }] });

        const response = await request(app)
          .get('/api/workflows')
          .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('workflows');
        expect(response.body).toHaveProperty('pagination');
      });
    });

    describe('POST /api/workflows', () => {
      it('should create workflow with valid token', async () => {
        const mockWorkflow = {
          id: 'workflow-123',
          name: 'New Workflow',
          status: 'active'
        };

        // Mock N8N service
        const n8nService = require('../src/services/n8nService');
        jest.spyOn(n8nService, 'createWorkflow').mockResolvedValueOnce(mockWorkflow);

        const response = await request(app)
          .post('/api/workflows')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            name: 'New Workflow',
            description: 'A new workflow',
            definition: { nodes: [], connections: {} }
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('workflow');
      });
    });
  });

  describe('Execution Routes', () => {
    describe('POST /api/executions/trigger', () => {
      it('should trigger workflow execution', async () => {
        const mockExecution = {
          id: 'exec-123',
          status: 'running'
        };

        const n8nService = require('../src/services/n8nService');
        jest.spyOn(n8nService, 'executeWorkflow').mockResolvedValueOnce(mockExecution);

        const response = await request(app)
          .post('/api/executions/trigger')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            workflowId: 'workflow-123',
            inputData: { test: 'data' }
          });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('execution');
      });
    });
  });

  describe('Admin Routes', () => {
    describe('GET /api/admin/stats', () => {
      it('should get system stats with admin token', async () => {
        const mockStats = [
          { rows: [{ count: '10' }] }, // users
          { rows: [{ count: '5' }] },  // agents
          { rows: [{ count: '3' }] }, // workflows
          { rows: [{ count: '20' }] }, // executions
          { rows: [{ count: '15' }] }, // user executions
          { rows: [{ count: '2' }] },  // ai city tasks
          { rows: [{ count: '1' }] }   // training runs
        ];

        mockPool.query
          .mockResolvedValueOnce(mockStats[0])
          .mockResolvedValueOnce(mockStats[1])
          .mockResolvedValueOnce(mockStats[2])
          .mockResolvedValueOnce(mockStats[3])
          .mockResolvedValueOnce(mockStats[4])
          .mockResolvedValueOnce(mockStats[5])
          .mockResolvedValueOnce(mockStats[6]);

        const response = await request(app)
          .get('/api/admin/stats')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
        expect(response.body).toHaveProperty('agents');
        expect(response.body).toHaveProperty('workflows');
      });

      it('should reject request without admin token', async () => {
        const response = await request(app)
          .get('/api/admin/stats')
          .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(403);
      });
    });
  });

  describe('Health Check', () => {
    describe('GET /health', () => {
      it('should return health status', async () => {
        const response = await request(app)
          .get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'healthy');
        expect(response.body).toHaveProperty('timestamp');
      });
    });
  });
});