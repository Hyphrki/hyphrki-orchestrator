import { PrismaService } from '../prisma.service';
import { WorkflowExecution, Prisma } from '@prisma/client';
export declare class WorkflowExecutionRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<WorkflowExecution | null>;
    findByWorkflowId(workflowId: string): Promise<WorkflowExecution[]>;
    findByAgentId(agentId: string): Promise<WorkflowExecution[]>;
    findByCorrelationId(correlationId: string): Promise<WorkflowExecution[]>;
    create(data: Prisma.WorkflowExecutionCreateInput): Promise<WorkflowExecution>;
    update(id: string, data: Prisma.WorkflowExecutionUpdateInput): Promise<WorkflowExecution>;
    delete(id: string): Promise<WorkflowExecution>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.WorkflowExecutionWhereInput;
        orderBy?: Prisma.WorkflowExecutionOrderByWithRelationInput;
    }): Promise<WorkflowExecution[]>;
    count(where?: Prisma.WorkflowExecutionWhereInput): Promise<number>;
    updateStatus(id: string, status: string, statusMessage?: string, additionalData?: any): Promise<WorkflowExecution>;
    startExecution(id: string, executionData?: any): Promise<WorkflowExecution>;
    completeExecution(id: string, result: any, performanceMetrics?: any, resourceUsage?: any): Promise<WorkflowExecution>;
    failExecution(id: string, errorMessage: string, errorCode?: string, executionData?: any): Promise<WorkflowExecution>;
    pauseExecution(id: string): Promise<WorkflowExecution>;
    resumeExecution(id: string): Promise<WorkflowExecution>;
    cancelExecution(id: string): Promise<WorkflowExecution>;
    retryExecution(id: string): Promise<WorkflowExecution>;
    getExecutionStats(workflowId?: string, agentId?: string): Promise<{
        total: number;
        completed: number;
        failed: number;
        running: number;
        queued: number;
        avgExecutionTime: number;
        successRate: number;
    }>;
}
