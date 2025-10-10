import { Injectable, Logger } from '@nestjs/common';

export interface ValidationRule {
  min?: number;
  max?: number;
  regex?: string;
  errorMessage?: string;
  required?: boolean;
  type?: 'string' | 'number' | 'email' | 'url' | 'boolean';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  rule: string;
  value?: any;
}

@Injectable()
export class ParameterValidationService {
  private readonly logger = new Logger(ParameterValidationService.name);

  /**
   * Validate a single parameter value against its configuration
   */
  validateParameter(
    parameterName: string,
    value: any,
    fieldType: string,
    validationRules?: ValidationRule,
    isRequired: boolean = true
  ): ValidationResult {
    const errors: ValidationError[] = [];

    // Check required
    if (isRequired && (value === null || value === undefined || value === '')) {
      errors.push({
        field: parameterName,
        message: `${parameterName} is required`,
        rule: 'required',
        value,
      });
      return { isValid: false, errors };
    }

    // Skip validation if value is empty and not required
    if (!isRequired && (value === null || value === undefined || value === '')) {
      return { isValid: true, errors: [] };
    }

    // Type-specific validation
    const typeValidation = this.validateByType(parameterName, value, fieldType);
    if (!typeValidation.isValid) {
      errors.push(...typeValidation.errors);
    }

    // Custom validation rules
    if (validationRules) {
      const customValidation = this.validateCustomRules(parameterName, value, validationRules);
      if (!customValidation.isValid) {
        errors.push(...customValidation.errors);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate multiple parameters against their configurations
   */
  validateParameters(
    parameterValues: Record<string, any>,
    parameterConfigs: Array<{
      parameterName: string;
      fieldType: string;
      validationRules?: ValidationRule;
      isRequired: boolean;
    }>
  ): ValidationResult {
    const errors: ValidationError[] = [];

    for (const config of parameterConfigs) {
      const value = parameterValues[config.parameterName];
      const result = this.validateParameter(
        config.parameterName,
        value,
        config.fieldType,
        config.validationRules,
        config.isRequired
      );

      if (!result.isValid) {
        errors.push(...result.errors);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate by field type
   */
  private validateByType(parameterName: string, value: any, fieldType: string): ValidationResult {
    const errors: ValidationError[] = [];

    switch (fieldType) {
      case 'email':
        if (!this.isValidEmail(value)) {
          errors.push({
            field: parameterName,
            message: 'Invalid email format',
            rule: 'email',
            value,
          });
        }
        break;

      case 'url':
        if (!this.isValidUrl(value)) {
          errors.push({
            field: parameterName,
            message: 'Invalid URL format',
            rule: 'url',
            value,
          });
        }
        break;

      case 'number':
        if (!this.isValidNumber(value)) {
          errors.push({
            field: parameterName,
            message: 'Must be a valid number',
            rule: 'number',
            value,
          });
        }
        break;

      case 'password':
        if (typeof value !== 'string') {
          errors.push({
            field: parameterName,
            message: 'Password must be a string',
            rule: 'string',
            value,
          });
        }
        break;

      case 'text':
      case 'textarea':
        if (typeof value !== 'string') {
          errors.push({
            field: parameterName,
            message: 'Must be a string',
            rule: 'string',
            value,
          });
        }
        break;

      case 'checkbox':
        if (typeof value !== 'boolean') {
          errors.push({
            field: parameterName,
            message: 'Must be a boolean value',
            rule: 'boolean',
            value,
          });
        }
        break;

      case 'date':
        if (!this.isValidDate(value)) {
          errors.push({
            field: parameterName,
            message: 'Must be a valid date',
            rule: 'date',
            value,
          });
        }
        break;

      case 'select':
        // Select validation should be handled by checking against allowed options
        // This is typically done in the custom rules
        break;

      default:
        this.logger.warn(`Unknown field type: ${fieldType}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate custom rules
   */
  private validateCustomRules(
    parameterName: string,
    value: any,
    rules: ValidationRule
  ): ValidationResult {
    const errors: ValidationError[] = [];

    // Min length/value
    if (rules.min !== undefined) {
      if (typeof value === 'string' && value.length < rules.min) {
        errors.push({
          field: parameterName,
          message: rules.errorMessage || `Must be at least ${rules.min} characters`,
          rule: 'min',
          value,
        });
      } else if (typeof value === 'number' && value < rules.min) {
        errors.push({
          field: parameterName,
          message: rules.errorMessage || `Must be at least ${rules.min}`,
          rule: 'min',
          value,
        });
      }
    }

    // Max length/value
    if (rules.max !== undefined) {
      if (typeof value === 'string' && value.length > rules.max) {
        errors.push({
          field: parameterName,
          message: rules.errorMessage || `Must be no more than ${rules.max} characters`,
          rule: 'max',
          value,
        });
      } else if (typeof value === 'number' && value > rules.max) {
        errors.push({
          field: parameterName,
          message: rules.errorMessage || `Must be no more than ${rules.max}`,
          rule: 'max',
          value,
        });
      }
    }

    // Regex pattern
    if (rules.regex) {
      try {
        const regex = new RegExp(rules.regex);
        if (!regex.test(value)) {
          errors.push({
            field: parameterName,
            message: rules.errorMessage || 'Invalid format',
            rule: 'regex',
            value,
          });
        }
      } catch (error) {
        this.logger.error(`Invalid regex pattern for ${parameterName}:`, rules.regex);
        errors.push({
          field: parameterName,
          message: 'Invalid validation pattern',
          rule: 'regex',
          value,
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate number format
   */
  private isValidNumber(value: any): boolean {
    return !isNaN(Number(value)) && isFinite(Number(value));
  }

  /**
   * Validate date format
   */
  private isValidDate(value: any): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  /**
   * Sanitize parameter values (remove sensitive data for logging)
   */
  sanitizeForLogging(parameterValues: Record<string, any>, sensitiveKeys: string[]): Record<string, any> {
    const sanitized = { ...parameterValues };
    
    for (const key of sensitiveKeys) {
      if (sanitized[key]) {
        sanitized[key] = '[REDACTED]';
      }
    }
    
    return sanitized;
  }
}
