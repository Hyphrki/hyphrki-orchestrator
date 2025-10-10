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
exports.LangGraphAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_framework_adapter_1 = require("../abstraction/base-framework.adapter");
let LangGraphAdapter = class LangGraphAdapter extends base_framework_adapter_1.BaseFrameworkAdapter {
    executions = new Map();
    constructor() {
        super('langgraph', {
            name: 'LangGraph',
            version: '0.1.0',
            description: 'Stateful multi-step AI agents with graph-based architecture',
            capabilities: {
                supportsMultiAgent: false,
                supportsVisualBuilder: false,
                supportsCodeEditor: true,
                supportsAsyncExecution: true,
                supportsStatePersistence: true,
                gpuRequired: false,
                maxConcurrentExecutions: 10,
                resourceRequirements: {
                    cpu: 2,
                    memory: 2048,
                    gpu: 0,
                },
            },
            supportedLanguages: ['python'],
            dependencies: ['langchain', 'langgraph', 'python'],
        });
    }
    async initialize(config) {
        this.logger.log('Initializing LangGraph adapter', { config });
        this.logger.log('LangGraph adapter initialized successfully');
    }
    async shutdown() {
        this.logger.log('Shutting down LangGraph adapter');
        this.executions.clear();
        this.logger.log('LangGraph adapter shutdown complete');
    }
    async validateWorkflow(workflowData) {
        const errors = [];
        if (!workflowData.nodes || !Array.isArray(workflowData.nodes)) {
            errors.push('Workflow must contain a nodes array');
        }
        if (!workflowData.edges || !Array.isArray(workflowData.edges)) {
            errors.push('Workflow must contain an edges array');
        }
        if (!workflowData.startNode) {
            errors.push('Workflow must specify a startNode');
        }
        if (workflowData.nodes) {
            for (const node of workflowData.nodes) {
                if (!node.id || !node.type || !node.data) {
                    errors.push(`Node ${node.id || 'unknown'} is missing required fields`);
                }
            }
        }
        if (workflowData.edges) {
            for (const edge of workflowData.edges) {
                if (!edge.source || !edge.target) {
                    errors.push('Edge is missing source or target');
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
            const steps = [
                {
                    id: 'init',
                    name: 'Initialize Graph',
                    status: 'completed',
                    startedAt: new Date(),
                    completedAt: new Date(),
                    duration: 100,
                },
                {
                    id: 'execute',
                    name: 'Execute Workflow',
                    status: 'running',
                    startedAt: new Date(),
                },
            ];
            this.executions.set(context.executionId, {
                workflowData,
                inputData,
                context,
                steps,
                startTime,
            });
            await this.executeWithTimeout(async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                steps[1].status = 'completed';
                steps[1].completedAt = new Date();
                steps[1].duration = Date.now() - steps[1].startedAt.getTime();
                steps[1].output = { result: 'Workflow executed successfully' };
            }, context.resourceLimits?.timeout || 30000, context.executionId);
            const executionTime = Date.now() - startTime;
            this.logExecutionComplete(context, true, executionTime);
            return this.createSuccessResult({
                message: 'LangGraph workflow executed successfully',
                output: inputData,
                graphState: {},
            }, executionTime, steps, {
                cpuTime: executionTime,
                memoryPeak: 512,
                gpuTime: 0,
            });
        }
        catch (error) {
            this.logExecutionError(context, error);
            return this.createErrorResult(error.message || 'LangGraph execution failed', 'LANGGRAPH_EXECUTION_ERROR', Date.now() - Date.now());
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
        this.logger.log(`Cancelled LangGraph execution ${executionId}`);
    }
    async getResourceRequirements(workflowData) {
        const nodeCount = workflowData.nodes?.length || 0;
        const edgeCount = workflowData.edges?.length || 0;
        let cpu = 2;
        let memory = 2048;
        let gpu = 0;
        if (nodeCount > 10)
            cpu += 1;
        if (nodeCount > 20)
            cpu += 1;
        if (edgeCount > 15)
            memory += 1024;
        if (edgeCount > 30)
            memory += 1024;
        const hasLLMNodes = workflowData.nodes?.some((node) => node.type?.includes('llm') || node.type?.includes('openai'));
        if (hasLLMNodes) {
            gpu = 1;
        }
        return { cpu, memory, gpu };
    }
};
exports.LangGraphAdapter = LangGraphAdapter;
exports.LangGraphAdapter = LangGraphAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LangGraphAdapter);
//# sourceMappingURL=langgraph.adapter.js.map