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
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const client_1 = require("@prisma/client");
const parser_service_1 = require("../../n8n/services/parser.service");
const type_inference_service_1 = require("../../parameters/services/type-inference.service");
const event_bus_service_1 = require("../../common/services/event-bus.service");
let AgentsService = class AgentsService {
    prisma;
    workflowParser;
    typeInference;
    eventBus;
    constructor(prisma, workflowParser, typeInference, eventBus) {
        this.prisma = prisma;
        this.workflowParser = workflowParser;
        this.typeInference = typeInference;
        this.eventBus = eventBus;
    }
    async createAgent(createAgentDto) {
        this.workflowParser.validateWorkflowSize(JSON.stringify(createAgentDto.n8nWorkflowJson));
        this.workflowParser.validateWorkflowStructure(createAgentDto.n8nWorkflowJson);
        const parsedWorkflow = this.workflowParser.parseWorkflow(JSON.stringify(createAgentDto.n8nWorkflowJson));
        const agentTemplate = await this.prisma.agentTemplate.create({
            data: {
                name: createAgentDto.name,
                description: createAgentDto.description,
                category: createAgentDto.category,
                tags: createAgentDto.tags || [],
                n8nWorkflowJson: createAgentDto.n8nWorkflowJson,
                version: createAgentDto.version || '1.0.0',
                publicationStatus: client_1.PublicationStatus.draft,
                pricingTier: createAgentDto.pricingTier || client_1.PricingTier.free,
                createdById: createAgentDto.createdById,
                parameters: {
                    create: parsedWorkflow.parameters.map((param, index) => {
                        const fieldType = this.typeInference.inferFieldType(param);
                        const validationRules = this.typeInference.generateValidationRules(fieldType, param);
                        const displayLabel = this.typeInference.generateDisplayLabel(param.name);
                        const helpText = this.typeInference.generateHelpText(fieldType, param.name);
                        return {
                            parameterName: param.name,
                            parameterPath: param.path,
                            fieldType: fieldType,
                            displayLabel,
                            helpText,
                            defaultValue: param.defaultValue?.toString(),
                            isRequired: param.isRequired ?? true,
                            isSensitive: fieldType === 'password',
                            validationRules: validationRules,
                            order: index + 1,
                        };
                    }),
                },
                outputConfig: {
                    create: {
                        outputSource: 'finalResult',
                        displayFormat: 'formatted',
                        nodeIds: [],
                        fieldMappings: {},
                        filterRules: {
                            exclude: ['__internal', '_meta'],
                            maxDepth: 3,
                            maxItems: 100,
                        },
                    },
                },
            },
            include: {
                parameters: { orderBy: { order: 'asc' } },
                outputConfig: true,
                createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
            },
        });
        return agentTemplate;
    }
    async getAgent(id) {
        const agent = await this.prisma.agentTemplate.findUnique({
            where: { id },
            include: {
                parameters: { orderBy: { order: 'asc' } },
                outputConfig: true,
                createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
            },
        });
        if (!agent) {
            throw new common_1.NotFoundException(`Agent template with ID ${id} not found`);
        }
        return agent;
    }
    async listAgents(status, category, createdById) {
        const where = {};
        if (status) {
            where.publicationStatus = status;
        }
        if (category) {
            where.category = category;
        }
        if (createdById) {
            where.createdById = createdById;
        }
        return this.prisma.agentTemplate.findMany({
            where,
            include: {
                parameters: { orderBy: { order: 'asc' } },
                outputConfig: true,
                createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateAgent(id, updateData) {
        await this.getAgent(id);
        if (updateData.n8nWorkflowJson) {
            this.workflowParser.validateWorkflowSize(JSON.stringify(updateData.n8nWorkflowJson));
            this.workflowParser.validateWorkflowStructure(updateData.n8nWorkflowJson);
            const parsedWorkflow = this.workflowParser.parseWorkflow(JSON.stringify(updateData.n8nWorkflowJson));
            const updatedAgent = await this.prisma.$transaction(async (tx) => {
                await tx.agentParameterConfig.deleteMany({
                    where: { agentTemplateId: id },
                });
                return tx.agentTemplate.update({
                    where: { id },
                    data: {
                        ...updateData,
                        n8nWorkflowJson: updateData.n8nWorkflowJson,
                        parameters: {
                            create: parsedWorkflow.parameters.map((param, index) => {
                                const fieldType = this.typeInference.inferFieldType(param);
                                const validationRules = this.typeInference.generateValidationRules(fieldType, param);
                                const displayLabel = this.typeInference.generateDisplayLabel(param.name);
                                const helpText = this.typeInference.generateHelpText(fieldType, param.name);
                                return {
                                    parameterName: param.name,
                                    parameterPath: param.path,
                                    fieldType: fieldType,
                                    displayLabel,
                                    helpText,
                                    defaultValue: param.defaultValue?.toString(),
                                    isRequired: param.isRequired ?? true,
                                    isSensitive: fieldType === 'password',
                                    validationRules: validationRules,
                                    order: index + 1,
                                };
                            }),
                        },
                    },
                    include: {
                        parameters: { orderBy: { order: 'asc' } },
                        outputConfig: true,
                        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
                    },
                });
            });
            return updatedAgent;
        }
        const updatedAgent = await this.prisma.agentTemplate.update({
            where: { id },
            data: updateData,
            include: {
                parameters: { orderBy: { order: 'asc' } },
                outputConfig: true,
                createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
            },
        });
        return updatedAgent;
    }
    async deleteAgent(id) {
        await this.getAgent(id);
        const deploymentCount = await this.prisma.userAgentDeployment.count({
            where: { agentTemplateId: id },
        });
        if (deploymentCount > 0) {
            throw new common_1.BadRequestException('Cannot delete agent template with active deployments. Unpublish first.');
        }
        await this.prisma.agentTemplate.delete({
            where: { id },
        });
    }
    async publishAgent(id, publishDto) {
        const agent = await this.getAgent(id);
        if (agent.publicationStatus === client_1.PublicationStatus.published) {
            throw new common_1.BadRequestException('Agent is already published');
        }
        const updatedAgent = await this.prisma.agentTemplate.update({
            where: { id },
            data: {
                publicationStatus: client_1.PublicationStatus.published,
                publishedAt: new Date(),
                unpublishedAt: null,
            },
            include: {
                parameters: { orderBy: { order: 'asc' } },
                outputConfig: true,
                createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
            },
        });
        await this.eventBus.publish('marketplace:agent:published', {
            agentId: id,
            action: 'published',
            timestamp: new Date().toISOString(),
            metadata: {
                isBreakingUpdate: publishDto.isBreakingUpdate || false,
                releaseNotes: publishDto.releaseNotes,
            },
        });
        return updatedAgent;
    }
    async unpublishAgent(id) {
        const agent = await this.getAgent(id);
        if (agent.publicationStatus !== client_1.PublicationStatus.published) {
            throw new common_1.BadRequestException('Agent is not published');
        }
        const updatedAgent = await this.prisma.agentTemplate.update({
            where: { id },
            data: {
                publicationStatus: client_1.PublicationStatus.unpublished,
                unpublishedAt: new Date(),
            },
            include: {
                parameters: { orderBy: { order: 'asc' } },
                outputConfig: true,
                createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
            },
        });
        await this.eventBus.publish('marketplace:agent:unpublished', {
            agentId: id,
            action: 'unpublished',
            timestamp: new Date().toISOString(),
            metadata: {
                deprecationTimestamp: new Date().toISOString(),
                archivalTimestamp: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            },
        });
        return updatedAgent;
    }
    async assignAgentToUser(agentId, userId, customConfig) {
        const agent = await this.getAgent(agentId);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingAssignment = await this.prisma.userAssignedAgent.findFirst({
            where: {
                userId,
                agentTemplateId: agentId,
            },
        });
        if (existingAssignment) {
            throw new common_1.BadRequestException('Agent is already assigned to this user');
        }
        const assignment = await this.prisma.userAssignedAgent.create({
            data: {
                userId,
                agentTemplateId: agentId,
                customConfig: customConfig || {},
                assignedAt: new Date(),
            },
            include: {
                user: { select: { id: true, email: true, firstName: true, lastName: true } },
                agentTemplate: { select: { id: true, name: true, description: true } },
            },
        });
        return assignment;
    }
    async getUserAssignedAgents(userId) {
        const assignments = await this.prisma.userAssignedAgent.findMany({
            where: { userId },
            include: {
                agentTemplate: {
                    include: {
                        parameters: { orderBy: { order: 'asc' } },
                        outputConfig: true,
                        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
                    },
                },
            },
            orderBy: { assignedAt: 'desc' },
        });
        return assignments.map(assignment => ({
            id: assignment.id,
            assignedAt: assignment.assignedAt,
            customConfig: assignment.customConfig,
            agentTemplate: assignment.agentTemplate,
        }));
    }
    async removeAgentAssignment(assignmentId) {
        const assignment = await this.prisma.userAssignedAgent.findUnique({
            where: { id: assignmentId },
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Agent assignment not found');
        }
        await this.prisma.userAssignedAgent.delete({
            where: { id: assignmentId },
        });
        return { success: true };
    }
    async getAgentAnalytics(agentId, timeRange = '30d') {
        const agent = await this.getAgent(agentId);
        const timeRangeMs = this.parseTimeRange(timeRange);
        const startTime = new Date(Date.now() - timeRangeMs);
        const totalDeployments = await this.prisma.userAgentDeployment.count({
            where: { agentTemplateId: agentId },
        });
        const activeDeployments = await this.prisma.userAgentDeployment.count({
            where: {
                agentTemplateId: agentId,
                deploymentStatus: 'active',
            },
        });
        const deployments = await this.prisma.userAgentDeployment.findMany({
            where: { agentTemplateId: agentId },
            select: {
                executions: {
                    where: {
                        startedAt: { gte: startTime },
                    },
                    select: {
                        status: true,
                        startedAt: true,
                        stoppedAt: true,
                        userId: true,
                    },
                },
            },
        });
        const executions = deployments.flatMap(d => d.executions);
        const totalExecutions = executions.length;
        const completedExecutions = executions.filter(e => e.status === 'completed').length;
        const failedExecutions = executions.filter(e => e.status === 'failed').length;
        const successRate = totalExecutions > 0 ? (completedExecutions / totalExecutions) * 100 : 0;
        const completedWithTimes = executions.filter(e => e.status === 'completed' && e.stoppedAt && e.startedAt);
        const avgExecutionTime = completedWithTimes.length > 0
            ? completedWithTimes.reduce((sum, exec) => {
                const duration = exec.stoppedAt.getTime() - exec.startedAt.getTime();
                return sum + duration;
            }, 0) / completedWithTimes.length / 1000
            : 0;
        const uniqueUsers = new Set(executions.map(e => e.userId)).size;
        const totalAssignments = await this.prisma.userAssignedAgent.count({
            where: { agentTemplateId: agentId },
        });
        const intervalMs = Math.max(timeRangeMs / 20, 24 * 60 * 60 * 1000);
        const intervals = this.createTimeIntervals(startTime, new Date(), intervalMs);
        const executionTrends = intervals.map(interval => ({
            date: interval.start.toISOString().split('T')[0],
            executions: executions.filter(e => e.startedAt >= interval.start && e.startedAt < interval.end).length,
            completed: executions.filter(e => e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'completed').length,
            failed: executions.filter(e => e.startedAt >= interval.start && e.startedAt < interval.end && e.status === 'failed').length,
        }));
        const userExecutionCounts = executions.reduce((acc, exec) => {
            acc[exec.userId] = (acc[exec.userId] || 0) + 1;
            return acc;
        }, {});
        const topUsers = Object.entries(userExecutionCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([userId, count]) => ({ userId, executionCount: count }));
        return {
            agentId,
            agentName: agent.name,
            timeRange,
            summary: {
                totalDeployments,
                activeDeployments,
                totalAssignments,
                totalExecutions,
                completedExecutions,
                failedExecutions,
                successRate: Math.round(successRate * 100) / 100,
                avgExecutionTime: Math.round(avgExecutionTime * 100) / 100,
                uniqueUsers,
            },
            trends: {
                executionTrends,
                topUsers,
            },
        };
    }
    async getAgentsWithAnalytics() {
        const agents = await this.listAgents();
        const agentsWithAnalytics = await Promise.all(agents.map(async (agent) => {
            const totalDeployments = await this.prisma.userAgentDeployment.count({
                where: { agentTemplateId: agent.id },
            });
            const activeDeployments = await this.prisma.userAgentDeployment.count({
                where: {
                    agentTemplateId: agent.id,
                    deploymentStatus: 'active',
                },
            });
            const totalAssignments = await this.prisma.userAssignedAgent.count({
                where: { agentTemplateId: agent.id },
            });
            const recentDeployments = await this.prisma.userAgentDeployment.findMany({
                where: { agentTemplateId: agent.id },
                select: {
                    executions: {
                        where: {
                            startedAt: {
                                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                            },
                        },
                    },
                },
            });
            const recentExecutions = recentDeployments.reduce((sum, d) => sum + d.executions.length, 0);
            return {
                ...agent,
                analytics: {
                    totalDeployments,
                    activeDeployments,
                    totalAssignments,
                    recentExecutions,
                },
            };
        }));
        return agentsWithAnalytics;
    }
    parseTimeRange(timeRange) {
        const unit = timeRange.slice(-1);
        const value = parseInt(timeRange.slice(0, -1));
        switch (unit) {
            case 'd': return value * 24 * 60 * 60 * 1000;
            case 'w': return value * 7 * 24 * 60 * 60 * 1000;
            case 'm': return value * 30 * 24 * 60 * 60 * 1000;
            default: return 30 * 24 * 60 * 60 * 1000;
        }
    }
    createTimeIntervals(startTime, endTime, intervalMs) {
        const intervals = [];
        let currentTime = new Date(startTime);
        while (currentTime < endTime) {
            const nextTime = new Date(currentTime.getTime() + intervalMs);
            intervals.push({
                start: new Date(currentTime),
                end: nextTime > endTime ? endTime : nextTime,
            });
            currentTime = nextTime;
        }
        return intervals;
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        parser_service_1.N8NWorkflowParserService,
        type_inference_service_1.ParameterTypeInferenceService,
        event_bus_service_1.EventBusService])
], AgentsService);
//# sourceMappingURL=agents.service.js.map