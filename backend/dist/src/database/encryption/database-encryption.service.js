"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseEncryptionService = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../../security/encryption/encryption.service");
let DatabaseEncryptionService = class DatabaseEncryptionService {
    encryptionService;
    encryptedFields = {
        User: ['email', 'firstName', 'lastName'],
        Organization: ['name', 'description'],
        Agent: ['name', 'description', 'config'],
        Workflow: ['name', 'description', 'config'],
        WorkflowExecution: ['inputData', 'outputData'],
    };
    constructor(encryptionService) {
        this.encryptionService = encryptionService;
    }
    encryptData(model, data) {
        if (!data || typeof data !== 'object')
            return data;
        const fields = this.encryptedFields[model];
        if (!fields)
            return data;
        const result = { ...data };
        fields.forEach((field) => {
            if (result[field] !== undefined && typeof result[field] === 'string') {
                result[field] = this.encryptionService.encrypt(result[field]);
            }
        });
        return result;
    }
    decryptData(model, data) {
        if (!data || typeof data !== 'object')
            return data;
        const fields = this.encryptedFields[model];
        if (!fields)
            return data;
        const decryptObject = (obj) => {
            if (!obj || typeof obj !== 'object')
                return obj;
            const result = { ...obj };
            fields.forEach((field) => {
                if (result[field] !== undefined && typeof result[field] === 'string') {
                    try {
                        result[field] = this.encryptionService.decrypt(result[field]);
                    }
                    catch (error) {
                        console.warn(`Failed to decrypt field ${field}:`, error);
                    }
                }
            });
            Object.keys(result).forEach((key) => {
                if (typeof result[key] === 'object' && result[key] !== null) {
                    result[key] = decryptObject(result[key]);
                }
            });
            return result;
        };
        if (Array.isArray(data)) {
            return data.map(decryptObject);
        }
        else {
            return decryptObject(data);
        }
    }
    isEncryptedField(model, field) {
        return this.encryptedFields[model]?.includes(field) ?? false;
    }
    encryptField(model, field, value) {
        if (!this.isEncryptedField(model, field)) {
            throw new Error(`Field ${field} in model ${model} is not configured for encryption`);
        }
        return this.encryptionService.encrypt(value);
    }
    decryptField(model, field, value) {
        if (!this.isEncryptedField(model, field)) {
            throw new Error(`Field ${field} in model ${model} is not configured for encryption`);
        }
        return this.encryptionService.decrypt(value);
    }
    getEncryptionStats() {
        const stats = {
            encryptedModels: Object.keys(this.encryptedFields),
            totalEncryptedFields: Object.values(this.encryptedFields).reduce((sum, fields) => sum + fields.length, 0),
            encryptionEnabled: true,
        };
        return stats;
    }
    validateEncryptionConfig() {
        const errors = [];
        if (!process.env.ENCRYPTION_KEY) {
            errors.push('ENCRYPTION_KEY environment variable is not set');
        }
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
};
exports.DatabaseEncryptionService = DatabaseEncryptionService;
exports.DatabaseEncryptionService = DatabaseEncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [encryption_service_1.EncryptionService])
], DatabaseEncryptionService);
//# sourceMappingURL=database-encryption.service.js.map