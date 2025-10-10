import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Agents API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  let testUser: any;
  let testOrg: any;
  let testAgent: any;

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
        config: {
          temperature: 0.7,
          model: 'gpt-4',
          systemPrompt: 'You are a helpful assistant.',
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

  describe('/agents (GET)', () => {
    it('should get all agents for organization', () => {
      return request(app.getHttpServer())
        .get('/agents')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id', testAgent.id);
          expect(res.body[0]).toHaveProperty('name', testAgent.name);
          expect(res.body[0]).toHaveProperty('framework', testAgent.framework);
          expect(res.body[0]).toHaveProperty('config');
        });
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer()).get('/agents').expect(401);
    });
  });

  describe('/agents (POST)', () => {
    it('should create a new agent', () => {
      const agentData = {
        name: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        framework: 'crewai',
        config: {
          role: 'analyst',
          goal: 'Analyze data and provide insights',
          backstory: 'You are an expert data analyst.',
          temperature: 0.3,
        },
      };

      return request(app.getHttpServer())
        .post('/agents')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(agentData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name', agentData.name);
          expect(res.body).toHaveProperty('framework', agentData.framework);
          expect(res.body).toHaveProperty('config');
          expect(res.body).toHaveProperty('organizationId', testOrg.id);
          expect(res.body).toHaveProperty('createdById', testUser.id);
          expect(res.body).toHaveProperty('status', 'inactive');
        });
    });

    it('should validate required fields', () => {
      return request(app.getHttpServer())
        .post('/agents')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Test Agent' })
        .expect(400);
    });

    it('should validate framework type', () => {
      const agentData = {
        name: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        framework: 'invalid-framework',
        config: {},
      };

      return request(app.getHttpServer())
        .post('/agents')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(agentData)
        .expect(400);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .post('/agents')
        .send({
          name: 'Test Agent',
          framework: 'langgraph',
          config: {},
        })
        .expect(401);
    });
  });

  describe('/agents/:id (GET)', () => {
    it('should get agent by id', () => {
      return request(app.getHttpServer())
        .get(`/agents/${testAgent.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', testAgent.id);
          expect(res.body).toHaveProperty('name', testAgent.name);
          expect(res.body).toHaveProperty('framework', testAgent.framework);
          expect(res.body).toHaveProperty('config');
          expect(res.body.config).toHaveProperty('temperature', 0.7);
        });
    });

    it('should return 404 for non-existent agent', () => {
      return request(app.getHttpServer())
        .get('/agents/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .get(`/agents/${testAgent.id}`)
        .expect(401);
    });
  });

  describe('/agents/:id (PUT)', () => {
    it('should update agent', () => {
      const updateData = {
        name: 'Updated Agent Name',
        description: 'Updated description',
        config: {
          temperature: 0.8,
          model: 'gpt-4-turbo',
          systemPrompt: 'You are an updated assistant.',
        },
      };

      return request(app.getHttpServer())
        .put(`/agents/${testAgent.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', testAgent.id);
          expect(res.body).toHaveProperty('name', updateData.name);
          expect(res.body).toHaveProperty(
            'description',
            updateData.description,
          );
          expect(res.body.config).toHaveProperty('temperature', 0.8);
        });
    });

    it('should return 404 for non-existent agent', () => {
      return request(app.getHttpServer())
        .put('/agents/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Updated' })
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .put(`/agents/${testAgent.id}`)
        .send({ name: 'Updated' })
        .expect(401);
    });
  });

  describe('/agents/:id/status (PUT)', () => {
    it('should update agent status', () => {
      return request(app.getHttpServer())
        .put(`/agents/${testAgent.id}/status`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ status: 'active' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', testAgent.id);
          expect(res.body).toHaveProperty('status', 'active');
        });
    });

    it('should validate status values', () => {
      return request(app.getHttpServer())
        .put(`/agents/${testAgent.id}/status`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ status: 'invalid-status' })
        .expect(400);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .put(`/agents/${testAgent.id}/status`)
        .send({ status: 'active' })
        .expect(401);
    });
  });

  describe('/agents/:id (DELETE)', () => {
    it('should delete agent', async () => {
      // First verify agent exists
      await request(app.getHttpServer())
        .get(`/agents/${testAgent.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      // Delete agent
      await request(app.getHttpServer())
        .delete(`/agents/${testAgent.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      // Verify agent is deleted
      await request(app.getHttpServer())
        .get(`/agents/${testAgent.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 404 for non-existent agent', () => {
      return request(app.getHttpServer())
        .delete('/agents/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .delete(`/agents/${testAgent.id}`)
        .expect(401);
    });
  });
});
