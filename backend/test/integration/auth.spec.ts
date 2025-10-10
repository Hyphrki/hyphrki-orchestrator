import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Auth API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testUser: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    // Enable shutdown hooks
    await prisma.$connect();
    await app.init();

    // Clean database
    await prisma.workflowExecution.deleteMany();
    await prisma.workflow.deleteMany();
    await prisma.agent.deleteMany();
    await prisma.organizationMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Create test user
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
  });

  afterEach(async () => {
    // Clean up test data
    await prisma.workflowExecution.deleteMany();
    await prisma.workflow.deleteMany();
    await prisma.agent.deleteMany();
    await prisma.organizationMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('/auth/login (POST)', () => {
    it('should login successfully with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'password123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
          expect(res.body).toHaveProperty('expires_in');
          expect(res.body).toHaveProperty('token_type', 'Bearer');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.id).toBe(testUser.id);
          expect(res.body.user.email).toBe(testUser.email);
        });
    });

    it('should return error for invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
          expect(res.body.error.message).toBe('Invalid credentials');
        });
    });

    it('should return error for non-existent user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
          expect(res.body.error.message).toBe('Invalid credentials');
        });
    });

    it('should return error for inactive user', async () => {
      // Deactivate user
      await prisma.user.update({
        where: { id: testUser.id },
        data: { isActive: false },
      });

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'password123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
          expect(res.body.error.message).toBe('Invalid credentials');
        });
    });
  });

  describe('/auth/refresh (POST)', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Login to get tokens
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'password123',
        });

      refreshToken = loginResponse.body.refresh_token;
    });

    it('should refresh tokens successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refresh_token: refreshToken,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('expires_in');
          expect(res.body).toHaveProperty('token_type', 'Bearer');
        });
    });

    it('should return error for invalid refresh token', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refresh_token: 'invalid-token',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
          expect(res.body.error.message).toBe('Invalid refresh token');
        });
    });
  });

  describe('/auth/logout (POST)', () => {
    let accessToken: string;

    beforeEach(async () => {
      // Login to get access token
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'password123',
        });

      accessToken = loginResponse.body.access_token;
    });

    it('should logout successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message', 'Successfully logged out');
        });
    });

    it('should require authentication', () => {
      return request(app.getHttpServer()).post('/auth/logout').expect(401);
    });
  });
});
