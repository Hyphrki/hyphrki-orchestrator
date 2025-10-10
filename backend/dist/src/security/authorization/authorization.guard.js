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
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const authorization_service_1 = require("./authorization.service");
const authorization_types_1 = require("./authorization.types");
const skip_auth_decorator_1 = require("../../auth/decorators/skip-auth.decorator");
let AuthorizationGuard = class AuthorizationGuard {
    reflector;
    authorizationService;
    constructor(reflector, authorizationService) {
        this.reflector = reflector;
        this.authorizationService = authorizationService;
    }
    async canActivate(context) {
        const skipAuth = this.reflector.getAllAndOverride(skip_auth_decorator_1.SKIP_AUTH_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (skipAuth) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('User not authenticated');
        }
        const requiredPermissions = this.reflector.getAllAndOverride('permissions', [context.getHandler(), context.getClass()]);
        const resourceType = this.reflector.getAllAndOverride('resourceType', [context.getHandler(), context.getClass()]);
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }
        const resourceId = this.extractResourceId(request, resourceType);
        for (const permission of requiredPermissions) {
            const result = await this.authorizationService.checkPermission(user.id, permission, resourceType, resourceId);
            if (!result.allowed) {
                throw new common_1.ForbiddenException(result.reason || 'Insufficient permissions');
            }
        }
        return true;
    }
    extractResourceId(request, resourceType) {
        const { params, body } = request;
        if (params.id) {
            return params.id;
        }
        switch (resourceType) {
            case authorization_types_1.ResourceType.ORGANIZATION:
                return params.organizationId || params.orgId || body.organizationId;
            case authorization_types_1.ResourceType.USER:
                return params.userId || body.userId;
            case authorization_types_1.ResourceType.AGENT:
                return params.agentId || body.agentId;
            case authorization_types_1.ResourceType.WORKFLOW:
                return params.workflowId || body.workflowId;
            case authorization_types_1.ResourceType.EXECUTION:
                return params.executionId || body.executionId;
            default:
                return params.id || body.id;
        }
    }
};
exports.AuthorizationGuard = AuthorizationGuard;
exports.AuthorizationGuard = AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        authorization_service_1.AuthorizationService])
], AuthorizationGuard);
//# sourceMappingURL=authorization.guard.js.map