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
exports.WorkflowExecutionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WorkflowExecutionRepository = class WorkflowExecutionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.workflowExecution.findUnique({
            where: { id },
            include: {
                workflow: {
                    include: {
                        agent: {
                            include: {
                                userOwner: true,
                                orgOwner: true,
                            },
                        },
                    },
                },
                agent: {
                    include: {
                        userOwner: true,
                        orgOwner: true,
                    },
                },
                parentExecution: true,
                childExecutions: true,
            },
        });
    }
    async findByWorkflowId(workflowId) {
        return this.prisma.workflowExecution.findMany({
            where: { workflowId },
            include: {
                agent: true,
                workflow: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByAgentId(agentId) {
        return this.prisma.workflowExecution.findMany({
            where: { agentId },
            include: {
                workflow: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByCorrelationId(correlationId) {
        return this.prisma.workflowExecution.findMany({
            where: { correlationId },
            include: {
                workflow: {
                    include: {
                        agent: true,
                    },
                },
                agent: true,
                parentExecution: true,
                childExecutions: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(data) {
        return this.prisma.workflowExecution.create({
            data,
            include: {
                workflow: {
                    include: {
                        agent: true,
                    },
                },
                agent: true,
                parentExecution: true,
            },
        });
    }
    async update(id, data) {
        return this.prisma.workflowExecution.update({
            where: { id },
            data,
            include: {
                workflow: {
                    include: {
                        agent: true,
                    },
                },
                agent: true,
                parentExecution: true,
                childExecutions: true,
            },
        });
    }
    async delete(id) {
        return this.prisma.workflowExecution.delete({
            where: { id },
        });
    }
    async findMany(params) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.workflowExecution.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                workflow: {
                    include: {
                        agent: true,
                    },
                },
                agent: true,
            },
        });
    }
    async count(where) {
        return this.prisma.workflowExecution.count({ where });
    }
    async updateStatus(id, status, statusMessage, additionalData) {
        const updateData = {
            status,
            ...(statusMessage && { statusMessage }),
            ...(status === 'running' && { startedAt: new Date() }),
            ...(status === 'completed' && { completedAt: new Date() }),
            ...(status === 'failed' && { completedAt: new Date() }),
            ...(status === 'paused' && { pausedAt: new Date() }),
            ...(status === 'timeout' && { completedAt: new Date() }),
            ...(additionalData && { executionData: additionalData }),
        };
        return this.update(id, updateData);
    }
    async startExecution(id, executionData) {
        return this.updateStatus(id, 'running', 'Execution started', executionData);
    }
    async completeExecution(id, result, performanceMetrics, resourceUsage) {
        const updateData = {
            status: 'completed',
            completedAt: new Date(),
            executionData: result,
            ...(performanceMetrics && { performanceMetrics }),
            ...(resourceUsage && { resourceUsage }),
        };
        return this.prisma.workflowExecution.update({
            where: { id },
            data: updateData,
            include: {
                workflow: true,
                agent: true,
            },
        });
    }
    async failExecution(id, errorMessage, errorCode, executionData) {
        const updateData = {
            status: 'failed',
            completedAt: new Date(),
            errorMessage,
            ...(errorCode && { errorCode }),
            ...(executionData && { executionData }),
        };
        return this.prisma.workflowExecution.update({
            where: { id },
            data: updateData,
            include: {
                workflow: true,
                agent: true,
            },
        });
    }
    async pauseExecution(id) {
        return this.updateStatus(id, 'paused', 'Execution paused');
    }
    async resumeExecution(id) {
        const updateData = {
            status: 'running',
            pausedAt: null,
            resumedAt: new Date(),
        };
        return this.prisma.workflowExecution.update({
            where: { id },
            data: updateData,
            include: {
                workflow: true,
                agent: true,
            },
        });
    }
    async cancelExecution(id) {
        return this.updateStatus(id, 'cancelled', 'Execution cancelled by user');
    }
    async retryExecution(id) {
        const execution = await this.findById(id);
        if (!execution)
            throw new Error('Execution not found');
        if (execution.retryCount >= execution.maxRetries) {
            throw new Error('Maximum retry attempts exceeded');
        }
        const retryData = {
            workflow: { connect: { id: execution.workflowId } },
            agent: { connect: { id: execution.agentId } },
            status: 'queued',
            correlationId: execution.correlationId,
            retryCount: execution.retryCount + 1,
            maxRetries: execution.maxRetries,
            parentExecution: { connect: { id: execution.id } },
            executionData: execution.executionData || undefined,
        };
        return this.create(retryData);
    }
    async getExecutionStats(workflowId, agentId) {
        const where = {};
        if (workflowId)
            where.workflowId = workflowId;
        if (agentId)
            where.agentId = agentId;
        const executions = await this.prisma.workflowExecution.findMany({
            where,
            select: {
                status: true,
                startedAt: true,
                completedAt: true,
            },
        });
        const total = executions.length;
        const completed = executions.filter((e) => e.status === 'completed').length;
        const failed = executions.filter((e) => ['failed', 'timeout', 'cancelled'].includes(e.status)).length;
        const running = executions.filter((e) => e.status === 'running').length;
        const queued = executions.filter((e) => ['queued', 'pending'].includes(e.status)).length;
        const completedExecutions = executions.filter((e) => e.status === 'completed' && e.completedAt && e.startedAt);
        const avgExecutionTime = completedExecutions.length > 0
            ? completedExecutions.reduce((acc, e) => acc +
                (new Date(e.completedAt).getTime() -
                    new Date(e.startedAt).getTime()), 0) / completedExecutions.length
            : 0;
        const successRate = total > 0 ? (completed / total) * 100 : 0;
        return {
            total,
            completed,
            failed,
            running,
            queued,
            avgExecutionTime,
            successRate,
        };
    }
};
exports.WorkflowExecutionRepository = WorkflowExecutionRepository;
exports.WorkflowExecutionRepository = WorkflowExecutionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowExecutionRepository);
//# sourceMappingURL=workflow-execution.repository.js.map