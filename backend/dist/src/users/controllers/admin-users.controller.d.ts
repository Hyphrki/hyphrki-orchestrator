import { UsersService } from '../services/users.service';
import type { UserFilters } from '../services/users.service';
export declare class UpdateUserDto {
    first_name?: string;
    last_name?: string;
    subscription_tier?: string;
    role?: string;
}
export declare class AssignWorkflowDto {
    workflowId: string;
}
export declare class UpdateRoleDto {
    role: string;
}
export declare class AdminUsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    listUsers(filters: UserFilters): Promise<import("../services/users.service").UserListResponse>;
    getUser(id: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        subscription_tier: string;
        created_at: Date;
        last_login_at: Date | null;
        email_verified: boolean;
        suspended_at: Date | null;
        role: string;
        status: string;
        assigned_workflows: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
        }[];
        recent_activities: {
            id: string;
            userId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            action: string;
            timestamp: Date;
        }[];
    }>;
    updateUser(id: string, updateData: UpdateUserDto): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        subscription_tier: string;
        role: string;
        updated_at: Date;
    }>;
    suspendUser(id: string): Promise<{
        id: string;
        email: string;
        suspended_at: Date | null;
    }>;
    activateUser(id: string): Promise<{
        id: string;
        email: string;
        suspended_at: null;
    }>;
    updateRole(id: string, roleData: UpdateRoleDto): Promise<{
        id: string;
        email: string;
        role: string;
    }>;
    assignWorkflow(userId: string, workflowData: AssignWorkflowDto): Promise<{
        workflow_id: string;
        workflow_name: string;
        assigned_to_user: string;
    }>;
    getUserWorkflows(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }[]>;
}
