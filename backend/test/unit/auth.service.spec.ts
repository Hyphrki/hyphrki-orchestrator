import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../../src/database/prisma.service';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockUser = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    organizations: [],
    subscriptionTier: 'free',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            organization: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate user credentials successfully', async () => {
      // Arrange
      const email = mockUser.email;
      const password = 'ValidPass123!';

      const mockDbUser = {
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        passwordHash: 'hashed-password',
        isActive: true,
        subscriptionTier: 'free',
        lastLoginAt: null,
        organizationMembers: [],
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(mockDbUser);
      jest.spyOn(service, 'verifyPassword').mockResolvedValue(true);

      // Act
      const result = await service.validateUser(email, password);

      // Assert
      expect(result).toBeDefined();
      expect(result?.id).toBe(mockUser.id);
      expect(result?.email).toBe(mockUser.email);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: {
          organizationMembers: {
            include: {
              organization: true,
            },
          },
        },
      });
    });

    it('should return null for invalid credentials', async () => {
      // Arrange
      const email = mockUser.email;
      const password = 'wrong-password';

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      // Act
      const result = await service.validateUser(email, password);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null for inactive user', async () => {
      // Arrange
      const email = mockUser.email;
      const password = 'ValidPass123!';

      const mockDbUser = {
        id: mockUser.id,
        email: mockUser.email,
        passwordHash: 'hashed-password',
        isActive: false,
        organizationMembers: [],
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(mockDbUser);
      jest.spyOn(service, 'verifyPassword').mockResolvedValue(true);

      // Act
      const result = await service.validateUser(email, password);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('should hash password', async () => {
      const hashed = await service.hashPassword('password123');
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');
      expect(hashed).not.toBe('password123');
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const password = 'password123';
      const hash = await service.hashPassword(password);

      const result = await service.verifyPassword(password, hash);
      expect(result).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'password123';
      const hash = await service.hashPassword(password);

      const result = await service.verifyPassword('wrongpassword', hash);
      expect(result).toBe(false);
    });
  });

  describe('generateAccessToken', () => {
    it('should generate access token', () => {
      const payload = { sub: mockUser.id, email: mockUser.email };

      jest.spyOn(jwtService, 'sign').mockReturnValue('mock-access-token');

      const token = service.generateAccessToken(payload);
      expect(token).toBe('mock-access-token');
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
    });
  });

  describe('generateTokens', () => {
    it('should generate both access and refresh tokens', async () => {
      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token');

      const tokens = await service.generateTokens(mockUser);

      expect(tokens).toEqual({
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
      });
    });
  });
});
