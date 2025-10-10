import { PrismaService } from '../prisma.service';
import { Workflow, Prisma } from '@prisma/client';
export declare class WorkflowRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Workflow | null>;
    findByAgentId(agentId: string): Promise<Workflow[]>;
    create(data: Prisma.WorkflowCreateInput): Promise<Workflow>;
    update(id: string, data: Prisma.WorkflowUpdateInput): Promise<Workflow>;
    delete(id: string): Promise<Workflow>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.WorkflowWhereInput;
        orderBy?: Prisma.WorkflowOrderByWithRelationInput;
    }): Promise<Workflow[]>;
    count(where?: Prisma.WorkflowWhereInput): Promise<number>;
    createVersion(workflowId: string, workflowData: any, version?: string): Promise<Workflow>;
    getVersions(agentId: string): Promise<Workflow[]>;
    setActiveVersion(workflowId: string): Promise<void>;
    getActiveWorkflow(agentId: string): Promise<Workflow | null>;
    findLatestByAgentId(agentId: string): Promise<Workflow | null>;
    private generateVersion;
}
