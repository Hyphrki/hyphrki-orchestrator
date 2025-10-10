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
exports.WorkflowRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WorkflowRepository = class WorkflowRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.workflow.findUnique({
            where: { id },
            include: {
                agent: {
                    include: {
                        userOwner: true,
                        orgOwner: true,
                    },
                },
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                },
            },
        });
    }
    async findByAgentId(agentId) {
        return this.prisma.workflow.findMany({
            where: { agentId },
            include: {
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(data) {
        return this.prisma.workflow.create({
            data,
            include: {
                agent: {
                    include: {
                        userOwner: true,
                        orgOwner: true,
                    },
                },
                executions: true,
            },
        });
    }
    async update(id, data) {
        return this.prisma.workflow.update({
            where: { id },
            data,
            include: {
                agent: {
                    include: {
                        userOwner: true,
                        orgOwner: true,
                    },
                },
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
    }
    async delete(id) {
        return this.prisma.workflow.delete({
            where: { id },
        });
    }
    async findMany(params) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.workflow.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                agent: {
                    include: {
                        userOwner: true,
                        orgOwner: true,
                    },
                },
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
            },
        });
    }
    async count(where) {
        return this.prisma.workflow.count({ where });
    }
    async createVersion(workflowId, workflowData, version) {
        const currentVersion = version || this.generateVersion();
        return this.prisma.workflow.create({
            data: {
                agentId: (await this.findById(workflowId)).agentId,
                name: (await this.findById(workflowId)).name,
                description: (await this.findById(workflowId)).description,
                workflowData,
                workflowType: (await this.findById(workflowId)).workflowType,
                framework: (await this.findById(workflowId)).framework,
                version: currentVersion,
            },
            include: {
                agent: true,
                executions: true,
            },
        });
    }
    async getVersions(agentId) {
        return this.prisma.workflow.findMany({
            where: { agentId },
            orderBy: { version: 'desc' },
            include: {
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });
    }
    async setActiveVersion(workflowId) {
        const workflow = await this.findById(workflowId);
        if (!workflow)
            return;
        await this.prisma.workflow.updateMany({
            where: { agentId: workflow.agentId },
            data: { isActive: false },
        });
        await this.prisma.workflow.update({
            where: { id: workflowId },
            data: { isActive: true },
        });
    }
    async getActiveWorkflow(agentId) {
        return this.prisma.workflow.findFirst({
            where: {
                agentId,
                isActive: true,
            },
            include: {
                agent: {
                    include: {
                        userOwner: true,
                        orgOwner: true,
                    },
                },
                executions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
    }
    async findLatestByAgentId(agentId) {
        return this.prisma.workflow.findFirst({
            where: { agentId },
            orderBy: { createdAt: 'desc' },
        });
    }
    generateVersion() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const timestamp = now.getTime();
        return `${year}.${month}.${day}.${timestamp}`;
    }
};
exports.WorkflowRepository = WorkflowRepository;
exports.WorkflowRepository = WorkflowRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowRepository);
//# sourceMappingURL=workflow.repository.js.map