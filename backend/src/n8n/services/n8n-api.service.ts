import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface N8NWorkflow {
  id: string;
  name: string;
  active: boolean;
  nodes: any[];
  connections: any;
  settings?: any;
  staticData?: any;
  tags?: string[];
  versionId?: string;
}

export interface N8NExecution {
  id: string;
  finished: boolean;
  mode: string;
  startedAt: string;
  stoppedAt?: string;
  status: 'success' | 'error' | 'waiting' | 'running';
  workflowData: {
    id: string;
    name: string;
    nodes: any[];
    connections: any;
  };
  data: {
    resultData: {
      runData: any;
    };
  };
  error?: {
    message: string;
    node?: {
      name: string;
      type: string;
    };
  };
}

export interface N8NExecutionResponse {
  executionId: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  message?: string;
}

@Injectable()
export class N8NApiService {
  private readonly logger = new Logger(N8NApiService.name);
  private readonly httpClient: AxiosInstance;
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly webhookBaseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get('N8N_API_URL', 'http://localhost:8004');
    this.apiKey = this.configService.get('N8N_API_KEY', '');
    this.webhookBaseUrl = this.configService.get('N8N_WEBHOOK_BASE_URL', 'http://localhost:8004/webhook');

    this.httpClient = axios.create({
      baseURL: this.apiUrl,
      timeout: 30000,
      headers: {
        'X-N8N-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Add request/response interceptors for logging
    this.httpClient.interceptors.request.use(
      (config) => {
        this.logger.debug(`N8N API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        this.logger.error('N8N API Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.httpClient.interceptors.response.use(
      (response) => {
        this.logger.debug(`N8N API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        this.logger.error('N8N API Response Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          message: error.message,
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * Create a workflow in N8N from JSON
   */
  async createWorkflow(workflowJson: any): Promise<N8NWorkflow> {
    try {
      const response: AxiosResponse<N8NWorkflow> = await this.httpClient.post('/api/v1/workflows', {
        name: workflowJson.name || 'Imported Workflow',
        nodes: workflowJson.nodes || [],
        connections: workflowJson.connections || {},
        settings: workflowJson.settings || {},
        staticData: workflowJson.staticData || {},
        tags: workflowJson.tags || [],
        active: false, // Start inactive, admin will activate
      });

      this.logger.log(`Created N8N workflow: ${response.data.id}`);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to create N8N workflow:', error);
      throw new HttpException(
        'Failed to create workflow in N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Get workflow by ID
   */
  async getWorkflow(workflowId: string): Promise<N8NWorkflow> {
    try {
      const response: AxiosResponse<N8NWorkflow> = await this.httpClient.get(`/api/v1/workflows/${workflowId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get N8N workflow ${workflowId}:`, error);
      throw new HttpException(
        'Failed to retrieve workflow from N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Update workflow
   */
  async updateWorkflow(workflowId: string, workflowData: Partial<N8NWorkflow>): Promise<N8NWorkflow> {
    try {
      const response: AxiosResponse<N8NWorkflow> = await this.httpClient.put(
        `/api/v1/workflows/${workflowId}`,
        workflowData
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to update N8N workflow ${workflowId}:`, error);
      throw new HttpException(
        'Failed to update workflow in N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Activate/deactivate workflow
   */
  async setWorkflowActive(workflowId: string, active: boolean): Promise<void> {
    try {
      await this.httpClient.patch(`/api/v1/workflows/${workflowId}`, { active });
      this.logger.log(`Set workflow ${workflowId} active: ${active}`);
    } catch (error) {
      this.logger.error(`Failed to set workflow ${workflowId} active:`, error);
      throw new HttpException(
        'Failed to update workflow status in N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Delete workflow
   */
  async deleteWorkflow(workflowId: string): Promise<void> {
    try {
      await this.httpClient.delete(`/api/v1/workflows/${workflowId}`);
      this.logger.log(`Deleted N8N workflow: ${workflowId}`);
    } catch (error) {
      this.logger.error(`Failed to delete N8N workflow ${workflowId}:`, error);
      throw new HttpException(
        'Failed to delete workflow from N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Execute workflow via webhook
   */
  async executeWorkflow(webhookPath: string, parameters: Record<string, any>): Promise<N8NExecutionResponse> {
    try {
      const webhookUrl = `${this.webhookBaseUrl}/${webhookPath}`;
      
      const response: AxiosResponse = await this.httpClient.post(webhookUrl, parameters, {
        timeout: 10000, // 10 second timeout for webhook trigger
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // N8N webhook should return execution ID
      const executionId = response.data?.executionId || response.data?.id || response.headers['x-execution-id'];
      
      if (!executionId) {
        throw new Error('No execution ID returned from N8N webhook');
      }

      return {
        executionId,
        status: 'queued',
        message: 'Execution triggered successfully',
      };
    } catch (error) {
      this.logger.error(`Failed to execute workflow via webhook ${webhookPath}:`, error);
      throw new HttpException(
        'Failed to execute workflow in N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Get execution status
   */
  async getExecutionStatus(executionId: string): Promise<N8NExecution> {
    try {
      const response: AxiosResponse<N8NExecution> = await this.httpClient.get(`/api/v1/executions/${executionId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get N8N execution ${executionId}:`, error);
      throw new HttpException(
        'Failed to retrieve execution status from N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * List recent executions
   */
  async listExecutions(limit: number = 20): Promise<N8NExecution[]> {
    try {
      const response: AxiosResponse<{ data: N8NExecution[] }> = await this.httpClient.get('/api/v1/executions', {
        params: { limit },
      });
      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to list N8N executions:', error);
      throw new HttpException(
        'Failed to retrieve executions from N8N',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Test N8N API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.httpClient.get('/api/v1/workflows', { params: { limit: 1 } });
      this.logger.log('N8N API connection test successful');
      return true;
    } catch (error) {
      this.logger.error('N8N API connection test failed:', error);
      return false;
    }
  }

  /**
   * Get webhook URL for a workflow
   */
  getWebhookUrl(webhookPath: string): string {
    return `${this.webhookBaseUrl}/${webhookPath}`;
  }
}
