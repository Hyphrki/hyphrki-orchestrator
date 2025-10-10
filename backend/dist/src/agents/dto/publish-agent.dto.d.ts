import { PublicationStatus } from '@prisma/client';
export declare class PublishAgentDto {
    releaseNotes?: string;
    isBreakingUpdate?: boolean;
    targetStatus?: PublicationStatus;
}
