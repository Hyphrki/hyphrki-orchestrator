import { UserRepository } from '../../database/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SyncService } from '../../websocket/sync.service';
import { PrismaService } from '../../database/prisma.service';
export interface UserFilters {
    search?: string;
    role?: string;
    status?: string;
    subscriptionTier?: string;
    page?: number;
    limit?: number;
}
export interface UserListResponse {
    users: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface UserActivity {
    id: string;
    userId: string;
    action: string;
    timestamp: Date;
    metadata: any;
}
export declare class UsersService {
    private readonly userRepository;
    private readonly syncService;
    private readonly prisma;
    constructor(userRepository: UserRepository, syncService: SyncService, prisma: PrismaService);
    getCurrentUser(userId: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        subscription_tier: string;
        created_at: Date;
        last_login_at: Date | null;
        email_verified: boolean;
    }>;
    updateCurrentUser(userId: string, updateData: UpdateUserDto): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        subscription_tier: string;
        updated_at: Date;
    }>;
    listAllUsers(filters: UserFilters): Promise<UserListResponse>;
    getUserById(id: string): Promise<{
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
    updateUser(id: string, updateData: any): Promise<{
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
    updateUserRole(id: string, role: string): Promise<{
        id: string;
        email: string;
        role: string;
    }>;
    assignPersonalizedWorkflow(userId: string, workflowId: string): Promise<{
        workflow_id: string;
        workflow_name: string;
        assigned_to_user: string;
    }>;
    getUserAssignedWorkflows(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }[]>;
    logUserActivity(userId: string, action: string, metadata: any): Promise<void>;
}
