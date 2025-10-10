import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Users API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  let testUser: any;

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

    // Create test organization and user
    const testOrg = await prisma.organization.create({
      data: {
        name: faker.company.name(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence(),
        ownerId: 'temp-id', // Will be updated
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

    // Update organization owner
    await prisma.organization.update({
      where: { id: testOrg.id },
      data: { ownerId: testUser.id },
    });

    // Create organization membership
    await prisma.organizationMember.create({
      data: {
        userId: testUser.id,
        organizationId: testOrg.id,
        role: 'owner',
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

  describe('/users/profile (GET)', () => {
    it('should get user profile', () => {
      return request(app.getHttpServer())
        .get('/users/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', testUser.id);
          expect(res.body).toHaveProperty('email', testUser.email);
          expect(res.body).toHaveProperty('firstName', testUser.firstName);
          expect(res.body).toHaveProperty('lastName', testUser.lastName);
          expect(res.body).toHaveProperty(
            'subscriptionTier',
            testUser.subscriptionTier,
          );
          expect(res.body).toHaveProperty('organizations');
          expect(Array.isArray(res.body.organizations)).toBe(true);
        });
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer()).get('/users/profile').expect(401);
    });
  });

  describe('/users/profile (PUT)', () => {
    it('should update user profile', () => {
      const updateData = {
        firstName: 'Updated',
        lastName: 'Name',
      };

      return request(app.getHttpServer())
        .put('/users/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('firstName', updateData.firstName);
          expect(res.body).toHaveProperty('lastName', updateData.lastName);
          expect(res.body).toHaveProperty('email', testUser.email);
        });
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .put('/users/profile')
        .send({ firstName: 'Test' })
        .expect(401);
    });

    it('should validate input data', () => {
      return request(app.getHttpServer())
        .put('/users/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: 'invalid-email' })
        .expect(400);
    });
  });

  describe('/users (GET)', () => {
    it('should get all users for organization', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('email');
        });
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer()).get('/users').expect(401);
    });
  });

  describe('/users/:id (GET)', () => {
    it('should get user by id', () => {
      return request(app.getHttpServer())
        .get(`/users/${testUser.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', testUser.id);
          expect(res.body).toHaveProperty('email', testUser.email);
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/users/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer())
        .get(`/users/${testUser.id}`)
        .expect(401);
    });
  });
});
