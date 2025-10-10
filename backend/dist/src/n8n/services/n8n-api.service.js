"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var N8NApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8NApiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let N8NApiService = N8NApiService_1 = class N8NApiService {
    configService;
    logger = new common_1.Logger(N8NApiService_1.name);
    httpClient;
    apiUrl;
    apiKey;
    webhookBaseUrl;
    constructor(configService) {
        this.configService = configService;
        this.apiUrl = this.configService.get('N8N_API_URL', 'http://localhost:8004');
        this.apiKey = this.configService.get('N8N_API_KEY', '');
        this.webhookBaseUrl = this.configService.get('N8N_WEBHOOK_BASE_URL', 'http://localhost:8004/webhook');
        this.httpClient = axios_1.default.create({
            baseURL: this.apiUrl,
            timeout: 30000,
            headers: {
                'X-N8N-API-KEY': this.apiKey,
                'Content-Type': 'application/json',
            },
        });
        this.httpClient.interceptors.request.use((config) => {
            this.logger.debug(`N8N API Request: ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        }, (error) => {
            this.logger.error('N8N API Request Error:', error);
            return Promise.reject(error);
        });
        this.httpClient.interceptors.response.use((response) => {
            this.logger.debug(`N8N API Response: ${response.status} ${response.config.url}`);
            return response;
        }, (error) => {
            this.logger.error('N8N API Response Error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url,
                message: error.message,
            });
            return Promise.reject(error);
        });
    }
    async createWorkflow(workflowJson) {
        try {
            const response = await this.httpClient.post('/api/v1/workflows', {
                name: workflowJson.name || 'Imported Workflow',
                nodes: workflowJson.nodes || [],
                connections: workflowJson.connections || {},
                settings: workflowJson.settings || {},
                staticData: workflowJson.staticData || {},
                tags: workflowJson.tags || [],
                active: false,
            });
            this.logger.log(`Created N8N workflow: ${response.data.id}`);
            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to create N8N workflow:', error);
            throw new common_1.HttpException('Failed to create workflow in N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async getWorkflow(workflowId) {
        try {
            const response = await this.httpClient.get(`/api/v1/workflows/${workflowId}`);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to get N8N workflow ${workflowId}:`, error);
            throw new common_1.HttpException('Failed to retrieve workflow from N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async updateWorkflow(workflowId, workflowData) {
        try {
            const response = await this.httpClient.put(`/api/v1/workflows/${workflowId}`, workflowData);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to update N8N workflow ${workflowId}:`, error);
            throw new common_1.HttpException('Failed to update workflow in N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async setWorkflowActive(workflowId, active) {
        try {
            await this.httpClient.patch(`/api/v1/workflows/${workflowId}`, { active });
            this.logger.log(`Set workflow ${workflowId} active: ${active}`);
        }
        catch (error) {
            this.logger.error(`Failed to set workflow ${workflowId} active:`, error);
            throw new common_1.HttpException('Failed to update workflow status in N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async deleteWorkflow(workflowId) {
        try {
            await this.httpClient.delete(`/api/v1/workflows/${workflowId}`);
            this.logger.log(`Deleted N8N workflow: ${workflowId}`);
        }
        catch (error) {
            this.logger.error(`Failed to delete N8N workflow ${workflowId}:`, error);
            throw new common_1.HttpException('Failed to delete workflow from N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async executeWorkflow(webhookPath, parameters) {
        try {
            const webhookUrl = `${this.webhookBaseUrl}/${webhookPath}`;
            const response = await this.httpClient.post(webhookUrl, parameters, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const executionId = response.data?.executionId || response.data?.id || response.headers['x-execution-id'];
            if (!executionId) {
                throw new Error('No execution ID returned from N8N webhook');
            }
            return {
                executionId,
                status: 'queued',
                message: 'Execution triggered successfully',
            };
        }
        catch (error) {
            this.logger.error(`Failed to execute workflow via webhook ${webhookPath}:`, error);
            throw new common_1.HttpException('Failed to execute workflow in N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async getExecutionStatus(executionId) {
        try {
            const response = await this.httpClient.get(`/api/v1/executions/${executionId}`);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to get N8N execution ${executionId}:`, error);
            throw new common_1.HttpException('Failed to retrieve execution status from N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async listExecutions(limit = 20) {
        try {
            const response = await this.httpClient.get('/api/v1/executions', {
                params: { limit },
            });
            return response.data.data;
        }
        catch (error) {
            this.logger.error('Failed to list N8N executions:', error);
            throw new common_1.HttpException('Failed to retrieve executions from N8N', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async testConnection() {
        try {
            await this.httpClient.get('/api/v1/workflows', { params: { limit: 1 } });
            this.logger.log('N8N API connection test successful');
            return true;
        }
        catch (error) {
            this.logger.error('N8N API connection test failed:', error);
            return false;
        }
    }
    getWebhookUrl(webhookPath) {
        return `${this.webhookBaseUrl}/${webhookPath}`;
    }
};
exports.N8NApiService = N8NApiService;
exports.N8NApiService = N8NApiService = N8NApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], N8NApiService);
//# sourceMappingURL=n8n-api.service.js.map