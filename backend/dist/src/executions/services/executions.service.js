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
exports.ExecutionsService = void 0;
const common_1 = require("@nestjs/common");
const workflow_execution_repository_1 = require("../../database/repositories/workflow-execution.repository");
const workflow_repository_1 = require("../../database/repositories/workflow.repository");
const agent_repository_1 = require("../../database/repositories/agent.repository");
const user_repository_1 = require("../../database/repositories/user.repository");
const framework_abstraction_service_1 = require("../../frameworks/abstraction/framework-abstraction.service");
const sync_service_1 = require("../../websocket/sync.service");
const uuid_1 = require("uuid");
let ExecutionsService = class ExecutionsService {
    executionRepository;
    workflowRepository;
    agentRepository;
    userRepository;
    frameworkAbstraction;
    syncService;
    constructor(executionRepository, workflowRepository, agentRepository, userRepository, frameworkAbstraction, syncService) {
        this.executionRepository = executionRepository;
        this.workflowRepository = workflowRepository;
        this.agentRepository = agentRepository;
        this.userRepository = userRepository;
        this.frameworkAbstraction = frameworkAbstraction;
        this.syncService = syncService;
    }
    async executeWorkflow(userId, workflowId, executeData = {}) {
        const workflow = await this.workflowRepository.findById(workflowId);
        if (!workflow) {
            throw new common_1.NotFoundException('Workflow not found');
        }
        if (!this.canAccessAgent(userId, workflow.agent)) {
            throw new common_1.ForbiddenException('Access denied to workflow');
        }
        const correlationId = (0, uuid_1.v4)();
        const execution = await this.executionRepository.create({
            workflow: { connect: { id: workflowId } },
            agent: { connect: { id: workflow.agentId } },
            status: 'queued',
            executionData: {
                input: executeData.input_data || {},
                options: executeData.execution_options || {},
            },
            correlationId,
        });
        const formattedExecution = this.formatExecution(execution);
        this.syncService.emitExecutionStarted(formattedExecution, workflow.agent.ownerType === 'organization' ? workflow.agent.ownerId : userId);
        setTimeout(() => {
            this.processExecution(execution.id, userId);
        }, 100);
        return {
            execution_id: execution.id,
            status: execution.status,
            started_at: execution.startedAt,
            correlation_id: execution.correlationId,
        };
    }
    async getExecutionById(userId, executionId) {
        const execution = await this.executionRepository.findById(executionId);
        if (!execution) {
            throw new common_1.NotFoundException('Execution not found');
        }
        if (!this.canAccessAgent(userId, execution.agent)) {
            throw new common_1.ForbiddenException('Access denied to execution');
        }
        return this.formatExecutionDetails(execution);
    }
    async getExecutions(userId, query = {}) {
        const { workflow_id, agent_id, status, start_date, end_date, page = 1, limit = 20, } = query;
        const where = {};
        if (workflow_id)
            where.workflowId = workflow_id;
        if (agent_id)
            where.agentId = agent_id;
        if (status)
            where.status = status;
        if (start_date || end_date) {
            where.startedAt = {};
            if (start_date)
                where.startedAt.gte = new Date(start_date);
            if (end_date)
                where.startedAt.lte = new Date(end_date);
        }
        const userAgents = await this.getUserAccessibleAgentIds(userId);
        where.agentId = { in: userAgents };
        const executions = await this.executionRepository.findMany({
            where,
            orderBy: { startedAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        });
        const total = await this.executionRepository.count(where);
        return {
            executions: executions.map((execution) => this.formatExecution(execution)),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async processExecution(executionId, userId) {
        try {
            const execution = await this.executionRepository.findById(executionId);
            if (!execution) {
                throw new Error('Execution not found');
            }
            const workflow = await this.workflowRepository.findById(execution.workflowId);
            if (!workflow) {
                throw new Error('Workflow not found');
            }
            const agent = await this.agentRepository.findById(execution.agentId);
            if (!agent) {
                throw new Error('Agent not found');
            }
            await this.executionRepository.update(executionId, {
                status: 'running',
            });
            const runningExecution = await this.executionRepository.findById(executionId);
            if (runningExecution) {
                this.syncService.emitExecutionUpdated(this.formatExecution(runningExecution), agent.ownerType === 'organization' ? agent.ownerId : userId);
            }
            const executionData = execution.executionData;
            const result = await this.frameworkAbstraction.executeWorkflow(workflow.framework, {
                workflowData: workflow.workflowData,
                inputData: executionData?.input || {},
                executionOptions: {
                    timeout: 30000,
                    retryCount: execution.maxRetries,
                },
            }, {
                executionId,
                workflowId: workflow.id,
                agentId: workflow.agentId,
                userId,
                correlationId: execution.correlationId,
                containerId: agent.containerId || undefined,
                resourceLimits: agent.resourceLimits || undefined,
            });
            const baseExecutionData = execution.executionData || {};
            if (result.success) {
                await this.executionRepository.update(executionId, {
                    status: 'completed',
                    completedAt: new Date(),
                    executionData: {
                        ...baseExecutionData,
                        output: result.output,
                        steps: result.steps,
                    },
                    resourceUsage: {
                        cpu_time: result.resourceUsage.cpuTime,
                        memory_peak: result.resourceUsage.memoryPeak,
                        execution_time: result.executionTime,
                    },
                    performanceMetrics: {
                        total_duration: result.executionTime,
                        steps_count: result.steps.length,
                        success_rate: 1.0,
                    },
                });
                const completedExecution = await this.executionRepository.findById(executionId);
                if (completedExecution) {
                    this.syncService.emitExecutionCompleted(this.formatExecutionDetails(completedExecution), agent.ownerType === 'organization' ? agent.ownerId : userId);
                }
            }
            else {
                await this.executionRepository.update(executionId, {
                    status: 'failed',
                    completedAt: new Date(),
                    errorMessage: result.error?.message || 'Workflow execution failed',
                    errorCode: result.error?.code || 'EXECUTION_FAILED',
                    executionData: {
                        ...baseExecutionData,
                        error: result.error?.details,
                    },
                    resourceUsage: {
                        cpu_time: result.resourceUsage.cpuTime,
                        memory_peak: result.resourceUsage.memoryPeak,
                        execution_time: result.executionTime,
                    },
                });
                const failedExecution = await this.executionRepository.findById(executionId);
                if (failedExecution) {
                    this.syncService.emitExecutionUpdated(this.formatExecutionDetails(failedExecution), agent.ownerType === 'organization' ? agent.ownerId : userId);
                }
            }
        }
        catch (error) {
            await this.executionRepository.update(executionId, {
                status: 'failed',
                completedAt: new Date(),
                errorMessage: `Execution failed: ${error.message}`,
                errorCode: 'INTERNAL_ERROR',
                executionData: {
                    error: error,
                },
            });
            const failedExecution = await this.executionRepository.findById(executionId);
            if (failedExecution) {
                this.syncService.emitExecutionUpdated(this.formatExecutionDetails(failedExecution), userId);
            }
        }
    }
    canAccessAgent(userId, agent) {
        if (agent.ownerType === 'user') {
            return agent.ownerId === userId;
        }
        else if (agent.ownerType === 'organization') {
            return (agent.orgOwner?.members?.some((member) => member.userId === userId) || false);
        }
        return false;
    }
    async getUserAccessibleAgentIds(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            return [];
        const agentIds = [];
        const userAgents = await this.agentRepository.findMany({
            where: { ownerType: 'user', ownerId: userId },
        });
        agentIds.push(...userAgents.map((a) => a.id));
        for (const member of user.organizationMembers || []) {
            const orgAgents = await this.agentRepository.findMany({
                where: { ownerType: 'organization', ownerId: member.organization.id },
            });
            agentIds.push(...orgAgents.map((a) => a.id));
        }
        return agentIds;
    }
    formatExecution(execution) {
        return {
            id: execution.id,
            workflow_id: execution.workflowId,
            agent_id: execution.agentId,
            status: execution.status,
            started_at: execution.startedAt,
            completed_at: execution.completedAt,
            correlation_id: execution.correlationId,
        };
    }
    formatExecutionDetails(execution) {
        return {
            ...this.formatExecution(execution),
            status_message: execution.statusMessage,
            completed_at: execution.completedAt,
            paused_at: execution.pausedAt,
            resumed_at: execution.resumedAt,
            execution_data: execution.executionData,
            execution_logs: execution.executionLogs,
            error_message: execution.errorMessage,
            error_code: execution.errorCode,
            retry_count: execution.retryCount,
            max_retries: execution.maxRetries,
            resource_usage: execution.resourceUsage,
            performance_metrics: execution.performanceMetrics,
            correlation_id: execution.correlationId,
            parent_execution_id: execution.parentExecutionId,
            created_at: execution.createdAt,
            updated_at: execution.updatedAt,
        };
    }
};
exports.ExecutionsService = ExecutionsService;
exports.ExecutionsService = ExecutionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workflow_execution_repository_1.WorkflowExecutionRepository,
        workflow_repository_1.WorkflowRepository,
        agent_repository_1.AgentRepository,
        user_repository_1.UserRepository,
        framework_abstraction_service_1.FrameworkAbstractionService,
        sync_service_1.SyncService])
], ExecutionsService);
//# sourceMappingURL=executions.service.js.map