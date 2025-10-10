"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ROLE_PERMISSIONS = exports.ROLE_HIERARCHY = exports.ResourceType = exports.Permission = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "super_admin";
    UserRole["ORG_ADMIN"] = "org_admin";
    UserRole["ORG_MEMBER"] = "org_member";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var Permission;
(function (Permission) {
    Permission["ORG_CREATE"] = "org:create";
    Permission["ORG_READ"] = "org:read";
    Permission["ORG_UPDATE"] = "org:update";
    Permission["ORG_DELETE"] = "org:delete";
    Permission["USER_CREATE"] = "user:create";
    Permission["USER_READ"] = "user:read";
    Permission["USER_UPDATE"] = "user:update";
    Permission["USER_DELETE"] = "user:delete";
    Permission["AGENT_CREATE"] = "agent:create";
    Permission["AGENT_READ"] = "agent:read";
    Permission["AGENT_UPDATE"] = "agent:update";
    Permission["AGENT_DELETE"] = "agent:delete";
    Permission["AGENT_EXECUTE"] = "agent:execute";
    Permission["WORKFLOW_CREATE"] = "workflow:create";
    Permission["WORKFLOW_READ"] = "workflow:read";
    Permission["WORKFLOW_UPDATE"] = "workflow:update";
    Permission["WORKFLOW_DELETE"] = "workflow:delete";
    Permission["WORKFLOW_EXECUTE"] = "workflow:execute";
    Permission["EXECUTION_READ"] = "execution:read";
    Permission["EXECUTION_CANCEL"] = "execution:cancel";
    Permission["FRAMEWORK_READ"] = "framework:read";
    Permission["FRAMEWORK_EXECUTE"] = "framework:execute";
})(Permission || (exports.Permission = Permission = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["ORGANIZATION"] = "organization";
    ResourceType["USER"] = "user";
    ResourceType["AGENT"] = "agent";
    ResourceType["WORKFLOW"] = "workflow";
    ResourceType["EXECUTION"] = "execution";
    ResourceType["FRAMEWORK"] = "framework";
    ResourceType["AUTH"] = "auth";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
exports.ROLE_HIERARCHY = {
    [UserRole.SUPER_ADMIN]: [
        UserRole.SUPER_ADMIN,
        UserRole.ORG_ADMIN,
        UserRole.ORG_MEMBER,
        UserRole.USER,
    ],
    [UserRole.ORG_ADMIN]: [
        UserRole.ORG_ADMIN,
        UserRole.ORG_MEMBER,
        UserRole.USER,
    ],
    [UserRole.ORG_MEMBER]: [UserRole.ORG_MEMBER, UserRole.USER],
    [UserRole.USER]: [UserRole.USER],
};
exports.DEFAULT_ROLE_PERMISSIONS = {
    [UserRole.SUPER_ADMIN]: [
        ...Object.values(Permission),
    ],
    [UserRole.ORG_ADMIN]: [
        Permission.ORG_READ,
        Permission.ORG_UPDATE,
        Permission.USER_READ,
        Permission.USER_UPDATE,
        Permission.AGENT_CREATE,
        Permission.AGENT_READ,
        Permission.AGENT_UPDATE,
        Permission.AGENT_DELETE,
        Permission.AGENT_EXECUTE,
        Permission.WORKFLOW_CREATE,
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_UPDATE,
        Permission.WORKFLOW_DELETE,
        Permission.WORKFLOW_EXECUTE,
        Permission.EXECUTION_READ,
        Permission.EXECUTION_CANCEL,
        Permission.FRAMEWORK_READ,
        Permission.FRAMEWORK_EXECUTE,
    ],
    [UserRole.ORG_MEMBER]: [
        Permission.AGENT_READ,
        Permission.AGENT_EXECUTE,
        Permission.WORKFLOW_CREATE,
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_UPDATE,
        Permission.WORKFLOW_EXECUTE,
        Permission.EXECUTION_READ,
        Permission.FRAMEWORK_READ,
        Permission.FRAMEWORK_EXECUTE,
    ],
    [UserRole.USER]: [
        Permission.AGENT_READ,
        Permission.WORKFLOW_READ,
        Permission.EXECUTION_READ,
        Permission.FRAMEWORK_READ,
    ],
};
//# sourceMappingURL=authorization.types.js.map