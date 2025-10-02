const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken, requireAdmin, verifyApiKey, verifyHmacSignature } = require('../src/middleware/auth');

// Mock database
const mockPool = {
  query: jest.fn()
};

// Mock JWT secret
process.env.JWT_SECRET = 'test-secret';

describe('Authentication Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      body: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('verifyToken', () => {
    it('should verify valid JWT token', async () => {
      const token = jwt.sign(
        { userId: 'user-123', email: 'test@example.com' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      req.headers.authorization = `Bearer ${token}`;

      await verifyToken(req, res, next);

      expect(req.user).toBeDefined();
      expect(req.user.userId).toBe('user-123');
      expect(req.user.email).toBe('test@example.com');
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid JWT token', async () => {
      req.headers.authorization = 'Bearer invalid-token';

      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject missing authorization header', async () => {
      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Access denied. No token provided.' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject expired token', async () => {
      const expiredToken = jwt.sign(
        { userId: 'user-123' },
        process.env.JWT_SECRET,
        { expiresIn: '-1h' }
      );

      req.headers.authorization = `Bearer ${expiredToken}`;

      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token expired' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('requireAdmin', () => {
    it('should allow admin users', async () => {
      req.user = { userId: 'admin-123', role: 'admin' };

      await requireAdmin(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject non-admin users', async () => {
      req.user = { userId: 'user-123', role: 'user' };

      await requireAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Admin access required' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject users without role', async () => {
      req.user = { userId: 'user-123' };

      await requireAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Admin access required' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('verifyApiKey', () => {
    beforeEach(() => {
      process.env.API_KEY = 'test-api-key';
    });

    it('should verify valid API key', async () => {
      req.headers['x-api-key'] = 'test-api-key';

      await verifyApiKey(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid API key', async () => {
      req.headers['x-api-key'] = 'invalid-key';

      await verifyApiKey(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid API key' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject missing API key', async () => {
      await verifyApiKey(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'API key required' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('verifyHmacSignature', () => {
    beforeEach(() => {
      process.env.WEBHOOK_SECRET = 'test-webhook-secret';
    });

    it('should verify valid HMAC signature', async () => {
      const payload = JSON.stringify({ test: 'data' });
      const signature = require('crypto')
        .createHmac('sha256', process.env.WEBHOOK_SECRET)
        .update(payload)
        .digest('hex');

      req.headers['x-hub-signature-256'] = `sha256=${signature}`;
      req.body = { test: 'data' };

      await verifyHmacSignature(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid HMAC signature', async () => {
      req.headers['x-hub-signature-256'] = 'sha256=invalid-signature';
      req.body = { test: 'data' };

      await verifyHmacSignature(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid signature' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject missing signature', async () => {
      req.body = { test: 'data' };

      await verifyHmacSignature(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Signature required' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});

describe('Password Hashing', () => {
  it('should hash passwords correctly', async () => {
    const password = 'testpassword123';
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(50);

    const isValid = await bcrypt.compare(password, hash);
    expect(isValid).toBe(true);
  });

  it('should reject incorrect passwords', async () => {
    const password = 'testpassword123';
    const wrongPassword = 'wrongpassword';
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
    const isValid = await bcrypt.compare(wrongPassword, hash);

    expect(isValid).toBe(false);
  });
});
