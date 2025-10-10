import { DeploymentsService } from './deployments.service';
import { CreateDeploymentDto, ExecuteDeploymentDto } from './dto/create-deployment.dto';
import { DeploymentStatus } from '@prisma/client';
export declare class DeploymentsController {
    private readonly deploymentsService;
    constructor(deploymentsService: DeploymentsService);
    createDeployment(userId: string, createDeploymentDto: CreateDeploymentDto): Promise<{
        agentTemplate: {
            id: string;
            name: string;
            description: string;
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
    }>;
    listDeployments(userId: string, status?: DeploymentStatus): Promise<({
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        agentTemplate: {
            id: string;
            name: string;
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
    getDeployment(id: string): Promise<{
        executions: {
            id: string;
            createdAt: Date;
            userId: string;
            status: import("@prisma/client").$Enums.ExecutionStatus;
            n8nExecutionId: string;
            startedAt: Date;
            stoppedAt: Date | null;
            inputParameters: import("@prisma/client/runtime/library").JsonValue;
            executionOutput: import("@prisma/client/runtime/library").JsonValue | null;
            rawOutput: import("@prisma/client/runtime/library").JsonValue | null;
            errorMessage: string | null;
            failedNodeId: string | null;
            retryCount: number;
            deploymentId: string;
        }[];
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        agentTemplate: {
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
    }>;
    executeDeployment(deploymentId: string, userId: string, executeDto: ExecuteDeploymentDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.ExecutionStatus;
        n8nExecutionId: string;
        startedAt: Date;
        stoppedAt: Date | null;
        inputParameters: import("@prisma/client/runtime/library").JsonValue;
        executionOutput: import("@prisma/client/runtime/library").JsonValue | null;
        rawOutput: import("@prisma/client/runtime/library").JsonValue | null;
        errorMessage: string | null;
        failedNodeId: string | null;
        retryCount: number;
        deploymentId: string;
    }>;
    deleteDeployment(id: string): Promise<{
        message: string;
    }>;
    getDeploymentExecutions(deploymentId: string): Promise<({
        deployment: {
            agentTemplate: {
                id: string;
                name: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.ExecutionStatus;
        n8nExecutionId: string;
        startedAt: Date;
        stoppedAt: Date | null;
        inputParameters: import("@prisma/client/runtime/library").JsonValue;
        executionOutput: import("@prisma/client/runtime/library").JsonValue | null;
        rawOutput: import("@prisma/client/runtime/library").JsonValue | null;
        errorMessage: string | null;
        failedNodeId: string | null;
        retryCount: number;
        deploymentId: string;
    })[]>;
}
export declare class ExecutionsController {
    private readonly deploymentsService;
    constructor(deploymentsService: DeploymentsService);
    listExecutions(userId: string, deploymentId?: string): Promise<({
        deployment: {
            agentTemplate: {
                id: string;
                name: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.ExecutionStatus;
        n8nExecutionId: string;
        startedAt: Date;
        stoppedAt: Date | null;
        inputParameters: import("@prisma/client/runtime/library").JsonValue;
        executionOutput: import("@prisma/client/runtime/library").JsonValue | null;
        rawOutput: import("@prisma/client/runtime/library").JsonValue | null;
        errorMessage: string | null;
        failedNodeId: string | null;
        retryCount: number;
        deploymentId: string;
    })[]>;
    getExecution(id: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        deployment: {
            agentTemplate: {
                id: string;
                name: string;
                description: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.ExecutionStatus;
        n8nExecutionId: string;
        startedAt: Date;
        stoppedAt: Date | null;
        inputParameters: import("@prisma/client/runtime/library").JsonValue;
        executionOutput: import("@prisma/client/runtime/library").JsonValue | null;
        rawOutput: import("@prisma/client/runtime/library").JsonValue | null;
        errorMessage: string | null;
        failedNodeId: string | null;
        retryCount: number;
        deploymentId: string;
    }>;
}
