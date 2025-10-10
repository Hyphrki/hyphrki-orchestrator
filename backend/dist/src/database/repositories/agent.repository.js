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
exports.AgentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AgentRepository = class AgentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.agent.findUnique({
            where: { id },
            include: {
                userOwner: true,
                orgOwner: true,
                workflows: true,
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                marketplaceIntegrations: true,
                containerResources: true,
            },
        });
    }
    async findByOwner(ownerType, ownerId) {
        return this.prisma.agent.findMany({
            where: {
                ownerType,
                ownerId,
            },
            include: {
                userOwner: true,
                orgOwner: true,
                workflows: true,
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(data) {
        return this.prisma.agent.create({
            data,
            include: {
                userOwner: true,
                orgOwner: true,
                workflows: true,
                executions: true,
                marketplaceIntegrations: true,
                containerResources: true,
            },
        });
    }
    async update(id, data) {
        return this.prisma.agent.update({
            where: { id },
            data,
            include: {
                userOwner: true,
                orgOwner: true,
                workflows: true,
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                marketplaceIntegrations: true,
                containerResources: true,
            },
        });
    }
    async delete(id) {
        return this.prisma.agent.delete({
            where: { id },
        });
    }
    async findMany(params) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.agent.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                userOwner: true,
                orgOwner: true,
                workflows: true,
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
            },
        });
    }
    async count(where) {
        return this.prisma.agent.count({ where });
    }
    async findByFramework(framework) {
        return this.prisma.agent.findMany({
            where: { framework },
            include: {
                userOwner: true,
                orgOwner: true,
                workflows: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, status, metadata) {
        return this.prisma.agent.update({
            where: { id },
            data: {
                status,
                ...(metadata && { metadata }),
                ...(status === 'deployed' && { deployedAt: new Date() }),
            },
            include: {
                userOwner: true,
                orgOwner: true,
            },
        });
    }
    async updateContainerInfo(id, containerId, resourceLimits) {
        return this.prisma.agent.update({
            where: { id },
            data: {
                containerId,
                ...(resourceLimits && { resourceLimits }),
                status: 'active',
                deployedAt: new Date(),
            },
            include: {
                containerResources: true,
            },
        });
    }
    async getAgentStats(agentId) {
        const executions = await this.prisma.workflowExecution.findMany({
            where: { agentId },
            select: {
                status: true,
                startedAt: true,
                completedAt: true,
                performanceMetrics: true,
            },
        });
        const totalExecutions = executions.length;
        const successfulExecutions = executions.filter((e) => e.status === 'completed').length;
        const failedExecutions = executions.filter((e) => ['failed', 'timeout'].includes(e.status)).length;
        const completedExecutions = executions.filter((e) => e.completedAt && e.startedAt);
        const avgExecutionTime = completedExecutions.length > 0
            ? completedExecutions.reduce((acc, e) => acc +
                (new Date(e.completedAt).getTime() -
                    new Date(e.startedAt).getTime()), 0) / completedExecutions.length
            : 0;
        return {
            totalExecutions,
            successfulExecutions,
            failedExecutions,
            avgExecutionTime,
        };
    }
};
exports.AgentRepository = AgentRepository;
exports.AgentRepository = AgentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AgentRepository);
//# sourceMappingURL=agent.repository.js.map