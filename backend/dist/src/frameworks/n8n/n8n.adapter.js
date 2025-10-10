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
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_framework_adapter_1 = require("../abstraction/base-framework.adapter");
let N8nAdapter = class N8nAdapter extends base_framework_adapter_1.BaseFrameworkAdapter {
    executions = new Map();
    constructor() {
        super('n8n', {
            name: 'n8n',
            version: '0.1.0',
            description: 'Visual workflow automation platform with AI capabilities',
            capabilities: {
                supportsMultiAgent: false,
                supportsVisualBuilder: true,
                supportsCodeEditor: false,
                supportsAsyncExecution: true,
                supportsStatePersistence: true,
                gpuRequired: false,
                maxConcurrentExecutions: 15,
                resourceRequirements: {
                    cpu: 2,
                    memory: 2048,
                    gpu: 0,
                },
            },
            supportedLanguages: ['typescript', 'javascript'],
            dependencies: ['n8n-core', 'n8n-nodes-base'],
        });
    }
    async initialize(config) {
        this.logger.log('Initializing n8n adapter', { config });
        this.logger.log('n8n adapter initialized successfully');
    }
    async shutdown() {
        this.logger.log('Shutting down n8n adapter');
        this.executions.clear();
        this.logger.log('n8n adapter shutdown complete');
    }
    async validateWorkflow(workflowData) {
        const errors = [];
        if (!workflowData.nodes || !Array.isArray(workflowData.nodes)) {
            errors.push('Workflow must contain a nodes array');
        }
        if (!workflowData.connections ||
            typeof workflowData.connections !== 'object') {
            errors.push('Workflow must contain connections object');
        }
        const hasStartNode = workflowData.nodes?.some((node) => [
            'n8n-nodes-base.webhook',
            'n8n-nodes-base.schedule',
            'n8n-nodes-base.manual',
        ].includes(node.type));
        if (!hasStartNode) {
            errors.push('Workflow must have a start node (webhook, schedule, or manual trigger)');
        }
        if (workflowData.nodes) {
            for (const node of workflowData.nodes) {
                if (!node.id || !node.type || !node.parameters) {
                    errors.push(`Node ${node.id || 'unknown'} is missing required fields`);
                }
                if (node.type?.includes('ai') || node.type?.includes('openai')) {
                    if (!node.parameters.apiKey) {
                        errors.push(`AI node ${node.id} is missing API key`);
                    }
                }
            }
        }
        if (workflowData.connections) {
            for (const [sourceId, sourceConnections] of Object.entries(workflowData.connections)) {
                if (!Array.isArray(sourceConnections))
                    continue;
                for (const connection of sourceConnections) {
                    if (!connection.node || !connection.type || !connection.index) {
                        errors.push(`Connection from ${sourceId} is missing required fields`);
                    }
                }
            }
        }
        return {
            valid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined,
        };
    }
    async executeWorkflow(workflowData, inputData, context) {
        this.logExecutionStart(context);
        try {
            const startTime = Date.now();
            const nodeCount = workflowData.nodes?.length || 0;
            const connectionCount = Object.keys(workflowData.connections || {}).length;
            const steps = [];
            steps.push({
                id: 'workflow_init',
                name: 'Initialize Workflow',
                status: 'completed',
                startedAt: new Date(),
                completedAt: new Date(),
                duration: 150,
                output: { nodeCount, connectionCount },
            });
            workflowData.nodes?.forEach((node, index) => {
                steps.push({
                    id: `node_${node.id}`,
                    name: `Execute ${node.name || node.type}`,
                    status: index === 0 ? 'running' : 'pending',
                    startedAt: index === 0 ? new Date() : undefined,
                });
            });
            this.executions.set(context.executionId, {
                workflowData,
                inputData,
                context,
                steps,
                startTime,
                currentNodeIndex: 0,
            });
            await this.executeWithTimeout(async () => {
                for (let i = 0; i < (workflowData.nodes?.length || 0); i++) {
                    const node = workflowData.nodes[i];
                    const step = steps.find((s) => s.id === `node_${node.id}`);
                    if (!step)
                        continue;
                    step.status = 'running';
                    if (!step.startedAt)
                        step.startedAt = new Date();
                    let executionTime = 200;
                    if (node.type?.includes('ai') || node.type?.includes('openai')) {
                        executionTime = 1000 + Math.random() * 2000;
                    }
                    else if (node.type?.includes('http')) {
                        executionTime = 500 + Math.random() * 1000;
                    }
                    await new Promise((resolve) => setTimeout(resolve, executionTime));
                    step.status = 'completed';
                    step.completedAt = new Date();
                    step.duration = executionTime;
                    step.output = {
                        nodeType: node.type,
                        result: `Node ${node.name || node.id} executed successfully`,
                        dataProcessed: inputData,
                    };
                }
            }, context.resourceLimits?.timeout || 30000, context.executionId);
            const executionTime = Date.now() - startTime;
            this.logExecutionComplete(context, true, executionTime);
            return this.createSuccessResult({
                message: 'n8n workflow executed successfully',
                workflow: {
                    id: workflowData.id || 'unknown',
                    name: workflowData.name || 'Unnamed Workflow',
                    nodeCount,
                    connectionCount,
                    executionTime,
                },
                results: steps
                    .filter((s) => s.id.startsWith('node_'))
                    .map((s) => s.output),
                summary: {
                    totalNodes: nodeCount,
                    executedNodes: steps.filter((s) => s.id.startsWith('node_') && s.status === 'completed').length,
                    dataFlow: inputData,
                },
            }, executionTime, steps, {
                cpuTime: executionTime,
                memoryPeak: 1024,
                gpuTime: 0,
            });
        }
        catch (error) {
            this.logExecutionError(context, error);
            return this.createErrorResult(error.message || 'n8n workflow execution failed', 'N8N_EXECUTION_ERROR', Date.now() - Date.now());
        }
    }
    async getExecutionStatus(executionId) {
        const execution = this.executions.get(executionId);
        if (!execution) {
            throw new Error(`Execution ${executionId} not found`);
        }
        return execution.steps || [];
    }
    async cancelExecution(executionId) {
        const execution = this.executions.get(executionId);
        if (!execution) {
            throw new Error(`Execution ${executionId} not found`);
        }
        execution.cancelled = true;
        if (execution.steps) {
            const runningStep = execution.steps.find((step) => step.status === 'running');
            if (runningStep) {
                runningStep.status = 'failed';
                runningStep.completedAt = new Date();
                runningStep.error = 'Execution cancelled';
            }
        }
        this.logger.log(`Cancelled n8n execution ${executionId}`);
    }
    async getResourceRequirements(workflowData) {
        const nodeCount = workflowData.nodes?.length || 0;
        const connectionCount = Object.keys(workflowData.connections || {}).length;
        let cpu = 2;
        let memory = 2048;
        if (nodeCount > 10)
            cpu += 1;
        if (nodeCount > 20)
            cpu += 1;
        if (connectionCount > 15)
            memory += 512;
        if (connectionCount > 30)
            memory += 512;
        const hasAINodes = workflowData.nodes?.some((node) => node.type?.includes('ai') ||
            node.type?.includes('openai') ||
            node.type?.includes('anthropic'));
        if (hasAINodes) {
            cpu += 1;
            memory += 1024;
        }
        const hasHeavyNodes = workflowData.nodes?.some((node) => node.type?.includes('transform') || node.type?.includes('aggregate'));
        if (hasHeavyNodes) {
            cpu += 0.5;
            memory += 256;
        }
        return { cpu: Math.ceil(cpu), memory, gpu: hasAINodes ? 1 : 0 };
    }
};
exports.N8nAdapter = N8nAdapter;
exports.N8nAdapter = N8nAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], N8nAdapter);
//# sourceMappingURL=n8n.adapter.js.map