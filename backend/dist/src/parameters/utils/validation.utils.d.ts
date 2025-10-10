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
export declare class ParameterValidationService {
    private readonly logger;
    validateParameter(parameterName: string, value: any, fieldType: string, validationRules?: ValidationRule, isRequired?: boolean): ValidationResult;
    validateParameters(parameterValues: Record<string, any>, parameterConfigs: Array<{
        parameterName: string;
        fieldType: string;
        validationRules?: ValidationRule;
        isRequired: boolean;
    }>): ValidationResult;
    private validateByType;
    private validateCustomRules;
    private isValidEmail;
    private isValidUrl;
    private isValidNumber;
    private isValidDate;
    sanitizeForLogging(parameterValues: Record<string, any>, sensitiveKeys: string[]): Record<string, any>;
}
