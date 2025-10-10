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
exports.WorkflowExecutionsController = exports.ExecutionsController = void 0;
const common_1 = require("@nestjs/common");
const executions_service_1 = require("../services/executions.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../../auth/decorators/user.decorator");
const execute_workflow_dto_1 = require("../dto/execute-workflow.dto");
const authorization_decorators_1 = require("../../security/authorization/authorization.decorators");
const authorization_types_1 = require("../../security/authorization/authorization.types");
let ExecutionsController = class ExecutionsController {
    executionsService;
    constructor(executionsService) {
        this.executionsService = executionsService;
    }
    async getExecutions(userId, query) {
        const { workflow_id, agent_id, status, start_date, end_date, page = 1, limit = 20, } = query;
        return this.executionsService.getExecutions(userId, {
            workflow_id,
            agent_id,
            status,
            start_date,
            end_date,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    }
    async getExecution(userId, executionId) {
        return this.executionsService.getExecutionById(userId, executionId);
    }
};
exports.ExecutionsController = ExecutionsController;
__decorate([
    (0, common_1.Get)(),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.EXECUTION_MANAGEMENT[0]),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "getExecutions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.EXECUTION_MANAGEMENT[0]),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "getExecution", null);
exports.ExecutionsController = ExecutionsController = __decorate([
    (0, common_1.Controller)('executions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, authorization_decorators_1.Resource)(authorization_types_1.ResourceType.EXECUTION),
    __metadata("design:paramtypes", [executions_service_1.ExecutionsService])
], ExecutionsController);
let WorkflowExecutionsController = class WorkflowExecutionsController {
    executionsService;
    constructor(executionsService) {
        this.executionsService = executionsService;
    }
    async executeWorkflow(userId, workflowId, executeData) {
        return this.executionsService.executeWorkflow(userId, workflowId, executeData);
    }
};
exports.WorkflowExecutionsController = WorkflowExecutionsController;
__decorate([
    (0, common_1.Post)(':id/execute'),
    (0, authorization_decorators_1.RequirePermissions)(authorization_decorators_1.PermissionGroups.EXECUTION_MANAGEMENT[1]),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, execute_workflow_dto_1.ExecuteWorkflowDto]),
    __metadata("design:returntype", Promise)
], WorkflowExecutionsController.prototype, "executeWorkflow", null);
exports.WorkflowExecutionsController = WorkflowExecutionsController = __decorate([
    (0, common_1.Controller)('workflows'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, authorization_decorators_1.Resource)(authorization_types_1.ResourceType.EXECUTION),
    __metadata("design:paramtypes", [executions_service_1.ExecutionsService])
], WorkflowExecutionsController);
//# sourceMappingURL=executions.controller.js.map