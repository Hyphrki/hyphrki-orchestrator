"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ParameterValidationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterValidationService = void 0;
const common_1 = require("@nestjs/common");
let ParameterValidationService = ParameterValidationService_1 = class ParameterValidationService {
    logger = new common_1.Logger(ParameterValidationService_1.name);
    validateParameter(parameterName, value, fieldType, validationRules, isRequired = true) {
        const errors = [];
        if (isRequired && (value === null || value === undefined || value === '')) {
            errors.push({
                field: parameterName,
                message: `${parameterName} is required`,
                rule: 'required',
                value,
            });
            return { isValid: false, errors };
        }
        if (!isRequired && (value === null || value === undefined || value === '')) {
            return { isValid: true, errors: [] };
        }
        const typeValidation = this.validateByType(parameterName, value, fieldType);
        if (!typeValidation.isValid) {
            errors.push(...typeValidation.errors);
        }
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
    validateParameters(parameterValues, parameterConfigs) {
        const errors = [];
        for (const config of parameterConfigs) {
            const value = parameterValues[config.parameterName];
            const result = this.validateParameter(config.parameterName, value, config.fieldType, config.validationRules, config.isRequired);
            if (!result.isValid) {
                errors.push(...result.errors);
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    validateByType(parameterName, value, fieldType) {
        const errors = [];
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
                break;
            default:
                this.logger.warn(`Unknown field type: ${fieldType}`);
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    validateCustomRules(parameterName, value, rules) {
        const errors = [];
        if (rules.min !== undefined) {
            if (typeof value === 'string' && value.length < rules.min) {
                errors.push({
                    field: parameterName,
                    message: rules.errorMessage || `Must be at least ${rules.min} characters`,
                    rule: 'min',
                    value,
                });
            }
            else if (typeof value === 'number' && value < rules.min) {
                errors.push({
                    field: parameterName,
                    message: rules.errorMessage || `Must be at least ${rules.min}`,
                    rule: 'min',
                    value,
                });
            }
        }
        if (rules.max !== undefined) {
            if (typeof value === 'string' && value.length > rules.max) {
                errors.push({
                    field: parameterName,
                    message: rules.errorMessage || `Must be no more than ${rules.max} characters`,
                    rule: 'max',
                    value,
                });
            }
            else if (typeof value === 'number' && value > rules.max) {
                errors.push({
                    field: parameterName,
                    message: rules.errorMessage || `Must be no more than ${rules.max}`,
                    rule: 'max',
                    value,
                });
            }
        }
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
            }
            catch (error) {
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
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
    isValidNumber(value) {
        return !isNaN(Number(value)) && isFinite(Number(value));
    }
    isValidDate(value) {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }
    sanitizeForLogging(parameterValues, sensitiveKeys) {
        const sanitized = { ...parameterValues };
        for (const key of sensitiveKeys) {
            if (sanitized[key]) {
                sanitized[key] = '[REDACTED]';
            }
        }
        return sanitized;
    }
};
exports.ParameterValidationService = ParameterValidationService;
exports.ParameterValidationService = ParameterValidationService = ParameterValidationService_1 = __decorate([
    (0, common_1.Injectable)()
], ParameterValidationService);
//# sourceMappingURL=validation.utils.js.map