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
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_metrics_service_1 = require("./services/dashboard-metrics.service");
const admin_guard_1 = require("../auth/guards/admin.guard");
let MetricsController = class MetricsController {
    dashboardMetricsService;
    constructor(dashboardMetricsService) {
        this.dashboardMetricsService = dashboardMetricsService;
    }
    async getOverviewMetrics() {
        return this.dashboardMetricsService.getOverviewMetrics();
    }
    async getAgentMetrics(timeRange = '1h') {
        return this.dashboardMetricsService.getAgentMetrics(timeRange);
    }
    async getSystemMetrics(timeRange = '1h') {
        return this.dashboardMetricsService.getSystemMetrics(timeRange);
    }
    async getExecutionMetrics(timeRange = '1h') {
        return this.dashboardMetricsService.getExecutionMetrics(timeRange);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getOverviewMetrics", null);
__decorate([
    (0, common_1.Get)('agents'),
    __param(0, (0, common_1.Query)('timeRange')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getAgentMetrics", null);
__decorate([
    (0, common_1.Get)('system'),
    __param(0, (0, common_1.Query)('timeRange')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getSystemMetrics", null);
__decorate([
    (0, common_1.Get)('executions'),
    __param(0, (0, common_1.Query)('timeRange')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getExecutionMetrics", null);
exports.MetricsController = MetricsController = __decorate([
    (0, common_1.Controller)('metrics'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [dashboard_metrics_service_1.DashboardMetricsService])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map