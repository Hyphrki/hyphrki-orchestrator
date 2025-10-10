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
exports.CrewAIAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_framework_adapter_1 = require("../abstraction/base-framework.adapter");
let CrewAIAdapter = class CrewAIAdapter extends base_framework_adapter_1.BaseFrameworkAdapter {
    executions = new Map();
    constructor() {
        super('crewai', {
            name: 'CrewAI',
            version: '0.1.0',
            description: 'Multi-agent collaboration and orchestration framework',
            capabilities: {
                supportsMultiAgent: true,
                supportsVisualBuilder: false,
                supportsCodeEditor: true,
                supportsAsyncExecution: true,
                supportsStatePersistence: true,
                gpuRequired: false,
                maxConcurrentExecutions: 8,
                resourceRequirements: {
                    cpu: 3,
                    memory: 3072,
                    gpu: 0,
                },
            },
            supportedLanguages: ['python'],
            dependencies: ['crewai', 'langchain'],
        });
    }
    async initialize(config) {
        this.logger.log('Initializing CrewAI adapter', { config });
        this.logger.log('CrewAI adapter initialized successfully');
    }
    async shutdown() {
        this.logger.log('Shutting down CrewAI adapter');
        this.executions.clear();
        this.logger.log('CrewAI adapter shutdown complete');
    }
    async validateWorkflow(workflowData) {
        const errors = [];
        if (!workflowData.crew || typeof workflowData.crew !== 'object') {
            errors.push('Workflow must contain a crew configuration');
        }
        if (!workflowData.crew.agents || !Array.isArray(workflowData.crew.agents)) {
            errors.push('Crew must contain an agents array');
        }
        if (workflowData.crew.agents.length === 0) {
            errors.push('Crew must have at least one agent');
        }
        if (!workflowData.crew.tasks || !Array.isArray(workflowData.crew.tasks)) {
            errors.push('Crew must contain a tasks array');
        }
        for (const agent of workflowData.crew.agents) {
            if (!agent.role || !agent.goal || !agent.backstory) {
                errors.push(`Agent ${agent.name || 'unknown'} is missing required fields (role, goal, backstory)`);
            }
        }
        for (const task of workflowData.crew.tasks) {
            if (!task.description) {
                errors.push(`Task ${task.name || 'unknown'} is missing description`);
            }
        }
        if (workflowData.crew.taskDependencies) {
            for (const dep of workflowData.crew.taskDependencies) {
                if (!dep.task || !dep.dependsOn) {
                    errors.push('Task dependency is missing task or dependsOn field');
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
            const crew = workflowData.crew;
            const agentCount = crew.agents.length;
            const taskCount = crew.tasks.length;
            const steps = [
                {
                    id: 'init_crew',
                    name: 'Initialize Crew',
                    status: 'completed',
                    startedAt: new Date(),
                    completedAt: new Date(),
                    duration: 200,
                    output: { agentCount, taskCount },
                },
            ];
            crew.agents.forEach((agent, index) => {
                steps.push({
                    id: `init_agent_${index}`,
                    name: `Initialize ${agent.role}`,
                    status: 'completed',
                    startedAt: new Date(),
                    completedAt: new Date(),
                    duration: 100,
                    output: { role: agent.role, status: 'ready' },
                });
            });
            crew.tasks.forEach((task, index) => {
                steps.push({
                    id: `task_${index}`,
                    name: `Execute: ${task.description.substring(0, 50)}...`,
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
                currentTaskIndex: 0,
            });
            await this.executeWithTimeout(async () => {
                for (let i = 0; i < taskCount; i++) {
                    const step = steps.find((s) => s.id === `task_${i}`);
                    if (!step)
                        continue;
                    step.status = 'running';
                    if (!step.startedAt)
                        step.startedAt = new Date();
                    const executionTime = 500 + Math.random() * 1000;
                    await new Promise((resolve) => setTimeout(resolve, executionTime));
                    step.status = 'completed';
                    step.completedAt = new Date();
                    step.duration = executionTime;
                    step.output = {
                        task: crew.tasks[i].description,
                        agent: crew.agents[i % agentCount].role,
                        result: `Task ${i + 1} completed successfully`,
                    };
                }
            }, context.resourceLimits?.timeout || 60000, context.executionId);
            const executionTime = Date.now() - startTime;
            this.logExecutionComplete(context, true, executionTime);
            return this.createSuccessResult({
                message: 'CrewAI execution completed successfully',
                crew: {
                    name: crew.name || 'Unnamed Crew',
                    agentCount,
                    taskCount,
                    totalExecutionTime: executionTime,
                },
                results: steps
                    .filter((s) => s.id.startsWith('task_'))
                    .map((s) => s.output),
                coordination: {
                    communicationRounds: taskCount,
                    agentUtilization: agentCount / taskCount,
                    taskDependencies: crew.taskDependencies || [],
                },
            }, executionTime, steps, {
                cpuTime: executionTime,
                memoryPeak: 1536 + agentCount * 256,
                gpuTime: 0,
            });
        }
        catch (error) {
            this.logExecutionError(context, error);
            return this.createErrorResult(error.message || 'CrewAI execution failed', 'CREWAI_EXECUTION_ERROR', Date.now() - Date.now());
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
        this.logger.log(`Cancelled CrewAI execution ${executionId}`);
    }
    async getResourceRequirements(workflowData) {
        const crew = workflowData.crew;
        const agentCount = crew?.agents?.length || 1;
        const taskCount = crew?.tasks?.length || 1;
        let cpu = 3;
        let memory = 3072;
        cpu += Math.floor(agentCount / 2);
        memory += agentCount * 512;
        if (taskCount > 5)
            cpu += 1;
        if (taskCount > 10) {
            cpu += 1;
            memory += 1024;
        }
        const hasGPUAgents = crew?.agents?.some((agent) => agent.tools?.some((tool) => tool.type?.includes('gpu') || tool.type?.includes('llm')));
        const gpu = hasGPUAgents ? 1 : 0;
        return { cpu, memory, gpu };
    }
};
exports.CrewAIAdapter = CrewAIAdapter;
exports.CrewAIAdapter = CrewAIAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CrewAIAdapter);
//# sourceMappingURL=crewai.adapter.js.map