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
exports.AdminDeploymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let AdminDeploymentsService = class AdminDeploymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listDeployments(filters) {
        const { userId, agentTemplateId, status, page = 1, limit = 20 } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (userId) {
            where.userId = userId;
        }
        if (agentTemplateId) {
            where.agentTemplateId = agentTemplateId;
        }
        if (status) {
            where.deploymentStatus = status;
        }
        const [deployments, total] = await Promise.all([
            this.prisma.userAgentDeployment.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                    agentTemplate: {
                        select: {
                            id: true,
                            name: true,
                            category: true,
                            version: true,
                        },
                    },
                    executions: {
                        take: 1,
                        orderBy: { startedAt: 'desc' },
                        select: {
                            id: true,
                            status: true,
                            startedAt: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.userAgentDeployment.count({ where }),
        ]);
        return {
            deployments: deployments.map(d => ({
                id: d.id,
                deployment_name: d.deploymentName,
                status: d.deploymentStatus,
                created_at: d.createdAt.toISOString(),
                total_executions: d.totalExecutions,
                last_execution_at: d.lastExecutionAt?.toISOString(),
                user: d.user,
                agent: d.agentTemplate,
                latest_execution: d.executions[0] || null,
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getDeploymentDetail(id) {
        const deployment = await this.prisma.userAgentDeployment.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                agentTemplate: {
                    include: {
                        parameters: {
                            orderBy: { order: 'asc' },
                        },
                        outputConfig: true,
                    },
                },
                executions: {
                    take: 10,
                    orderBy: { startedAt: 'desc' },
                },
            },
        });
        if (!deployment) {
            throw new common_1.NotFoundException(`Deployment with ID ${id} not found`);
        }
        return {
            id: deployment.id,
            deployment_name: deployment.deploymentName,
            status: deployment.deploymentStatus,
            created_at: deployment.createdAt.toISOString(),
            total_executions: deployment.totalExecutions,
            last_execution_at: deployment.lastExecutionAt?.toISOString(),
            parameter_values: deployment.parameterValues,
            agent_template_version: deployment.agentTemplateVersion,
            user: deployment.user,
            agent: deployment.agentTemplate,
            recent_executions: deployment.executions.map(e => ({
                id: e.id,
                status: e.status,
                started_at: e.startedAt.toISOString(),
                stopped_at: e.stoppedAt?.toISOString(),
                error_message: e.errorMessage,
            })),
        };
    }
    async getDeploymentExecutions(deploymentId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [executions, total] = await Promise.all([
            this.prisma.agentExecution.findMany({
                where: { deploymentId },
                skip,
                take: limit,
                orderBy: { startedAt: 'desc' },
            }),
            this.prisma.agentExecution.count({ where: { deploymentId } }),
        ]);
        return {
            executions: executions.map(e => ({
                id: e.id,
                n8n_execution_id: e.n8nExecutionId,
                status: e.status,
                started_at: e.startedAt.toISOString(),
                stopped_at: e.stoppedAt?.toISOString(),
                input_parameters: e.inputParameters,
                execution_output: e.executionOutput,
                error_message: e.errorMessage,
                retry_count: e.retryCount,
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async executeDeployment(deploymentId, inputParameters) {
        const deployment = await this.prisma.userAgentDeployment.findUnique({
            where: { id: deploymentId },
            include: {
                agentTemplate: true,
            },
        });
        if (!deployment) {
            throw new common_1.NotFoundException(`Deployment with ID ${deploymentId} not found`);
        }
        const execution = await this.prisma.agentExecution.create({
            data: {
                deploymentId,
                userId: deployment.userId,
                n8nExecutionId: `manual-${Date.now()}`,
                status: 'queued',
                inputParameters: inputParameters,
            },
        });
        await this.prisma.userAgentDeployment.update({
            where: { id: deploymentId },
            data: {
                lastExecutionAt: new Date(),
                totalExecutions: { increment: 1 },
            },
        });
        return {
            execution_id: execution.id,
            status: execution.status,
            message: 'Execution queued successfully',
        };
    }
};
exports.AdminDeploymentsService = AdminDeploymentsService;
exports.AdminDeploymentsService = AdminDeploymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminDeploymentsService);
//# sourceMappingURL=admin-deployments.service.js.map