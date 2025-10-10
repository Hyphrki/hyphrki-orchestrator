import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Workflows API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  let testUser: any;
  let testOrg: any;
  let testAgent: any;
  let testWorkflow: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    await prisma.$connect();
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clean database
    await prisma.workflowExecution.deleteMany();
    await prisma.workflow.deleteMany();
    await prisma.agent.deleteMany();
    await prisma.organizationMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();

    // Create test data
    testOrg = await prisma.organization.create({
      data: {
        name: faker.company.name(),
        slug: faker.lorem.slug(),
      },
    });

    testUser = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        passwordHash:
          '$2b$12$DdiscWTkyUlr0.vTVnSRYONyK.JOdK7fOIamn/t33c/Zx9sI28dT2', // 'password123'
        isActive: true,
        subscriptionTier: 'free',
      },
    });

    await prisma.organizationMember.create({
      data: {
        userId: testUser.id,
        organizationId: testOrg.id,
        role: 'owner',
      },
    });

    testAgent = await prisma.agent.create({
      data: {
        name: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        framework: 'langgraph',
        config: { temperature: 0.7 },
        organizationId: testOrg.id,
        createdById: testUser.id,
      },
    });

    testWorkflow = await prisma.workflow.create({
      data: {
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        framework: 'langgraph',
        config: {
          nodes: [],
          edges: [],
        },
        organizationId: testOrg.id,
        createdById: testUser.id,
      },
    });

    // Login to get access token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: 'password123',
      });

    accessToken = loginResponse.body.access_token;
  });

  describe('/workflows (GET)', () => {
    it('should get all workflows for organization', () => {
      return request(app.getHttpServer())
        .get('/workflows')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id', testWorkflow.id);
          expect(res.body[0]).toHaveProperty('name', testWorkflow.name);
          expect(res.body[0]).toHaveProperty(
            'framework',
            testWorkflow.framework,
          );
        });
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer()).get('/workflows').expect(401);
    });
  });

  describe('/workflows (POST)', () => {
    it('should create a new workflow', () => {
      const workflowData = {
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        framework: 'crewai',
        config: {
          nodes: [
            {
              id: '1',
              type: 'agent',
              position: { x: 100, y: 100 },
              data: { agentId: testAgent.id },
            },
          ],
          edges: [],
        },
      };

      return request(app.getHttpServer())
        .post('/workflows')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(workflowData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name', workflowData.name);
          expect(res.body).toHaveProperty('framework', workflowData.framework);
          expect(res.body).toHaveProperty('config');
          expect(res.body).toHaveProperty('organizationId', testOrg.id);
          expect(res.body).toHaveProperty('createdById', testUser.id);
        });
    });

    it('should validate required fields', () => {
      return request(app.getHttpServer())
        .post('/workflows')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Test Workflow' })
        .expect(400);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .post('/workflows')
        .send({ name: 'Test', framework: 'langgraph', config: {} })
        .expect(401);
    });
  });

  describe('/workflows/:id (GET)', () => {
    it('should get workflow by id', () => {
      return request(app.getHttpServer())
        .get(`/workflows/${testWorkflow.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', testWorkflow.id);
          expect(res.body).toHaveProperty('name', testWorkflow.name);
          expect(res.body).toHaveProperty('framework', testWorkflow.framework);
          expect(res.body).toHaveProperty('config');
        });
    });

    it('should return 404 for non-existent workflow', () => {
      return request(app.getHttpServer())
        .get('/workflows/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .get(`/workflows/${testWorkflow.id}`)
        .expect(401);
    });
  });

  describe('/workflows/:id (PUT)', () => {
    it('should update workflow', () => {
      const updateData = {
        name: 'Updated Workflow Name',
        description: 'Updated description',
        config: {
          nodes: [
            {
              id: '1',
              type: 'task',
              position: { x: 200, y: 200 },
              data: { taskType: 'analysis' },
            },
          ],
          edges: [],
        },
      };

      return request(app.getHttpServer())
        .put(`/workflows/${testWorkflow.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', testWorkflow.id);
          expect(res.body).toHaveProperty('name', updateData.name);
          expect(res.body).toHaveProperty(
            'description',
            updateData.description,
          );
        });
    });

    it('should return 404 for non-existent workflow', () => {
      return request(app.getHttpServer())
        .put('/workflows/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Updated' })
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .put(`/workflows/${testWorkflow.id}`)
        .send({ name: 'Updated' })
        .expect(401);
    });
  });

  describe('/workflows/:id (DELETE)', () => {
    it('should delete workflow', async () => {
      // First verify workflow exists
      await request(app.getHttpServer())
        .get(`/workflows/${testWorkflow.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      // Delete workflow
      await request(app.getHttpServer())
        .delete(`/workflows/${testWorkflow.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      // Verify workflow is deleted
      await request(app.getHttpServer())
        .get(`/workflows/${testWorkflow.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 404 for non-existent workflow', () => {
      return request(app.getHttpServer())
        .delete('/workflows/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .delete(`/workflows/${testWorkflow.id}`)
        .expect(401);
    });
  });

  describe('/workflows/:id/execute (POST)', () => {
    it('should execute workflow', () => {
      const executionData = {
        inputData: { message: 'Test execution' },
        executionOptions: {
          timeout: 30000,
        },
      };

      return request(app.getHttpServer())
        .post(`/workflows/${testWorkflow.id}/execute`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(executionData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('workflowId', testWorkflow.id);
          expect(res.body).toHaveProperty('status');
          expect(res.body).toHaveProperty('createdAt');
        });
    });

    it('should return 404 for non-existent workflow', () => {
      return request(app.getHttpServer())
        .post('/workflows/non-existent-id/execute')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ inputData: {} })
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .post(`/workflows/${testWorkflow.id}/execute`)
        .send({ inputData: {} })
        .expect(401);
    });
  });
});
