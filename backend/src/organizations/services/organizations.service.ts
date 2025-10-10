import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { PrismaService } from '../../database/prisma.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserOrganizations(userId: string) {
    const organizations =
      await this.userRepository.getUserOrganizations(userId);

    return {
      organizations: organizations.map((org) => ({
        id: org.id,
        name: org.name,
        slug: org.slug,
        subscription_tier: 'basic', // Default for now since not included in simplified type
        role: org.role,
        created_at: org.joinedAt,
      })),
    };
  }

  async createOrganization(userId: string, createData: CreateOrganizationDto) {
    // Check if slug is already taken
    const existingOrg = await this.prisma.organization.findUnique({
      where: { slug: createData.slug },
    });

    if (existingOrg) {
      throw new ConflictException('Organization slug already exists');
    }

    // Create organization and add user as owner
    const organization = await this.prisma.organization.create({
      data: {
        name: createData.name,
        slug: createData.slug,
        subscriptionTier: createData.subscription_tier || 'basic',
      },
    });

    await this.prisma.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: userId,
        role: 'owner',
      },
    });

    return {
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      subscription_tier: organization.subscriptionTier,
      created_at: organization.createdAt,
    };
  }

  async getOrganizationById(userId: string, organizationId: string) {
    // Check if user is a member of the organization
    const membership = await this.prisma.organizationMember.findFirst({
      where: {
        organizationId: organizationId,
        userId: userId,
      },
      include: {
        organization: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!membership) {
      throw new NotFoundException('Organization not found or access denied');
    }

    const org = membership.organization;
    return {
      id: org.id,
      name: org.name,
      slug: org.slug,
      subscription_tier: org.subscriptionTier,
      members: org.members.map((member: any) => ({
        id: member.user.id,
        email: member.user.email,
        first_name: member.user.firstName,
        last_name: member.user.lastName,
        role: member.role,
        joined_at: member.joinedAt,
      })),
      created_at: org.createdAt,
    };
  }
}
