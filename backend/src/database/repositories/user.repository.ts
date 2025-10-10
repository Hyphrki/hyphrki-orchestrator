import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<UserWithOrganizations | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<UserWithOrganizations | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<UserWithOrganizations> {
    return this.prisma.user.create({
      data,
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.prisma.user.count({ where });
  }

  // Organization-related methods
  async getUserOrganizations(userId: string): Promise<
    Array<{
      id: string;
      name: string;
      slug: string;
      role: string;
      joinedAt: Date;
    }>
  > {
    const user = await this.findById(userId);
    if (!user) {
      return [];
    }

    return user.organizationMembers.map((member: any) => ({
      id: member.organization.id,
      name: member.organization.name,
      slug: member.organization.slug,
      role: member.role,
      joinedAt: member.joinedAt,
    }));
  }

  async updateLastLogin(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }
}
