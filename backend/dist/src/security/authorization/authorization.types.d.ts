export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    ORG_ADMIN = "org_admin",
    ORG_MEMBER = "org_member",
    USER = "user"
}
export declare enum Permission {
    ORG_CREATE = "org:create",
    ORG_READ = "org:read",
    ORG_UPDATE = "org:update",
    ORG_DELETE = "org:delete",
    USER_CREATE = "user:create",
    USER_READ = "user:read",
    USER_UPDATE = "user:update",
    USER_DELETE = "user:delete",
    AGENT_CREATE = "agent:create",
    AGENT_READ = "agent:read",
    AGENT_UPDATE = "agent:update",
    AGENT_DELETE = "agent:delete",
    AGENT_EXECUTE = "agent:execute",
    WORKFLOW_CREATE = "workflow:create",
    WORKFLOW_READ = "workflow:read",
    WORKFLOW_UPDATE = "workflow:update",
    WORKFLOW_DELETE = "workflow:delete",
    WORKFLOW_EXECUTE = "workflow:execute",
    EXECUTION_READ = "execution:read",
    EXECUTION_CANCEL = "execution:cancel",
    FRAMEWORK_READ = "framework:read",
    FRAMEWORK_EXECUTE = "framework:execute"
}
export declare enum ResourceType {
    ORGANIZATION = "organization",
    USER = "user",
    AGENT = "agent",
    WORKFLOW = "workflow",
    EXECUTION = "execution",
    FRAMEWORK = "framework",
    AUTH = "auth"
}
export interface RolePermissions {
    [UserRole.SUPER_ADMIN]: Permission[];
    [UserRole.ORG_ADMIN]: Permission[];
    [UserRole.ORG_MEMBER]: Permission[];
    [UserRole.USER]: Permission[];
}
export interface AccessControlEntry {
    role: UserRole;
    resourceType: ResourceType;
    resourceId?: string;
    permissions: Permission[];
    conditions?: AccessCondition[];
}
export interface AccessCondition {
    field: string;
    operator: 'eq' | 'ne' | 'in' | 'nin' | 'gt' | 'lt' | 'gte' | 'lte';
    value: any;
}
export interface AuthorizationContext {
    userId: string;
    userRoles: UserRole[];
    organizationId?: string;
    resourceType?: ResourceType;
    resourceId?: string;
    action: Permission;
}
export interface AuthorizationResult {
    allowed: boolean;
    reason?: string;
    requiredPermissions?: Permission[];
    userPermissions?: Permission[];
}
export declare const ROLE_HIERARCHY: Record<UserRole, UserRole[]>;
export declare const DEFAULT_ROLE_PERMISSIONS: RolePermissions;
