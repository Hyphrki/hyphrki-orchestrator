import { Pool } from 'pg';

// Use DATABASE_URL if available, otherwise use individual variables
const connectionConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'hyphrki_platform',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool(connectionConfig);

export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async query(text: string, params?: unknown[]) {
    const start = Date.now();
    try {
      const res = await this.pool.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  async getClient() {
    return await this.pool.connect();
  }

  async close() {
    await this.pool.end();
  }

  // Health check
  async healthCheck() {
    try {
      const result = await this.query('SELECT NOW()');
      return { status: 'healthy', timestamp: result.rows[0].now };
    } catch (error) {
      return { status: 'unhealthy', error: (error as Error).message };
    }
  }
}

export const db = new DatabaseService();
