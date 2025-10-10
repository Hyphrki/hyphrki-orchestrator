import { PrismaService } from '../prisma.service';
import { Agent, Prisma } from '@prisma/client';
export declare class AgentRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Agent | null>;
    findByOwner(ownerType: string, ownerId: string): Promise<Agent[]>;
    create(data: Prisma.AgentCreateInput): Promise<Agent>;
    update(id: string, data: Prisma.AgentUpdateInput): Promise<Agent>;
    delete(id: string): Promise<Agent>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.AgentWhereInput;
        orderBy?: Prisma.AgentOrderByWithRelationInput;
    }): Promise<Agent[]>;
    count(where?: Prisma.AgentWhereInput): Promise<number>;
    findByFramework(framework: string): Promise<Agent[]>;
    updateStatus(id: string, status: string, metadata?: any): Promise<Agent>;
    updateContainerInfo(id: string, containerId: string, resourceLimits?: any): Promise<Agent>;
    getAgentStats(agentId: string): Promise<{
        totalExecutions: number;
        successfulExecutions: number;
        failedExecutions: number;
        avgExecutionTime: number;
    }>;
}
