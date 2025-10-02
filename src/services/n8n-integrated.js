const { spawn } = require('child_process');
const path = require('path');
const n8nAuthBridge = require('../lib/n8n-auth-bridge');

/**
 * N8N Integrated Service
 *
 * This service starts N8N with our custom authentication
 * and configuration to work seamlessly with the orchestrator.
 */
class N8NIntegratedService {
  constructor() {
    this.n8nProcess = null;
    this.isRunning = false;
    this.n8nPath = path.join(__dirname, '../../n8n');
  }

  /**
   * Start N8N with custom configuration
   */
  start() {
    if (this.isRunning) {
      console.log('N8N is already running');
      return;
    }

    console.log('Starting N8N with Hyphrki integration...');

    const env = {
      ...process.env,

      // Database connection (use our shared database)
      DB_TYPE: 'postgresdb',
      DB_POSTGRESDB_DATABASE: process.env.DB_NAME || 'hyphrki_platform',
      DB_POSTGRESDB_HOST: process.env.DB_HOST || 'localhost',
      DB_POSTGRESDB_PORT: process.env.DB_PORT || '5432',
      DB_POSTGRESDB_USER: process.env.DB_USER || 'hyphrki_user',
      DB_POSTGRESDB_PASSWORD: process.env.DB_PASSWORD || '',
      DB_POSTGRESDB_SCHEMA: 'n8n', // Separate schema for N8N tables

      // Or use DATABASE_URL directly
      // DATABASE_URL: process.env.DATABASE_URL,

      // N8N Configuration
      N8N_PORT: process.env.N8N_PORT || '8081',
      N8N_HOST: process.env.N8N_HOST || 'localhost',
      N8N_PROTOCOL: 'http',
      N8N_PATH: '/n8n/',

      // Disable N8N's built-in authentication (we'll handle it)
      N8N_BASIC_AUTH_ACTIVE: 'false',
      N8N_DISABLE_UI: 'false',

      // Encryption key for credentials
      N8N_ENCRYPTION_KEY: process.env.N8N_ENCRYPTION_KEY || 'hyphrki-n8n-encryption-key-change-in-production',

      // Execution settings
      EXECUTIONS_PROCESS: 'main',
      EXECUTIONS_MODE: 'regular',

      // User folder for workflows and data
      N8N_USER_FOLDER: path.join(__dirname, '../../n8n_data'),

      // Webhook URL
      WEBHOOK_URL: process.env.NEXT_PUBLIC_ORCHESTRATOR_URL || 'http://localhost:5678',

      // Editor URL
      N8N_EDITOR_BASE_URL: process.env.NEXT_PUBLIC_ORCHESTRATOR_URL || 'http://localhost:5678',

      // Disable telemetry in production
      N8N_DIAGNOSTICS_ENABLED: 'false',
      N8N_VERSION_NOTIFICATIONS_ENABLED: 'false',
      N8N_TEMPLATES_ENABLED: 'true',
      N8N_TEMPLATES_HOST: 'https://api.n8n.io/api/',

      // License (we'll bypass this)
      N8N_LICENSE_SERVER_URL: '',
      N8N_LICENSE_AUTO_RENEW_ENABLED: 'false',

      // Security
      N8N_BLOCK_ENV_ACCESS_IN_NODE: 'false',
      N8N_GENERIC_TIMEZONE: 'UTC',

      // Logging
      N8N_LOG_LEVEL: process.env.LOG_LEVEL || 'info',
      N8N_LOG_OUTPUT: 'console',

      // Multi-tenancy support
      N8N_MULTI_MAIN_SETUP_ENABLED: 'false',

      // Community nodes
      N8N_COMMUNITY_NODES_ALLOWED: 'true',

      // External secrets (enterprise feature - we'll enable)
      N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL: '300',

      // Source control (enterprise feature - we'll enable)
      N8N_SOURCECONTROL_ENABLED: 'true',

      // Variables (enterprise feature - we'll enable)
      N8N_VARIABLES_ENABLED: 'true',

      // Workers (enterprise feature - we'll enable)
      QUEUE_BULL_REDIS_HOST: process.env.REDIS_HOST || 'localhost',
      QUEUE_BULL_REDIS_PORT: process.env.REDIS_PORT || '6379',
      QUEUE_BULL_REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',

      // SSO (enterprise feature - we're handling it ourselves)
      N8N_SSO_SAML_ENABLED: 'false',
      N8N_SSO_LDAP_ENABLED: 'false',

      // Audit logs (enterprise feature - we'll implement)
      N8N_AUDIT_LOGS_ENABLED: 'true',

      // Advanced execution data (enterprise feature - we'll enable)
      N8N_EXECUTIONS_DATA_SAVE_ON_ERROR: 'all',
      N8N_EXECUTIONS_DATA_SAVE_ON_SUCCESS: 'all',
      N8N_EXECUTIONS_DATA_SAVE_ON_PROGRESS: 'true',
      N8N_EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS: 'true',
    };

    // Start N8N process (we've modified the version check to allow any Node version)
    this.n8nProcess = spawn('pnpm', ['start'], {
      cwd: path.join(this.n8nPath, 'packages/cli'),
      env,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    // Handle stdout
    this.n8nProcess.stdout.on('data', (data) => {
      const message = data.toString();
      console.log(`[N8N] ${message.trim()}`);

      // Check if N8N started successfully
      if (message.includes('Editor is now accessible')) {
        this.isRunning = true;
        console.log('✓ N8N started successfully');
      }
    });

    // Handle stderr
    this.n8nProcess.stderr.on('data', (data) => {
      console.error(`[N8N Error] ${data.toString().trim()}`);
    });

    // Handle process exit
    this.n8nProcess.on('close', (code) => {
      this.isRunning = false;
      console.log(`N8N process exited with code ${code}`);

      // Auto-restart on crash (optional)
      if (code !== 0 && code !== null) {
        console.log('N8N crashed, restarting in 5 seconds...');
        setTimeout(() => this.start(), 5000);
      }
    });

    // Handle process error
    this.n8nProcess.on('error', (error) => {
      console.error('Failed to start N8N:', error);
      this.isRunning = false;
    });
  }

  /**
   * Stop N8N process
   */
  stop() {
    if (this.n8nProcess) {
      console.log('Stopping N8N...');
      this.n8nProcess.kill('SIGTERM');
      this.n8nProcess = null;
      this.isRunning = false;
    }
  }

  /**
   * Restart N8N
   */
  restart() {
    console.log('Restarting N8N...');
    this.stop();
    setTimeout(() => this.start(), 2000);
  }

  /**
   * Get N8N status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      processId: this.n8nProcess?.pid || null,
      url: `http://${process.env.N8N_HOST || 'localhost'}:${process.env.N8N_PORT || '8081'}`
    };
  }
}

// Export singleton instance
module.exports = new N8NIntegratedService();
