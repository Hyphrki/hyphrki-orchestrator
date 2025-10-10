import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../../security/encryption/encryption.service';

@Injectable()
export class DatabaseEncryptionService {
  // Fields that should be encrypted in each table
  private readonly encryptedFields: Record<string, string[]> = {
    User: ['email', 'firstName', 'lastName'],
    Organization: ['name', 'description'],
    Agent: ['name', 'description', 'config'],
    Workflow: ['name', 'description', 'config'],
    WorkflowExecution: ['inputData', 'outputData'],
  };

  constructor(private encryptionService: EncryptionService) {}

  /**
   * Encrypt data before database operations
   */
  encryptData(model: string, data: any): any {
    if (!data || typeof data !== 'object') return data;

    const fields = this.encryptedFields[model];
    if (!fields) return data;

    const result = { ...data };

    fields.forEach((field: string) => {
      if (result[field] !== undefined && typeof result[field] === 'string') {
        result[field] = this.encryptionService.encrypt(result[field]);
      }
    });

    return result;
  }

  /**
   * Decrypt data after database operations
   */
  decryptData(model: string, data: any): any {
    if (!data || typeof data !== 'object') return data;

    const fields = this.encryptedFields[model];
    if (!fields) return data;

    const decryptObject = (obj: any): any => {
      if (!obj || typeof obj !== 'object') return obj;

      const result = { ...obj };

      fields.forEach((field: string) => {
        if (result[field] !== undefined && typeof result[field] === 'string') {
          try {
            result[field] = this.encryptionService.decrypt(result[field]);
          } catch (error) {
            // If decryption fails, keep the original value
            console.warn(`Failed to decrypt field ${field}:`, error);
          }
        }
      });

      // Handle nested objects/arrays
      Object.keys(result).forEach((key: string) => {
        if (typeof result[key] === 'object' && result[key] !== null) {
          result[key] = decryptObject(result[key]);
        }
      });

      return result;
    };

    if (Array.isArray(data)) {
      return data.map(decryptObject);
    } else {
      return decryptObject(data);
    }
  }

  /**
   * Check if a field should be encrypted
   */
  isEncryptedField(model: string, field: string): boolean {
    return this.encryptedFields[model]?.includes(field) ?? false;
  }

  /**
   * Manually encrypt a field value
   */
  encryptField(model: string, field: string, value: string): string {
    if (!this.isEncryptedField(model, field)) {
      throw new Error(`Field ${field} in model ${model} is not configured for encryption`);
    }
    return this.encryptionService.encrypt(value);
  }

  /**
   * Manually decrypt a field value
   */
  decryptField(model: string, field: string, value: string): string {
    if (!this.isEncryptedField(model, field)) {
      throw new Error(`Field ${field} in model ${model} is not configured for encryption`);
    }
    return this.encryptionService.decrypt(value);
  }

  /**
   * Get encryption statistics
   */
  getEncryptionStats() {
    const stats = {
      encryptedModels: Object.keys(this.encryptedFields),
      totalEncryptedFields: Object.values(this.encryptedFields).reduce(
        (sum, fields) => sum + fields.length,
        0,
      ),
      encryptionEnabled: true,
    };

    return stats;
  }

  /**
   * Validate encryption configuration
   */
  validateEncryptionConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check if encryption key is set (we'll check this via environment)
    if (!process.env.ENCRYPTION_KEY) {
      errors.push('ENCRYPTION_KEY environment variable is not set');
    }

    // Validate encrypted fields configuration
    Object.entries(this.encryptedFields).forEach(([model, fields]) => {
      if (!Array.isArray(fields) || fields.length === 0) {
        errors.push(`No encrypted fields configured for model ${model}`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
