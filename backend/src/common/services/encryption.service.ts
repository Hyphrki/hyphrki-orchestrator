import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;
  private readonly ivLength = 16; // For GCM, this is 96 bits / 12 bytes, but we'll use 16 for compatibility

  constructor(private configService: ConfigService) {
    const encryptionKey = this.configService.get('ENCRYPTION_KEY');
    
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY environment variable is required');
    }

    // Ensure key is exactly 32 bytes for AES-256
    this.key = crypto.scryptSync(encryptionKey, 'salt', 32);
    
    this.logger.log('EncryptionService initialized');
  }

  /**
   * Encrypt sensitive data
   */
  encrypt(text: string): string {
    try {
      const iv = crypto.randomBytes(this.ivLength);
      const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const authTag = cipher.getAuthTag();

      // Combine iv + authTag + encrypted data
      const combined = iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;

      return `encrypted:${Buffer.from(combined).toString('base64')}`;
    } catch (error) {
      this.logger.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt sensitive data
   */
  decrypt(encryptedText: string): string {
    try {
      if (!encryptedText.startsWith('encrypted:')) {
        throw new Error('Invalid encrypted data format');
      }

      const base64Data = encryptedText.substring(10); // Remove 'encrypted:' prefix
      const combined = Buffer.from(base64Data, 'base64').toString('hex');
      
      const parts = combined.split(':');
      if (parts.length !== 3) {
        throw new Error('Invalid encrypted data format');
      }

      const iv = Buffer.from(parts[0], 'hex');
      const authTag = Buffer.from(parts[1], 'hex');
      const encrypted = parts[2];

      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      this.logger.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Check if a string is encrypted
   */
  isEncrypted(text: string): boolean {
    return text.startsWith('encrypted:');
  }

  /**
   * Encrypt object values marked as sensitive
   */
  encryptSensitiveValues(obj: Record<string, any>, sensitiveKeys: string[]): Record<string, any> {
    const encrypted = { ...obj };
    
    for (const key of sensitiveKeys) {
      if (encrypted[key] && typeof encrypted[key] === 'string' && !this.isEncrypted(encrypted[key])) {
        encrypted[key] = this.encrypt(encrypted[key]);
      }
    }
    
    return encrypted;
  }

  /**
   * Decrypt object values that are encrypted
   */
  decryptEncryptedValues(obj: Record<string, any>): Record<string, any> {
    const decrypted = { ...obj };
    
    for (const [key, value] of Object.entries(decrypted)) {
      if (typeof value === 'string' && this.isEncrypted(value)) {
        try {
          decrypted[key] = this.decrypt(value);
        } catch (error) {
          this.logger.warn(`Failed to decrypt value for key ${key}:`, error);
          // Keep encrypted value if decryption fails
        }
      }
    }
    
    return decrypted;
  }

  /**
   * Generate a secure random string
   */
  generateSecureRandom(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Hash a string (one-way)
   */
  hash(text: string, algorithm: string = 'sha256'): string {
    return crypto.createHash(algorithm).update(text).digest('hex');
  }

  /**
   * Verify a hash
   */
  verifyHash(text: string, hash: string, algorithm: string = 'sha256'): boolean {
    const computedHash = this.hash(text, algorithm);
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(computedHash));
  }
}
