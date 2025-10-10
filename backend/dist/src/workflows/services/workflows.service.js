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
exports.WorkflowsService = void 0;
const common_1 = require("@nestjs/common");
const workflow_repository_1 = require("../../database/repositories/workflow.repository");
const agent_repository_1 = require("../../database/repositories/agent.repository");
const user_repository_1 = require("../../database/repositories/user.repository");
const sync_service_1 = require("../../websocket/sync.service");
let WorkflowsService = class WorkflowsService {
    workflowRepository;
    agentRepository;
    userRepository;
    syncService;
    constructor(workflowRepository, agentRepository, userRepository, syncService) {
        this.workflowRepository = workflowRepository;
        this.agentRepository = agentRepository;
        this.userRepository = userRepository;
        this.syncService = syncService;
    }
    async getAgentWorkflows(userId, agentId) {
        const agent = await this.agentRepository.findById(agentId);
        if (!agent) {
            throw new common_1.NotFoundException('Agent not found');
        }
        if (!this.canAccessAgent(userId, agent)) {
            throw new common_1.ForbiddenException('Access denied to agent');
        }
        const workflows = await this.workflowRepository.findByAgentId(agentId);
        return {
            workflows: workflows.map((workflow) => this.formatWorkflow(workflow)),
        };
    }
    async createWorkflow(userId, agentId, createData) {
        const agent = await this.agentRepository.findById(agentId);
        if (!agent) {
            throw new common_1.NotFoundException('Agent not found');
        }
        if (!this.canAccessAgent(userId, agent)) {
            throw new common_1.ForbiddenException('Access denied to agent');
        }
        if (createData.framework !== agent.framework) {
            throw new common_1.ForbiddenException('Workflow framework must match agent framework');
        }
        const latestWorkflow = await this.workflowRepository.findLatestByAgentId(agentId);
        const nextVersion = latestWorkflow
            ? this.incrementVersion(latestWorkflow.version)
            : '1.0.0';
        const workflow = await this.workflowRepository.create({
            agent: { connect: { id: agentId } },
            name: createData.name,
            description: createData.description,
            workflowData: createData.workflow_data,
            workflowType: createData.workflow_type,
            framework: createData.framework,
            version: nextVersion,
        });
        const formattedWorkflow = this.formatWorkflow(workflow);
        if (agent.ownerType === 'organization') {
            this.syncService.emitWorkflowCreated(formattedWorkflow, agent.ownerId);
        }
        else {
            this.syncService.emitToUser(userId, {
                entityType: 'workflow',
                entityId: workflow.id,
                operation: 'create',
                changes: formattedWorkflow,
                sourcePortal: 'user',
            });
        }
        return formattedWorkflow;
    }
    async getWorkflowById(userId, workflowId) {
        const workflow = await this.workflowRepository.findById(workflowId);
        if (!workflow) {
            throw new common_1.NotFoundException('Workflow not found');
        }
        if (!this.canAccessAgent(userId, workflow.agent)) {
            throw new common_1.ForbiddenException('Access denied to workflow');
        }
        return this.formatWorkflowDetails(workflow);
    }
    async updateWorkflow(userId, workflowId, updateData) {
        const workflow = await this.workflowRepository.findById(workflowId);
        if (!workflow) {
            throw new common_1.NotFoundException('Workflow not found');
        }
        if (!this.canAccessAgent(userId, workflow.agent)) {
            throw new common_1.ForbiddenException('Access denied to workflow');
        }
        const shouldIncrementVersion = updateData.workflow_data !== undefined;
        const nextVersion = shouldIncrementVersion
            ? this.incrementVersion(workflow.version)
            : workflow.version;
        const updatedWorkflow = await this.workflowRepository.update(workflowId, {
            ...(updateData.name && { name: updateData.name }),
            ...(updateData.description !== undefined && {
                description: updateData.description,
            }),
            ...(updateData.workflow_data && {
                workflowData: updateData.workflow_data,
            }),
            ...(shouldIncrementVersion && { version: nextVersion }),
        });
        const formattedWorkflow = this.formatWorkflow(updatedWorkflow);
        if (workflow.agent.ownerType === 'organization') {
            this.syncService.emitWorkflowUpdated(formattedWorkflow, workflow.agent.ownerId);
        }
        else {
            this.syncService.emitToUser(userId, {
                entityType: 'workflow',
                entityId: workflowId,
                operation: 'update',
                changes: formattedWorkflow,
                sourcePortal: 'user',
            });
        }
        return formattedWorkflow;
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
    incrementVersion(version) {
        const parts = version.split('.');
        const patch = parseInt(parts[2] || '0') + 1;
        return `${parts[0]}.${parts[1]}.${patch}`;
    }
    formatWorkflow(workflow) {
        return {
            id: workflow.id,
            name: workflow.name,
            description: workflow.description,
            workflow_type: workflow.workflowType,
            framework: workflow.framework,
            version: workflow.version,
            created_at: workflow.createdAt,
            updated_at: workflow.updatedAt,
            is_active: workflow.isActive,
        };
    }
    formatWorkflowDetails(workflow) {
        return {
            ...this.formatWorkflow(workflow),
            workflow_data: workflow.workflowData,
        };
    }
};
exports.WorkflowsService = WorkflowsService;
exports.WorkflowsService = WorkflowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workflow_repository_1.WorkflowRepository,
        agent_repository_1.AgentRepository,
        user_repository_1.UserRepository,
        sync_service_1.SyncService])
], WorkflowsService);
//# sourceMappingURL=workflows.service.js.map