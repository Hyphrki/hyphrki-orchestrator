"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EncryptionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = __importStar(require("crypto"));
let EncryptionService = EncryptionService_1 = class EncryptionService {
    configService;
    logger = new common_1.Logger(EncryptionService_1.name);
    algorithm = 'aes-256-gcm';
    key;
    ivLength = 16;
    constructor(configService) {
        this.configService = configService;
        const encryptionKey = this.configService.get('ENCRYPTION_KEY');
        if (!encryptionKey) {
            throw new Error('ENCRYPTION_KEY environment variable is required');
        }
        this.key = crypto.scryptSync(encryptionKey, 'salt', 32);
        this.logger.log('EncryptionService initialized');
    }
    encrypt(text) {
        try {
            const iv = crypto.randomBytes(this.ivLength);
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            const authTag = cipher.getAuthTag();
            const combined = iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
            return `encrypted:${Buffer.from(combined).toString('base64')}`;
        }
        catch (error) {
            this.logger.error('Encryption failed:', error);
            throw new Error('Failed to encrypt data');
        }
    }
    decrypt(encryptedText) {
        try {
            if (!encryptedText.startsWith('encrypted:')) {
                throw new Error('Invalid encrypted data format');
            }
            const base64Data = encryptedText.substring(10);
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
        }
        catch (error) {
            this.logger.error('Decryption failed:', error);
            throw new Error('Failed to decrypt data');
        }
    }
    isEncrypted(text) {
        return text.startsWith('encrypted:');
    }
    encryptSensitiveValues(obj, sensitiveKeys) {
        const encrypted = { ...obj };
        for (const key of sensitiveKeys) {
            if (encrypted[key] && typeof encrypted[key] === 'string' && !this.isEncrypted(encrypted[key])) {
                encrypted[key] = this.encrypt(encrypted[key]);
            }
        }
        return encrypted;
    }
    decryptEncryptedValues(obj) {
        const decrypted = { ...obj };
        for (const [key, value] of Object.entries(decrypted)) {
            if (typeof value === 'string' && this.isEncrypted(value)) {
                try {
                    decrypted[key] = this.decrypt(value);
                }
                catch (error) {
                    this.logger.warn(`Failed to decrypt value for key ${key}:`, error);
                }
            }
        }
        return decrypted;
    }
    generateSecureRandom(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
    hash(text, algorithm = 'sha256') {
        return crypto.createHash(algorithm).update(text).digest('hex');
    }
    verifyHash(text, hash, algorithm = 'sha256') {
        const computedHash = this.hash(text, algorithm);
        return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(computedHash));
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = EncryptionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map