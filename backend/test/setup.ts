import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/database/prisma.service';

// Global test setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
});

// Clean up after each test
afterEach(async () => {
  // Clear any global state if needed
});

// Global test utilities
global.testUtils = {
  createTestingModule: async (imports: any[] = []): Promise<TestingModule> => {
    return Test.createTestingModule({
      imports,
    }).compile();
  },

  createTestApp: async (module: TestingModule): Promise<INestApplication> => {
    const app = module.createNestApplication();
    await app.init();
    return app;
  },

  getPrismaService: async (module: TestingModule): Promise<PrismaService> => {
    const prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.enableShutdownHooks();
    return prismaService;
  },

  clearDatabase: async (prisma: PrismaService): Promise<void> => {
    // Clear all data in reverse order of dependencies
    const tables = [
      'WorkflowExecution',
      'Workflow',
      'Agent',
      'Organization',
      'User',
    ];

    for (const table of tables) {
      await prisma.$executeRawUnsafe(`DELETE FROM "${table}";`);
    }

    // Reset sequences
    await prisma.$executeRawUnsafe(`SELECT setval('"User_id_seq"', 1, false);`);
    await prisma.$executeRawUnsafe(
      `SELECT setval('"Organization_id_seq"', 1, false);`,
    );
    await prisma.$executeRawUnsafe(
      `SELECT setval('"Agent_id_seq"', 1, false);`,
    );
    await prisma.$executeRawUnsafe(
      `SELECT setval('"Workflow_id_seq"', 1, false);`,
    );
    await prisma.$executeRawUnsafe(
      `SELECT setval('"WorkflowExecution_id_seq"', 1, false);`,
    );
  },

  createMockUser: () => ({
    id: 'test-user-id',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    organizationId: 'test-org-id',
    roles: ['user'],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),

  createMockOrganization: () => ({
    id: 'test-org-id',
    name: 'Test Organization',
    description: 'Test organization description',
    ownerId: 'test-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
};
