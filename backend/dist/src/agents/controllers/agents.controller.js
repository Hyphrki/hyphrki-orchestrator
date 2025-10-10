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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsController = void 0;
const common_1 = require("@nestjs/common");
const agents_service_1 = require("../services/agents.service");
const create_agent_dto_1 = require("../dto/create-agent.dto");
const publish_agent_dto_1 = require("../dto/publish-agent.dto");
const client_1 = require("@prisma/client");
const admin_guard_1 = require("../../auth/guards/admin.guard");
let AgentsController = class AgentsController {
    agentsService;
    constructor(agentsService) {
        this.agentsService = agentsService;
    }
    async createAgent(createAgentDto) {
        return this.agentsService.createAgent(createAgentDto);
    }
    async listAgents(status, category, createdById) {
        return this.agentsService.listAgents(status, category, createdById);
    }
    async getAgent(id) {
        return this.agentsService.getAgent(id);
    }
    async updateAgent(id, updateData) {
        return this.agentsService.updateAgent(id, updateData);
    }
    async deleteAgent(id) {
        await this.agentsService.deleteAgent(id);
        return { message: 'Agent deleted successfully' };
    }
    async publishAgent(id, publishDto) {
        return this.agentsService.publishAgent(id, publishDto);
    }
    async unpublishAgent(id) {
        return this.agentsService.unpublishAgent(id);
    }
    async assignAgentToUser(agentId, userId, customConfig) {
        return this.agentsService.assignAgentToUser(agentId, userId, customConfig);
    }
    async getUserAssignedAgents(userId) {
        return this.agentsService.getUserAssignedAgents(userId);
    }
    async removeAgentAssignment(assignmentId) {
        return this.agentsService.removeAgentAssignment(assignmentId);
    }
    async getAgentAnalytics(agentId, timeRange) {
        return this.agentsService.getAgentAnalytics(agentId, timeRange);
    }
    async getAgentsWithAnalytics() {
        return this.agentsService.getAgentsWithAnalytics();
    }
};
exports.AgentsController = AgentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agent_dto_1.CreateAgentDto]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "createAgent", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('createdById')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "listAgents", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getAgent", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "updateAgent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "deleteAgent", null);
__decorate([
    (0, common_1.Post)(':id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, publish_agent_dto_1.PublishAgentDto]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "publishAgent", null);
__decorate([
    (0, common_1.Post)(':id/unpublish'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "unpublishAgent", null);
__decorate([
    (0, common_1.Post)(':id/assign/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "assignAgentToUser", null);
__decorate([
    (0, common_1.Get)('user/:userId/assigned'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getUserAssignedAgents", null);
__decorate([
    (0, common_1.Delete)('assignments/:assignmentId'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "removeAgentAssignment", null);
__decorate([
    (0, common_1.Get)(':id/analytics'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('timeRange')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getAgentAnalytics", null);
__decorate([
    (0, common_1.Get)('analytics/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getAgentsWithAnalytics", null);
exports.AgentsController = AgentsController = __decorate([
    (0, common_1.Controller)('agents'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [agents_service_1.AgentsService])
], AgentsController);
//# sourceMappingURL=agents.controller.js.map