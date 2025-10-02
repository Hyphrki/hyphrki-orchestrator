const n8nService = require('../src/services/n8nService');
const axios = require('axios');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('N8N Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.N8N_BASE_URL = 'http://localhost:5678';
    process.env.N8N_API_KEY = 'test-api-key';
  });

  describe('createWorkflow', () => {
    it('should create a new workflow', async () => {
      const workflowData = {
        name: 'Test Workflow',
        description: 'A test workflow',
        definition: { nodes: [], connections: {} },
        createdBy: 'user-123'
      };

      const mockResponse = {
        data: {
          id: 'workflow-123',
          name: 'Test Workflow',
          active: true
        }
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await n8nService.createWorkflow(workflowData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:5678/api/v1/workflows',
        expect.objectContaining({
          name: 'Test Workflow',
          description: 'A test workflow',
          nodes: [],
          connections: {}
        }),
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key',
            'Content-Type': 'application/json'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      const workflowData = {
        name: 'Test Workflow',
        description: 'A test workflow',
        definition: { nodes: [], connections: {} },
        createdBy: 'user-123'
      };

      mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));

      await expect(n8nService.createWorkflow(workflowData)).rejects.toThrow('API Error');
    });
  });

  describe('getWorkflow', () => {
    it('should get a workflow by ID', async () => {
      const workflowId = 'workflow-123';
      const mockResponse = {
        data: {
          id: 'workflow-123',
          name: 'Test Workflow',
          active: true,
          nodes: [],
          connections: {}
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await n8nService.getWorkflow(workflowId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/workflows/${workflowId}`,
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('updateWorkflow', () => {
    it('should update a workflow', async () => {
      const workflowId = 'workflow-123';
      const updateData = {
        name: 'Updated Workflow',
        description: 'Updated description'
      };

      const mockResponse = {
        data: {
          id: 'workflow-123',
          name: 'Updated Workflow',
          description: 'Updated description'
        }
      };

      mockedAxios.put.mockResolvedValueOnce(mockResponse);

      const result = await n8nService.updateWorkflow(workflowId, updateData);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/workflows/${workflowId}`,
        updateData,
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key',
            'Content-Type': 'application/json'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('deleteWorkflow', () => {
    it('should delete a workflow', async () => {
      const workflowId = 'workflow-123';

      mockedAxios.delete.mockResolvedValueOnce({ data: { success: true } });

      await n8nService.deleteWorkflow(workflowId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/workflows/${workflowId}`,
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key'
          }
        })
      );
    });
  });

  describe('executeWorkflow', () => {
    it('should execute a workflow', async () => {
      const workflowId = 'workflow-123';
      const inputData = { test: 'data' };

      const mockResponse = {
        data: {
          executionId: 'exec-123',
          status: 'running',
          startedAt: '2024-01-01T00:00:00Z'
        }
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await n8nService.executeWorkflow(workflowId, inputData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/workflows/${workflowId}/execute`,
        inputData,
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key',
            'Content-Type': 'application/json'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getExecution', () => {
    it('should get execution details', async () => {
      const executionId = 'exec-123';
      const mockResponse = {
        data: {
          id: 'exec-123',
          status: 'success',
          startedAt: '2024-01-01T00:00:00Z',
          stoppedAt: '2024-01-01T00:01:00Z',
          data: { result: 'success' }
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await n8nService.getExecution(executionId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/executions/${executionId}`,
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('cancelExecution', () => {
    it('should cancel an execution', async () => {
      const executionId = 'exec-123';

      mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

      await n8nService.cancelExecution(executionId);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/executions/${executionId}/cancel`,
        {},
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key',
            'Content-Type': 'application/json'
          }
        })
      );
    });
  });

  describe('getExecutions', () => {
    it('should get executions with pagination', async () => {
      const workflowId = 'workflow-123';
      const limit = 20;
      const offset = 0;

      const mockResponse = {
        data: {
          data: [
            { id: 'exec-1', status: 'success' },
            { id: 'exec-2', status: 'running' }
          ],
          count: 2
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await n8nService.getExecutions(workflowId, limit, offset);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/executions`,
        expect.objectContaining({
          params: {
            workflowId,
            limit,
            offset
          },
          headers: {
            'X-N8N-API-KEY': 'test-api-key'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getExecutionLogs', () => {
    it('should get execution logs', async () => {
      const executionId = 'exec-123';
      const mockResponse = {
        data: {
          logs: [
            { level: 'info', message: 'Workflow started' },
            { level: 'error', message: 'Node failed' }
          ]
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await n8nService.getExecutionLogs(executionId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:5678/api/v1/executions/${executionId}/logs`,
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('syncWorkflows', () => {
    it('should sync workflows from N8N', async () => {
      const mockWorkflows = {
        data: [
          { id: 'workflow-1', name: 'Workflow 1' },
          { id: 'workflow-2', name: 'Workflow 2' }
        ]
      };

      mockedAxios.get.mockResolvedValueOnce(mockWorkflows);

      const result = await n8nService.syncWorkflows();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5678/api/v1/workflows',
        expect.objectContaining({
          headers: {
            'X-N8N-API-KEY': 'test-api-key'
          }
        })
      );

      expect(result).toEqual(mockWorkflows.data);
    });
  });
});
