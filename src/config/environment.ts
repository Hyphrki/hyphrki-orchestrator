export const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'hyphrki',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  n8n: {
    baseUrl: process.env.N8N_BASE_URL || 'https://n8n.hyphrki.com',
    apiKey: process.env.N8N_API_KEY || '',
  },
  upload: {
    dir: process.env.UPLOAD_DIR || './public/uploads',
    baseUrl: process.env.BASE_URL || 'https://orchestrator.hyphrki.com',
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'application/json',
      'text/plain'
    ]
  },
  websocket: {
    port: parseInt(process.env.WS_PORT || '8080'),
  },
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001'),
  }
};
