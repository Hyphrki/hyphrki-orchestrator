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
exports.ExecutionsController = exports.DeploymentsController = void 0;
const common_1 = require("@nestjs/common");
const deployments_service_1 = require("./deployments.service");
const create_deployment_dto_1 = require("./dto/create-deployment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const client_1 = require("@prisma/client");
let DeploymentsController = class DeploymentsController {
    deploymentsService;
    constructor(deploymentsService) {
        this.deploymentsService = deploymentsService;
    }
    async createDeployment(userId, createDeploymentDto) {
        return this.deploymentsService.createDeployment(userId, createDeploymentDto);
    }
    async listDeployments(userId, status) {
        return this.deploymentsService.listDeployments(userId, status);
    }
    async getDeployment(id) {
        return this.deploymentsService.getDeployment(id);
    }
    async executeDeployment(deploymentId, userId, executeDto) {
        return this.deploymentsService.executeDeployment(deploymentId, userId, executeDto);
    }
    async deleteDeployment(id) {
        await this.deploymentsService.deleteDeployment(id);
        return { message: 'Deployment deleted successfully' };
    }
    async getDeploymentExecutions(deploymentId) {
        return this.deploymentsService.listExecutions(undefined, deploymentId);
    }
};
exports.DeploymentsController = DeploymentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_deployment_dto_1.CreateDeploymentDto]),
    __metadata("design:returntype", Promise)
], DeploymentsController.prototype, "createDeployment", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeploymentsController.prototype, "listDeployments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeploymentsController.prototype, "getDeployment", null);
__decorate([
    (0, common_1.Post)(':id/execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_deployment_dto_1.ExecuteDeploymentDto]),
    __metadata("design:returntype", Promise)
], DeploymentsController.prototype, "executeDeployment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeploymentsController.prototype, "deleteDeployment", null);
__decorate([
    (0, common_1.Get)(':id/executions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeploymentsController.prototype, "getDeploymentExecutions", null);
exports.DeploymentsController = DeploymentsController = __decorate([
    (0, common_1.Controller)('deployments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [deployments_service_1.DeploymentsService])
], DeploymentsController);
let ExecutionsController = class ExecutionsController {
    deploymentsService;
    constructor(deploymentsService) {
        this.deploymentsService = deploymentsService;
    }
    async listExecutions(userId, deploymentId) {
        return this.deploymentsService.listExecutions(userId, deploymentId);
    }
    async getExecution(id) {
        return this.deploymentsService.getExecution(id);
    }
};
exports.ExecutionsController = ExecutionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)('deploymentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "listExecutions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "getExecution", null);
exports.ExecutionsController = ExecutionsController = __decorate([
    (0, common_1.Controller)('executions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [deployments_service_1.DeploymentsService])
], ExecutionsController);
//# sourceMappingURL=deployments.controller.js.map