import { Permission, ResourceType } from './authorization.types';
import { AuthorizationGuard } from './authorization.guard';
export declare const RequirePermissions: (...permissions: Permission[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const Resource: (resourceType: ResourceType) => import("@nestjs/common").CustomDecorator<string>;
export declare const RequireOrgAdmin: () => import("@nestjs/common").CustomDecorator<string>;
export declare const RequireOrgMember: () => import("@nestjs/common").CustomDecorator<string>;
export declare const PermissionGroups: {
    ORGANIZATION_MANAGEMENT: Permission[];
    USER_MANAGEMENT: Permission[];
    AGENT_MANAGEMENT: Permission[];
    AGENT_EXECUTION: Permission[];
    WORKFLOW_MANAGEMENT: Permission[];
    WORKFLOW_EXECUTION: Permission[];
    EXECUTION_MANAGEMENT: Permission[];
    FRAMEWORK_ACCESS: Permission[];
    AUTH_MANAGEMENT: Permission[];
};
export { AuthorizationGuard };
