import { OrganizationsService } from '../services/organizations.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
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
    getOrganization(userId: string, organizationId: string): Promise<{
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
