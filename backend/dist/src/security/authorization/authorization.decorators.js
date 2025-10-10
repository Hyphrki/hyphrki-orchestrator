"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = exports.PermissionGroups = exports.RequireOrgMember = exports.RequireOrgAdmin = exports.Resource = exports.RequirePermissions = void 0;
const common_1 = require("@nestjs/common");
const authorization_types_1 = require("./authorization.types");
const authorization_guard_1 = require("./authorization.guard");
Object.defineProperty(exports, "AuthorizationGuard", { enumerable: true, get: function () { return authorization_guard_1.AuthorizationGuard; } });
const RequirePermissions = (...permissions) => {
    return (0, common_1.SetMetadata)('permissions', permissions);
};
exports.RequirePermissions = RequirePermissions;
const Resource = (resourceType) => {
    return (0, common_1.SetMetadata)('resourceType', resourceType);
};
exports.Resource = Resource;
const RequireOrgAdmin = () => {
    return (0, exports.RequirePermissions)(authorization_types_1.Permission.ORG_READ, authorization_types_1.Permission.ORG_UPDATE, authorization_types_1.Permission.USER_READ, authorization_types_1.Permission.USER_UPDATE, authorization_types_1.Permission.AGENT_CREATE, authorization_types_1.Permission.AGENT_READ, authorization_types_1.Permission.AGENT_UPDATE, authorization_types_1.Permission.AGENT_DELETE, authorization_types_1.Permission.WORKFLOW_CREATE, authorization_types_1.Permission.WORKFLOW_READ, authorization_types_1.Permission.WORKFLOW_UPDATE, authorization_types_1.Permission.WORKFLOW_DELETE);
};
exports.RequireOrgAdmin = RequireOrgAdmin;
const RequireOrgMember = () => {
    return (0, exports.RequirePermissions)(authorization_types_1.Permission.AGENT_READ, authorization_types_1.Permission.AGENT_EXECUTE, authorization_types_1.Permission.WORKFLOW_CREATE, authorization_types_1.Permission.WORKFLOW_READ, authorization_types_1.Permission.WORKFLOW_UPDATE, authorization_types_1.Permission.WORKFLOW_EXECUTE, authorization_types_1.Permission.EXECUTION_READ);
};
exports.RequireOrgMember = RequireOrgMember;
exports.PermissionGroups = {
    ORGANIZATION_MANAGEMENT: [authorization_types_1.Permission.ORG_READ, authorization_types_1.Permission.ORG_UPDATE],
    USER_MANAGEMENT: [
        authorization_types_1.Permission.USER_READ,
        authorization_types_1.Permission.USER_UPDATE,
        authorization_types_1.Permission.USER_DELETE,
    ],
    AGENT_MANAGEMENT: [
        authorization_types_1.Permission.AGENT_CREATE,
        authorization_types_1.Permission.AGENT_READ,
        authorization_types_1.Permission.AGENT_UPDATE,
        authorization_types_1.Permission.AGENT_DELETE,
    ],
    AGENT_EXECUTION: [authorization_types_1.Permission.AGENT_READ, authorization_types_1.Permission.AGENT_EXECUTE],
    WORKFLOW_MANAGEMENT: [
        authorization_types_1.Permission.WORKFLOW_CREATE,
        authorization_types_1.Permission.WORKFLOW_READ,
        authorization_types_1.Permission.WORKFLOW_UPDATE,
        authorization_types_1.Permission.WORKFLOW_DELETE,
    ],
    WORKFLOW_EXECUTION: [
        authorization_types_1.Permission.WORKFLOW_READ,
        authorization_types_1.Permission.WORKFLOW_EXECUTE,
        authorization_types_1.Permission.EXECUTION_READ,
    ],
    EXECUTION_MANAGEMENT: [
        authorization_types_1.Permission.EXECUTION_READ,
        authorization_types_1.Permission.EXECUTION_CANCEL,
    ],
    FRAMEWORK_ACCESS: [authorization_types_1.Permission.FRAMEWORK_READ, authorization_types_1.Permission.FRAMEWORK_EXECUTE],
    AUTH_MANAGEMENT: [
        authorization_types_1.Permission.USER_READ,
    ],
};
//# sourceMappingURL=authorization.decorators.js.map