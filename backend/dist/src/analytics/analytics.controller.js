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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const analytics_service_1 = require("./analytics.service");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getAnalytics(userId, period = '30d') {
        return this.analyticsService.getUserAnalytics(userId, period);
    }
    async getUsageMetrics(userId, period = '30d') {
        return this.analyticsService.getUsageMetrics(userId, period);
    }
    async exportAnalytics(userId, format = 'json', period = '30d', res) {
        const data = await this.analyticsService.exportAnalytics(userId, format, period);
        if (format === 'csv') {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="analytics-${userId}-${period}.csv"`);
            res.send(data);
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename="analytics-${userId}-${period}.json"`);
            res.json(data);
        }
    }
    async getDashboardData(userId) {
        const [analytics, metrics] = await Promise.all([
            this.analyticsService.getUserAnalytics(userId, '30d'),
            this.analyticsService.getUsageMetrics(userId, '7d'),
        ]);
        return {
            summary: analytics,
            recentActivity: metrics.slice(-7),
            trends: this.calculateTrends(metrics),
        };
    }
    calculateTrends(metrics) {
        if (metrics.length < 2)
            return { executions: 0, computeTime: 0 };
        const recent = metrics.slice(-7);
        const previous = metrics.slice(-14, -7);
        const recentAvg = {
            executions: recent.reduce((sum, m) => sum + m.executions, 0) / recent.length,
            computeTime: recent.reduce((sum, m) => sum + m.computeTime, 0) / recent.length,
        };
        const previousAvg = {
            executions: previous.reduce((sum, m) => sum + m.executions, 0) / Math.max(previous.length, 1),
            computeTime: previous.reduce((sum, m) => sum + m.computeTime, 0) / Math.max(previous.length, 1),
        };
        return {
            executions: previousAvg.executions > 0
                ? ((recentAvg.executions - previousAvg.executions) / previousAvg.executions) * 100
                : 0,
            computeTime: previousAvg.computeTime > 0
                ? ((recentAvg.computeTime - previousAvg.computeTime) / previousAvg.computeTime) * 100
                : 0,
        };
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('metrics'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getUsageMetrics", null);
__decorate([
    (0, common_1.Post)('export'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)('format')),
    __param(2, (0, common_1.Query)('period')),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "exportAnalytics", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getDashboardData", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)('analytics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map