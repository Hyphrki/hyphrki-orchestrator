import { AgentsService } from '../services/agents.service';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { PublishAgentDto } from '../dto/publish-agent.dto';
import { PublicationStatus } from '@prisma/client';
export declare class AgentsController {
    private readonly agentsService;
    constructor(agentsService: AgentsService);
    createAgent(createAgentDto: CreateAgentDto): Promise<{
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
        createdBy: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
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
    }>;
    listAgents(status?: PublicationStatus, category?: string, createdById?: string): Promise<({
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
        createdBy: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
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
    })[]>;
    getAgent(id: string): Promise<{
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
        createdBy: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
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
    }>;
    updateAgent(id: string, updateData: Partial<CreateAgentDto>): Promise<{
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
        createdBy: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
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
    }>;
    deleteAgent(id: string): Promise<{
        message: string;
    }>;
    publishAgent(id: string, publishDto: PublishAgentDto): Promise<{
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
        createdBy: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
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
    }>;
    unpublishAgent(id: string): Promise<{
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
        createdBy: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
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
    }>;
    assignAgentToUser(agentId: string, userId: string, customConfig?: any): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        agentTemplate: {
            id: string;
            name: string;
            description: string;
        };
    } & {
        id: string;
        userId: string;
        agentTemplateId: string;
        customConfig: import("@prisma/client/runtime/library").JsonValue | null;
        assignedAt: Date;
    }>;
    getUserAssignedAgents(userId: string): Promise<{
        id: string;
        assignedAt: Date;
        customConfig: import("@prisma/client/runtime/library").JsonValue;
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
            createdBy: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
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
    }[]>;
    removeAgentAssignment(assignmentId: string): Promise<{
        success: boolean;
    }>;
    getAgentAnalytics(agentId: string, timeRange?: string): Promise<{
        agentId: string;
        agentName: string;
        timeRange: string;
        summary: {
            totalDeployments: number;
            activeDeployments: number;
            totalAssignments: number;
            totalExecutions: number;
            completedExecutions: number;
            failedExecutions: number;
            successRate: number;
            avgExecutionTime: number;
            uniqueUsers: number;
        };
        trends: {
            executionTrends: {
                date: string;
                executions: number;
                completed: number;
                failed: number;
            }[];
            topUsers: {
                userId: string;
                executionCount: number;
            }[];
        };
    }>;
    getAgentsWithAnalytics(): Promise<{
        analytics: {
            totalDeployments: number;
            activeDeployments: number;
            totalAssignments: number;
            recentExecutions: number;
        };
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
        createdBy: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
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
    }[]>;
}
