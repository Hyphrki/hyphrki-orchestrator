import { SetMetadata } from '@nestjs/common';
import { Permission, ResourceType } from './authorization.types';
import { AuthorizationGuard } from './authorization.guard';

/**
 * Decorator to set required permissions for a route or controller
 */
export const RequirePermissions = (...permissions: Permission[]) => {
  return SetMetadata('permissions', permissions);
};

/**
 * Decorator to set resource type for permission checking
 */
export const Resource = (resourceType: ResourceType) => {
  return SetMetadata('resourceType', resourceType);
};

/**
 * Decorator to require organization admin permissions
 */
export const RequireOrgAdmin = () => {
  return RequirePermissions(
    Permission.ORG_READ,
    Permission.ORG_UPDATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.AGENT_CREATE,
    Permission.AGENT_READ,
    Permission.AGENT_UPDATE,
    Permission.AGENT_DELETE,
    Permission.WORKFLOW_CREATE,
    Permission.WORKFLOW_READ,
    Permission.WORKFLOW_UPDATE,
    Permission.WORKFLOW_DELETE,
  );
};

/**
 * Decorator to require organization member permissions
 */
export const RequireOrgMember = () => {
  return RequirePermissions(
    Permission.AGENT_READ,
    Permission.AGENT_EXECUTE,
    Permission.WORKFLOW_CREATE,
    Permission.WORKFLOW_READ,
    Permission.WORKFLOW_UPDATE,
    Permission.WORKFLOW_EXECUTE,
    Permission.EXECUTION_READ,
  );
};

/**
 * Predefined permission combinations for common use cases
 */
export const PermissionGroups = {
  // Organization management
  ORGANIZATION_MANAGEMENT: [Permission.ORG_READ, Permission.ORG_UPDATE],

  // User management
  USER_MANAGEMENT: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
  ],

  // Agent management
  AGENT_MANAGEMENT: [
    Permission.AGENT_CREATE,
    Permission.AGENT_READ,
    Permission.AGENT_UPDATE,
    Permission.AGENT_DELETE,
  ],

  AGENT_EXECUTION: [Permission.AGENT_READ, Permission.AGENT_EXECUTE],

  // Workflow management
  WORKFLOW_MANAGEMENT: [
    Permission.WORKFLOW_CREATE,
    Permission.WORKFLOW_READ,
    Permission.WORKFLOW_UPDATE,
    Permission.WORKFLOW_DELETE,
  ],

  WORKFLOW_EXECUTION: [
    Permission.WORKFLOW_READ,
    Permission.WORKFLOW_EXECUTE,
    Permission.EXECUTION_READ,
  ],

  // Execution management
  EXECUTION_MANAGEMENT: [
    Permission.EXECUTION_READ,
    Permission.EXECUTION_CANCEL,
  ],

  // Framework access
  FRAMEWORK_ACCESS: [Permission.FRAMEWORK_READ, Permission.FRAMEWORK_EXECUTE],

  // Auth management
  AUTH_MANAGEMENT: [
    Permission.USER_READ, // logout is essentially user:read for self
  ],
};

export { AuthorizationGuard };
