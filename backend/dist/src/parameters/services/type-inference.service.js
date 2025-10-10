"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterTypeInferenceService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ParameterTypeInferenceService = class ParameterTypeInferenceService {
    inferFieldType(parameter) {
        const name = parameter.name.toLowerCase();
        const path = parameter.path.toLowerCase();
        if (this.isPasswordField(name, path)) {
            return client_1.FieldType.password;
        }
        if (this.isEmailField(name, path)) {
            return client_1.FieldType.email;
        }
        if (this.isUrlField(name, path)) {
            return client_1.FieldType.url;
        }
        if (this.isNumberField(name, path, parameter.defaultValue)) {
            return client_1.FieldType.number;
        }
        if (this.isBooleanField(name, path, parameter.defaultValue)) {
            return client_1.FieldType.checkbox;
        }
        if (this.isLongTextField(name, path)) {
            return client_1.FieldType.textarea;
        }
        if (this.isDateField(name, path)) {
            return client_1.FieldType.date;
        }
        return client_1.FieldType.text;
    }
    isPasswordField(name, path) {
        const passwordKeywords = [
            'password', 'passwd', 'pwd', 'secret', 'key', 'token', 'auth',
            'apikey', 'api_key', 'apikey', 'accesskey', 'access_key',
            'privatekey', 'private_key', 'credential', 'credentials'
        ];
        return passwordKeywords.some(keyword => name.includes(keyword) || path.includes(keyword));
    }
    isEmailField(name, path) {
        const emailKeywords = ['email', 'mail', 'e-mail', 'recipient', 'sender'];
        return emailKeywords.some(keyword => name.includes(keyword) || path.includes(keyword));
    }
    isUrlField(name, path) {
        const urlKeywords = ['url', 'uri', 'endpoint', 'link', 'href', 'baseurl', 'base_url'];
        return urlKeywords.some(keyword => name.includes(keyword) || path.includes(keyword));
    }
    isNumberField(name, path, defaultValue) {
        const numberKeywords = ['count', 'number', 'num', 'amount', 'quantity', 'size', 'limit', 'max', 'min'];
        if (numberKeywords.some(keyword => name.includes(keyword) || path.includes(keyword))) {
            return true;
        }
        if (defaultValue !== undefined && !isNaN(Number(defaultValue))) {
            return true;
        }
        return false;
    }
    isBooleanField(name, path, defaultValue) {
        const booleanKeywords = ['enabled', 'disabled', 'active', 'inactive', 'true', 'false', 'flag'];
        if (booleanKeywords.some(keyword => name.includes(keyword) || path.includes(keyword))) {
            return true;
        }
        if (typeof defaultValue === 'boolean') {
            return true;
        }
        return false;
    }
    isLongTextField(name, path) {
        const longTextKeywords = ['description', 'content', 'body', 'message', 'text', 'comment', 'note'];
        return longTextKeywords.some(keyword => name.includes(keyword) || path.includes(keyword));
    }
    isDateField(name, path) {
        const dateKeywords = ['date', 'time', 'timestamp', 'created', 'updated', 'expires', 'due'];
        return dateKeywords.some(keyword => name.includes(keyword) || path.includes(keyword));
    }
    generateValidationRules(fieldType, parameter) {
        const rules = {};
        switch (fieldType) {
            case client_1.FieldType.email:
                rules.regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
                rules.errorMessage = 'Please enter a valid email address';
                break;
            case client_1.FieldType.url:
                rules.regex = '^https?://[^\\s/$.?#].[^\\s]*$';
                rules.errorMessage = 'Please enter a valid URL starting with http:// or https://';
                break;
            case client_1.FieldType.number:
                rules.min = 0;
                rules.max = 999999;
                rules.errorMessage = 'Please enter a number between 0 and 999999';
                break;
            case client_1.FieldType.text:
                rules.min = 1;
                rules.max = 255;
                rules.errorMessage = 'Text must be between 1 and 255 characters';
                break;
            case client_1.FieldType.textarea:
                rules.min = 1;
                rules.max = 5000;
                rules.errorMessage = 'Text must be between 1 and 5000 characters';
                break;
            case client_1.FieldType.password:
                rules.min = 8;
                rules.max = 128;
                rules.errorMessage = 'Password must be between 8 and 128 characters';
                break;
        }
        return rules;
    }
    generateDisplayLabel(parameterName) {
        return parameterName
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_-]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    generateHelpText(fieldType, parameterName) {
        const name = parameterName.toLowerCase();
        switch (fieldType) {
            case client_1.FieldType.password:
                if (name.includes('api') || name.includes('key')) {
                    return 'Your API key for authentication';
                }
                return 'Enter your password';
            case client_1.FieldType.email:
                return 'Enter a valid email address';
            case client_1.FieldType.url:
                return 'Enter a valid URL (e.g., https://api.example.com)';
            case client_1.FieldType.number:
                return 'Enter a numeric value';
            case client_1.FieldType.textarea:
                return 'Enter detailed information';
            case client_1.FieldType.date:
                return 'Select a date';
            default:
                return `Enter the ${parameterName.toLowerCase().replace(/[_-]/g, ' ')} value`;
        }
    }
};
exports.ParameterTypeInferenceService = ParameterTypeInferenceService;
exports.ParameterTypeInferenceService = ParameterTypeInferenceService = __decorate([
    (0, common_1.Injectable)()
], ParameterTypeInferenceService);
//# sourceMappingURL=type-inference.service.js.map