import { UserRepository } from '../../database/repositories/user.repository';
import { PrismaService } from '../../database/prisma.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
export declare class OrganizationsService {
    private readonly prisma;
    private readonly userRepository;
    constructor(prisma: PrismaService, userRepository: UserRepository);
    getUserOrganizations(userId: string): Promise<{
        organizations: {
            id: string;
            name: string;
            slug: string;
            subscription_tier: string;
            role: string;
            created_at: Date;
        }[];
    }>;
    createOrganization(userId: string, createData: CreateOrganizationDto): Promise<{
        id: string;
        name: string;
        slug: string;
        subscription_tier: string;
        created_at: Date;
    }>;
    getOrganizationById(userId: string, organizationId: string): Promise<{
        id: string;
        name: string;
        slug: string;
        subscription_tier: string;
        members: {
            id: any;
            email: any;
            first_name: any;
            last_name: any;
            role: any;
            joined_at: any;
        }[];
        created_at: Date;
    }>;
}
