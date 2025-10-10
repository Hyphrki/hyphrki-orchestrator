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
exports.DeploymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const client_1 = require("@prisma/client");
let DeploymentsService = class DeploymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDeployment(userId, dto) {
        const agentTemplate = await this.prisma.agentTemplate.findUnique({
            where: { id: dto.agentTemplateId },
        });
        if (!agentTemplate) {
            throw new common_1.NotFoundException('Agent template not found');
        }
        const deployment = await this.prisma.userAgentDeployment.create({
            data: {
                userId,
                agentTemplateId: dto.agentTemplateId,
                deploymentName: dto.deploymentName,
                parameterValues: dto.parameterValues,
                deploymentStatus: client_1.DeploymentStatus.active,
                agentTemplateVersion: agentTemplate.version,
            },
            include: {
                agentTemplate: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true,
                        version: true,
                    },
                },
            },
        });
        return deployment;
    }
    async listDeployments(userId, status) {
        const where = {};
        if (userId)
            where.userId = userId;
        if (status)
            where.deploymentStatus = status;
        return this.prisma.userAgentDeployment.findMany({
            where,
            include: {
                agentTemplate: {
                    select: {
                        id: true,
                        name: true,
                        category: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getDeployment(id) {
        const deployment = await this.prisma.userAgentDeployment.findUnique({
            where: { id },
            include: {
                agentTemplate: {
                    include: {
                        parameters: { orderBy: { order: 'asc' } },
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                executions: {
                    take: 10,
                    orderBy: { startedAt: 'desc' },
                },
            },
        });
        if (!deployment) {
            throw new common_1.NotFoundException('Deployment not found');
        }
        return deployment;
    }
    async executeDeployment(deploymentId, userId, dto) {
        const deployment = await this.prisma.userAgentDeployment.findUnique({
            where: { id: deploymentId },
            include: { agentTemplate: true },
        });
        if (!deployment) {
            throw new common_1.NotFoundException('Deployment not found');
        }
        const finalParams = {
            ...(deployment.parameterValues || {}),
            ...(dto.inputParameters || {}),
        };
        const execution = await this.prisma.agentExecution.create({
            data: {
                deploymentId,
                userId,
                n8nExecutionId: `exec-${Date.now()}`,
                status: client_1.ExecutionStatus.completed,
                inputParameters: finalParams,
                executionOutput: {
                    success: true,
                    message: 'Execution completed successfully (mock)',
                    timestamp: new Date().toISOString(),
                },
            },
        });
        await this.prisma.userAgentDeployment.update({
            where: { id: deploymentId },
            data: {
                lastExecutionAt: new Date(),
                totalExecutions: { increment: 1 },
            },
        });
        return execution;
    }
    async deleteDeployment(id) {
        return this.prisma.userAgentDeployment.delete({
            where: { id },
        });
    }
    async listExecutions(userId, deploymentId) {
        const where = {};
        if (userId)
            where.userId = userId;
        if (deploymentId)
            where.deploymentId = deploymentId;
        return this.prisma.agentExecution.findMany({
            where,
            include: {
                deployment: {
                    include: {
                        agentTemplate: {
                            select: { id: true, name: true, category: true },
                        },
                    },
                },
            },
            orderBy: { startedAt: 'desc' },
            take: 50,
        });
    }
    async getExecution(id) {
        const execution = await this.prisma.agentExecution.findUnique({
            where: { id },
            include: {
                deployment: {
                    include: {
                        agentTemplate: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                category: true,
                            },
                        },
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        if (!execution) {
            throw new common_1.NotFoundException('Execution not found');
        }
        return execution;
    }
};
exports.DeploymentsService = DeploymentsService;
exports.DeploymentsService = DeploymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeploymentsService);
//# sourceMappingURL=deployments.service.js.map