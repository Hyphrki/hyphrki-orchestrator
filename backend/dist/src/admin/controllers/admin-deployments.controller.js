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
exports.AdminDeploymentsController = void 0;
const common_1 = require("@nestjs/common");
const admin_deployments_service_1 = require("../services/admin-deployments.service");
const admin_guard_1 = require("../../auth/guards/admin.guard");
let AdminDeploymentsController = class AdminDeploymentsController {
    adminDeploymentsService;
    constructor(adminDeploymentsService) {
        this.adminDeploymentsService = adminDeploymentsService;
    }
    async listDeployments(userId, agentTemplateId, status, page, limit) {
        return this.adminDeploymentsService.listDeployments({
            userId,
            agentTemplateId,
            status,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async getDeployment(id) {
        return this.adminDeploymentsService.getDeploymentDetail(id);
    }
    async getDeploymentExecutions(deploymentId, page, limit) {
        return this.adminDeploymentsService.getDeploymentExecutions(deploymentId, page ? parseInt(page) : 1, limit ? parseInt(limit) : 20);
    }
    async executeDeployment(deploymentId, inputParameters) {
        return this.adminDeploymentsService.executeDeployment(deploymentId, inputParameters);
    }
};
exports.AdminDeploymentsController = AdminDeploymentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('agentTemplateId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminDeploymentsController.prototype, "listDeployments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminDeploymentsController.prototype, "getDeployment", null);
__decorate([
    (0, common_1.Get)(':id/executions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminDeploymentsController.prototype, "getDeploymentExecutions", null);
__decorate([
    (0, common_1.Post)(':id/execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminDeploymentsController.prototype, "executeDeployment", null);
exports.AdminDeploymentsController = AdminDeploymentsController = __decorate([
    (0, common_1.Controller)('admin/deployments'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [admin_deployments_service_1.AdminDeploymentsService])
], AdminDeploymentsController);
//# sourceMappingURL=admin-deployments.controller.js.map