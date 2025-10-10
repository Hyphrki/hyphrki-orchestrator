// Authorization types and interfaces for RBAC implementation

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ORG_ADMIN = 'org_admin',
  ORG_MEMBER = 'org_member',
  USER = 'user',
}

export enum Permission {
  // Organization permissions
  ORG_CREATE = 'org:create',
  ORG_READ = 'org:read',
  ORG_UPDATE = 'org:update',
  ORG_DELETE = 'org:delete',

  // User permissions
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // Agent permissions
  AGENT_CREATE = 'agent:create',
  AGENT_READ = 'agent:read',
  AGENT_UPDATE = 'agent:update',
  AGENT_DELETE = 'agent:delete',
  AGENT_EXECUTE = 'agent:execute',

  // Workflow permissions
  WORKFLOW_CREATE = 'workflow:create',
  WORKFLOW_READ = 'workflow:read',
  WORKFLOW_UPDATE = 'workflow:update',
  WORKFLOW_DELETE = 'workflow:delete',
  WORKFLOW_EXECUTE = 'workflow:execute',

  // Execution permissions
  EXECUTION_READ = 'execution:read',
  EXECUTION_CANCEL = 'execution:cancel',

  // Framework permissions
  FRAMEWORK_READ = 'framework:read',
  FRAMEWORK_EXECUTE = 'framework:execute',
}

export enum ResourceType {
  ORGANIZATION = 'organization',
  USER = 'user',
  AGENT = 'agent',
  WORKFLOW = 'workflow',
  EXECUTION = 'execution',
  FRAMEWORK = 'framework',
  AUTH = 'auth',
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

// Role hierarchy for permission inheritance
export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
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

// Default permissions for each role
export const DEFAULT_ROLE_PERMISSIONS: RolePermissions = {
  [UserRole.SUPER_ADMIN]: [
    // All permissions
    ...Object.values(Permission),
  ],
  [UserRole.ORG_ADMIN]: [
    // Organization permissions
    Permission.ORG_READ,
    Permission.ORG_UPDATE,

    // User permissions within organization
    Permission.USER_READ,
    Permission.USER_UPDATE,

    // Agent permissions
    Permission.AGENT_CREATE,
    Permission.AGENT_READ,
    Permission.AGENT_UPDATE,
    Permission.AGENT_DELETE,
    Permission.AGENT_EXECUTE,

    // Workflow permissions
    Permission.WORKFLOW_CREATE,
    Permission.WORKFLOW_READ,
    Permission.WORKFLOW_UPDATE,
    Permission.WORKFLOW_DELETE,
    Permission.WORKFLOW_EXECUTE,

    // Execution permissions
    Permission.EXECUTION_READ,
    Permission.EXECUTION_CANCEL,

    // Framework permissions
    Permission.FRAMEWORK_READ,
    Permission.FRAMEWORK_EXECUTE,
  ],
  [UserRole.ORG_MEMBER]: [
    // Agent permissions (read-only for own agents)
    Permission.AGENT_READ,
    Permission.AGENT_EXECUTE,

    // Workflow permissions
    Permission.WORKFLOW_CREATE,
    Permission.WORKFLOW_READ,
    Permission.WORKFLOW_UPDATE,
    Permission.WORKFLOW_EXECUTE,

    // Execution permissions
    Permission.EXECUTION_READ,

    // Framework permissions
    Permission.FRAMEWORK_READ,
    Permission.FRAMEWORK_EXECUTE,
  ],
  [UserRole.USER]: [
    // Limited permissions for personal use
    Permission.AGENT_READ,
    Permission.WORKFLOW_READ,
    Permission.EXECUTION_READ,
    Permission.FRAMEWORK_READ,
  ],
};
