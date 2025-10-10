import { PricingTier } from '@prisma/client';
export declare class CreateAgentDto {
    name: string;
    description: string;
    category: string;
    tags?: string[];
    n8nWorkflowId?: string;
    n8nWorkflowJson: Record<string, any>;
    version: string;
    pricingTier?: PricingTier;
    createdById: string;
}
