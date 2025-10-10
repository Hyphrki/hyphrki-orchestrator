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
exports.AgentWorkflowsController = exports.WorkflowsController = void 0;
const common_1 = require("@nestjs/common");
const workflows_service_1 = require("../services/workflows.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../../auth/decorators/user.decorator");
const create_workflow_dto_1 = require("../dto/create-workflow.dto");
const update_workflow_dto_1 = require("../dto/update-workflow.dto");
const authorization_decorators_1 = require("../../security/authorization/authorization.decorators");
const authorization_types_1 = require("../../security/authorization/authorization.types");
let WorkflowsController = class WorkflowsController {
    workflowsService;
    constructor(workflowsService) {
        this.workflowsService = workflowsService;
    }
    async getWorkflow(userId, workflowId) {
        return this.workflowsService.getWorkflowById(userId, workflowId);
    }
    async updateWorkflow(userId, workflowId, updateData) {
        return this.workflowsService.updateWorkflow(userId, workflowId, updateData);
    }
};
exports.WorkflowsController = WorkflowsController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.WORKFLOW_MANAGEMENT[0]),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "getWorkflow", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.WORKFLOW_MANAGEMENT[1]),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_workflow_dto_1.UpdateWorkflowDto]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "updateWorkflow", null);
exports.WorkflowsController = WorkflowsController = __decorate([
    (0, common_1.Controller)('workflows'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, authorization_decorators_1.Resource)(authorization_types_1.ResourceType.WORKFLOW),
    __metadata("design:paramtypes", [workflows_service_1.WorkflowsService])
], WorkflowsController);
let AgentWorkflowsController = class AgentWorkflowsController {
    workflowsService;
    constructor(workflowsService) {
        this.workflowsService = workflowsService;
    }
    async getAgentWorkflows(userId, agentId) {
        return this.workflowsService.getAgentWorkflows(userId, agentId);
    }
    async createWorkflow(userId, agentId, createData) {
        return this.workflowsService.createWorkflow(userId, agentId, createData);
    }
};
exports.AgentWorkflowsController = AgentWorkflowsController;
__decorate([
    (0, common_1.Get)(':agentId/workflows'),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.WORKFLOW_MANAGEMENT[0]),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AgentWorkflowsController.prototype, "getAgentWorkflows", null);
__decorate([
    (0, common_1.Post)(':agentId/workflows'),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.WORKFLOW_MANAGEMENT[1]),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('agentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_workflow_dto_1.CreateWorkflowDto]),
    __metadata("design:returntype", Promise)
], AgentWorkflowsController.prototype, "createWorkflow", null);
exports.AgentWorkflowsController = AgentWorkflowsController = __decorate([
    (0, common_1.Controller)('agents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, authorization_decorators_1.Resource)(authorization_types_1.ResourceType.WORKFLOW),
    __metadata("design:paramtypes", [workflows_service_1.WorkflowsService])
], AgentWorkflowsController);
//# sourceMappingURL=workflows.controller.js.map