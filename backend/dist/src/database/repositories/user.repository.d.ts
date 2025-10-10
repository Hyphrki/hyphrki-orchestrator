import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
type UserWithOrganizations = User & {
    organizationMembers: Array<{
        id: string;
        role: string;
        joinedAt: Date;
        organization: {
            id: string;
            name: string;
            slug: string;
            subscriptionTier: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
        };
    }>;
};
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<UserWithOrganizations | null>;
    findByEmail(email: string): Promise<UserWithOrganizations | null>;
    create(data: Prisma.UserCreateInput): Promise<UserWithOrganizations>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    delete(id: string): Promise<User>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]>;
    count(where?: Prisma.UserWhereInput): Promise<number>;
    getUserOrganizations(userId: string): Promise<Array<{
        id: string;
        name: string;
        slug: string;
        role: string;
        joinedAt: Date;
    }>>;
    updateLastLogin(id: string): Promise<User>;
}
export {};
