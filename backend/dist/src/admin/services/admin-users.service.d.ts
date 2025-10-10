import { PrismaService } from '../../database/prisma.service';
export declare class AdminUsersService {
    private prisma;
    constructor(prisma: PrismaService);
    listUsers(filters: {
        search?: string;
        role?: string;
        status?: string;
        subscriptionTier?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        users: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            subscription_tier: string;
            role: string;
            status: string;
            created_at: string;
            last_login_at: string | undefined;
            email_verified: boolean;
            suspended_at: string | undefined;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserDetail(id: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        subscription_tier: string;
        role: string;
        status: string;
        created_at: string;
        last_login_at: string | undefined;
        email_verified: boolean;
        suspended_at: string | undefined;
        assigned_workflows: {
            id: string;
            name: string;
            description: string | null;
            created_at: string;
        }[];
        recent_activities: {
            id: string;
            action: string;
            timestamp: string;
            metadata: import("@prisma/client/runtime/library").JsonValue;
        }[];
        assigned_agents: {
            id: string;
            agent: {
                id: string;
                name: string;
                category: string;
                publicationStatus: import("@prisma/client").$Enums.PublicationStatus;
            };
            assigned_at: string;
            custom_config: import("@prisma/client/runtime/library").JsonValue;
        }[];
        deployments: {
            id: string;
            agent: {
                id: string;
                name: string;
                category: string;
            };
            deployment_name: string;
            status: import("@prisma/client").$Enums.DeploymentStatus;
            created_at: string;
            total_executions: number;
            last_execution_at: string | undefined;
        }[];
    }>;
    updateUser(id: string, updateData: {
        firstName?: string;
        lastName?: string;
        subscriptionTier?: string;
        role?: string;
    }): Promise<{
        id: any;
        email: any;
        first_name: any;
        last_name: any;
        subscription_tier: any;
        role: any;
        status: string;
        created_at: any;
        last_login_at: any;
        email_verified: any;
        suspended_at: any;
    }>;
    suspendUser(id: string): Promise<{
        id: any;
        email: any;
        first_name: any;
        last_name: any;
        subscription_tier: any;
        role: any;
        status: string;
        created_at: any;
        last_login_at: any;
        email_verified: any;
        suspended_at: any;
    }>;
    activateUser(id: string): Promise<{
        id: any;
        email: any;
        first_name: any;
        last_name: any;
        subscription_tier: any;
        role: any;
        status: string;
        created_at: any;
        last_login_at: any;
        email_verified: any;
        suspended_at: any;
    }>;
    updateUserRole(id: string, role: string): Promise<{
        id: any;
        email: any;
        first_name: any;
        last_name: any;
        subscription_tier: any;
        role: any;
        status: string;
        created_at: any;
        last_login_at: any;
        email_verified: any;
        suspended_at: any;
    }>;
    assignWorkflow(userId: string, workflowId: string): Promise<{
        success: boolean;
        workflow: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            name: string;
            description: string | null;
            framework: string;
            version: string;
            workflowData: import("@prisma/client/runtime/library").JsonValue;
            workflowType: string;
            agentId: string;
            assignedToUserId: string | null;
        };
    }>;
    getUserWorkflows(userId: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        framework: string;
        version: string;
        workflowType: string;
    }[]>;
    getUserAssignedAgents(userId: string): Promise<({
        agentTemplate: {
            id: string;
            name: string;
            description: string;
            version: string;
            category: string;
            tags: string[];
            publicationStatus: import("@prisma/client").$Enums.PublicationStatus;
        };
    } & {
        id: string;
        userId: string;
        agentTemplateId: string;
        customConfig: import("@prisma/client/runtime/library").JsonValue | null;
        assignedAt: Date;
    })[]>;
    getUserDeployments(userId: string): Promise<({
        executions: {
            id: string;
            status: import("@prisma/client").$Enums.ExecutionStatus;
            startedAt: Date;
            stoppedAt: Date | null;
        }[];
        agentTemplate: {
            id: string;
            name: string;
            version: string;
            category: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        deploymentName: string;
        parameterValues: import("@prisma/client/runtime/library").JsonValue;
        deploymentStatus: import("@prisma/client").$Enums.DeploymentStatus;
        deprecatedAt: Date | null;
        archivedAt: Date | null;
        lastExecutionAt: Date | null;
        totalExecutions: number;
        agentTemplateVersion: string;
        agentTemplateId: string;
    })[]>;
    private formatUser;
}
