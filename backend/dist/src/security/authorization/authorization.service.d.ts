import { PrismaService } from '../../database/prisma.service';
import { UserRole, Permission, ResourceType, AuthorizationResult } from './authorization.types';
export declare class AuthorizationService {
    private prisma;
    constructor(prisma: PrismaService);
    checkPermission(userId: string, permission: Permission, resourceType?: ResourceType, resourceId?: string): Promise<AuthorizationResult>;
    getUserPermissions(userId: string): Promise<Permission[]>;
    getUserRoles(userId: string): Promise<UserRole[]>;
    private hasPermission;
    private checkResourceAccess;
    private checkOrganizationAccess;
    private checkUserAccess;
    private checkAgentAccess;
    private checkWorkflowAccess;
    private checkExecutionAccess;
    createGuard(permission: Permission, resourceType?: ResourceType): (userId: string, resourceId?: string) => Promise<boolean>;
    validateRoleHierarchy(userRole: UserRole, requiredRole: UserRole): boolean;
    getRoleCapabilities(role: UserRole): {
        role: UserRole;
        permissions: Permission[];
        hierarchy: UserRole[];
    };
}
