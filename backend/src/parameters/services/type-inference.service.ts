import { Injectable } from '@nestjs/common';
import { FieldType } from '@prisma/client';
import { DetectedParameter } from '../../n8n/services/parser.service';

@Injectable()
export class ParameterTypeInferenceService {
  /**
   * Infer field type from parameter name and context
   */
  inferFieldType(parameter: DetectedParameter): FieldType {
    const name = parameter.name.toLowerCase();
    const path = parameter.path.toLowerCase();

    // Password/API Key detection
    if (this.isPasswordField(name, path)) {
      return FieldType.password;
    }

    // Email detection
    if (this.isEmailField(name, path)) {
      return FieldType.email;
    }

    // URL detection
    if (this.isUrlField(name, path)) {
      return FieldType.url;
    }

    // Number detection
    if (this.isNumberField(name, path, parameter.defaultValue)) {
      return FieldType.number;
    }

    // Boolean detection
    if (this.isBooleanField(name, path, parameter.defaultValue)) {
      return FieldType.checkbox;
    }

    // Long text detection
    if (this.isLongTextField(name, path)) {
      return FieldType.textarea;
    }

    // Date detection
    if (this.isDateField(name, path)) {
      return FieldType.date;
    }

    // Default to text
    return FieldType.text;
  }

  private isPasswordField(name: string, path: string): boolean {
    const passwordKeywords = [
      'password', 'passwd', 'pwd', 'secret', 'key', 'token', 'auth',
      'apikey', 'api_key', 'apikey', 'accesskey', 'access_key',
      'privatekey', 'private_key', 'credential', 'credentials'
    ];

    return passwordKeywords.some(keyword => 
      name.includes(keyword) || path.includes(keyword)
    );
  }

  private isEmailField(name: string, path: string): boolean {
    const emailKeywords = ['email', 'mail', 'e-mail', 'recipient', 'sender'];
    return emailKeywords.some(keyword => 
      name.includes(keyword) || path.includes(keyword)
    );
  }

  private isUrlField(name: string, path: string): boolean {
    const urlKeywords = ['url', 'uri', 'endpoint', 'link', 'href', 'baseurl', 'base_url'];
    return urlKeywords.some(keyword => 
      name.includes(keyword) || path.includes(keyword)
    );
  }

  private isNumberField(name: string, path: string, defaultValue?: any): boolean {
    const numberKeywords = ['count', 'number', 'num', 'amount', 'quantity', 'size', 'limit', 'max', 'min'];
    
    if (numberKeywords.some(keyword => name.includes(keyword) || path.includes(keyword))) {
      return true;
    }

    // Check if default value is a number
    if (defaultValue !== undefined && !isNaN(Number(defaultValue))) {
      return true;
    }

    return false;
  }

  private isBooleanField(name: string, path: string, defaultValue?: any): boolean {
    const booleanKeywords = ['enabled', 'disabled', 'active', 'inactive', 'true', 'false', 'flag'];
    
    if (booleanKeywords.some(keyword => name.includes(keyword) || path.includes(keyword))) {
      return true;
    }

    // Check if default value is boolean
    if (typeof defaultValue === 'boolean') {
      return true;
    }

    return false;
  }

  private isLongTextField(name: string, path: string): boolean {
    const longTextKeywords = ['description', 'content', 'body', 'message', 'text', 'comment', 'note'];
    return longTextKeywords.some(keyword => 
      name.includes(keyword) || path.includes(keyword)
    );
  }

  private isDateField(name: string, path: string): boolean {
    const dateKeywords = ['date', 'time', 'timestamp', 'created', 'updated', 'expires', 'due'];
    return dateKeywords.some(keyword => 
      name.includes(keyword) || path.includes(keyword)
    );
  }

  /**
   * Generate validation rules based on field type
   */
  generateValidationRules(fieldType: FieldType, parameter: DetectedParameter): Record<string, any> {
    const rules: Record<string, any> = {};

    switch (fieldType) {
      case FieldType.email:
        rules.regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
        rules.errorMessage = 'Please enter a valid email address';
        break;

      case FieldType.url:
        rules.regex = '^https?://[^\\s/$.?#].[^\\s]*$';
        rules.errorMessage = 'Please enter a valid URL starting with http:// or https://';
        break;

      case FieldType.number:
        rules.min = 0;
        rules.max = 999999;
        rules.errorMessage = 'Please enter a number between 0 and 999999';
        break;

      case FieldType.text:
        rules.min = 1;
        rules.max = 255;
        rules.errorMessage = 'Text must be between 1 and 255 characters';
        break;

      case FieldType.textarea:
        rules.min = 1;
        rules.max = 5000;
        rules.errorMessage = 'Text must be between 1 and 5000 characters';
        break;

      case FieldType.password:
        rules.min = 8;
        rules.max = 128;
        rules.errorMessage = 'Password must be between 8 and 128 characters';
        break;
    }

    return rules;
  }

  /**
   * Generate display label from parameter name
   */
  generateDisplayLabel(parameterName: string): string {
    return parameterName
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Generate help text based on field type and parameter name
   */
  generateHelpText(fieldType: FieldType, parameterName: string): string {
    const name = parameterName.toLowerCase();

    switch (fieldType) {
      case FieldType.password:
        if (name.includes('api') || name.includes('key')) {
          return 'Your API key for authentication';
        }
        return 'Enter your password';

      case FieldType.email:
        return 'Enter a valid email address';

      case FieldType.url:
        return 'Enter a valid URL (e.g., https://api.example.com)';

      case FieldType.number:
        return 'Enter a numeric value';

      case FieldType.textarea:
        return 'Enter detailed information';

      case FieldType.date:
        return 'Select a date';

      default:
        return `Enter the ${parameterName.toLowerCase().replace(/[_-]/g, ' ')} value`;
    }
  }
}