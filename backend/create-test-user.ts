import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        subscriptionTier: 'basic',
        isActive: true,
        emailVerified: true,
      },
    });

    console.log('Test user created:', user);

    // Create test organization
    const organization = await prisma.organization.create({
      data: {
        name: 'Test Organization',
        slug: 'test-org',
        subscriptionTier: 'basic',
        isActive: true,
      },
    });

    console.log('Test organization created:', organization);

    // Create organization membership
    const membership = await prisma.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
        role: 'admin',
      },
    });

    console.log('Test membership created:', membership);

  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
