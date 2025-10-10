import { PrismaService } from '../../database/prisma.service';
export declare class AdminDeploymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    listDeployments(filters: {
        userId?: string;
        agentTemplateId?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        deployments: {
            id: string;
            deployment_name: string;
            status: import("@prisma/client").$Enums.DeploymentStatus;
            created_at: string;
            total_executions: number;
            last_execution_at: string | undefined;
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
            agent: {
                id: string;
                name: string;
                version: string;
                category: string;
            };
            latest_execution: {
                id: string;
                status: import("@prisma/client").$Enums.ExecutionStatus;
                startedAt: Date;
            };
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getDeploymentDetail(id: string): Promise<{
        id: string;
        deployment_name: string;
        status: import("@prisma/client").$Enums.DeploymentStatus;
        created_at: string;
        total_executions: number;
        last_execution_at: string | undefined;
        parameter_values: import("@prisma/client/runtime/library").JsonValue;
        agent_template_version: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        agent: {
            parameters: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                agentTemplateId: string;
                parameterName: string;
                parameterPath: string;
                fieldType: import("@prisma/client").$Enums.FieldType;
                displayLabel: string;
                helpText: string | null;
                defaultValue: string | null;
                isRequired: boolean;
                isSensitive: boolean;
                validationRules: import("@prisma/client/runtime/library").JsonValue | null;
                selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
                order: number;
            }[];
            outputConfig: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                agentTemplateId: string;
                outputSource: import("@prisma/client").$Enums.OutputSource;
                displayFormat: import("@prisma/client").$Enums.DisplayFormat;
                nodeIds: string[];
                fieldMappings: import("@prisma/client/runtime/library").JsonValue | null;
                filterRules: import("@prisma/client/runtime/library").JsonValue | null;
                customTemplate: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            version: string;
            category: string;
            tags: string[];
            n8nWorkflowId: string | null;
            n8nWorkflowJson: import("@prisma/client/runtime/library").JsonValue;
            publicationStatus: import("@prisma/client").$Enums.PublicationStatus;
            pricingTier: import("@prisma/client").$Enums.PricingTier;
            publishedAt: Date | null;
            unpublishedAt: Date | null;
            createdById: string;
        };
        recent_executions: {
            id: string;
            status: import("@prisma/client").$Enums.ExecutionStatus;
            started_at: string;
            stopped_at: string | undefined;
            error_message: string | null;
        }[];
    }>;
    getDeploymentExecutions(deploymentId: string, page?: number, limit?: number): Promise<{
        executions: {
            id: string;
            n8n_execution_id: string;
            status: import("@prisma/client").$Enums.ExecutionStatus;
            started_at: string;
            stopped_at: string | undefined;
            input_parameters: import("@prisma/client/runtime/library").JsonValue;
            execution_output: import("@prisma/client/runtime/library").JsonValue;
            error_message: string | null;
            retry_count: number;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    executeDeployment(deploymentId: string, inputParameters: Record<string, any>): Promise<{
        execution_id: string;
        status: import("@prisma/client").$Enums.ExecutionStatus;
        message: string;
    }>;
}
