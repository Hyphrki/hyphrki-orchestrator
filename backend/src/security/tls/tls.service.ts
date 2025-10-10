import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TlsService {
  constructor(private configService: ConfigService) {}

  /**
   * Get TLS configuration for HTTPS
   */
  getTlsOptions() {
    const useTls = this.configService.get<string>('USE_TLS') === 'true';

    if (!useTls) {
      return null; // Use HTTP when TLS is disabled
    }

    const certPath = this.configService.get<string>('TLS_CERT_PATH');
    const keyPath = this.configService.get<string>('TLS_KEY_PATH');

    if (!certPath || !keyPath) {
      throw new Error(
        'TLS_CERT_PATH and TLS_KEY_PATH must be configured for TLS',
      );
    }

    // Check if certificate files exist
    if (!fs.existsSync(certPath)) {
      throw new Error(`TLS certificate not found at ${certPath}`);
    }

    if (!fs.existsSync(keyPath)) {
      throw new Error(`TLS private key not found at ${keyPath}`);
    }

    return {
      cert: fs.readFileSync(certPath),
      key: fs.readFileSync(keyPath),
      minVersion: 'TLSv1.2', // Minimum TLS 1.2 as per security requirements
      ciphers: [
        'ECDHE-RSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-RSA-AES128-SHA256',
        'ECDHE-RSA-AES256-SHA384',
      ].join(':'),
      secureOptions:
        require('crypto').constants.SSL_OP_NO_TLSv1 |
        require('crypto').constants.SSL_OP_NO_TLSv1_1,
    };
  }

  /**
   * Generate self-signed certificate for development
   */
  generateSelfSignedCert(certDir = './certs') {
    const { execSync } = require('child_process');

    // Create certs directory if it doesn't exist
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    const keyPath = path.join(certDir, 'key.pem');
    const certPath = path.join(certDir, 'cert.pem');

    try {
      // Generate private key
      execSync(`openssl genrsa -out ${keyPath} 2048`, { stdio: 'inherit' });

      // Generate certificate
      execSync(
        `openssl req -new -x509 -key ${keyPath} -out ${certPath} -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`,
        { stdio: 'inherit' },
      );

      console.log('Self-signed certificate generated successfully');
      console.log(`Certificate: ${certPath}`);
      console.log(`Private key: ${keyPath}`);

      return { certPath, keyPath };
    } catch (error) {
      console.error('Failed to generate self-signed certificate:', error);
      throw error;
    }
  }

  /**
   * Validate TLS configuration
   */
  validateTlsConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const useTls = this.configService.get<string>('USE_TLS') === 'true';

    if (isProduction && !useTls) {
      errors.push('TLS must be enabled in production');
    }

    if (useTls) {
      const certPath = this.configService.get<string>('TLS_CERT_PATH');
      const keyPath = this.configService.get<string>('TLS_KEY_PATH');

      if (!certPath) {
        errors.push('TLS_CERT_PATH must be configured when TLS is enabled');
      } else if (!fs.existsSync(certPath)) {
        errors.push(`TLS certificate not found at ${certPath}`);
      }

      if (!keyPath) {
        errors.push('TLS_KEY_PATH must be configured when TLS is enabled');
      } else if (!fs.existsSync(keyPath)) {
        errors.push(`TLS private key not found at ${keyPath}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get security headers for HTTP responses
   */
  getSecurityHeaders() {
    return {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'",
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    };
  }
}
