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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TlsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let TlsService = class TlsService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getTlsOptions() {
        const useTls = this.configService.get('USE_TLS') === 'true';
        if (!useTls) {
            return null;
        }
        const certPath = this.configService.get('TLS_CERT_PATH');
        const keyPath = this.configService.get('TLS_KEY_PATH');
        if (!certPath || !keyPath) {
            throw new Error('TLS_CERT_PATH and TLS_KEY_PATH must be configured for TLS');
        }
        if (!fs.existsSync(certPath)) {
            throw new Error(`TLS certificate not found at ${certPath}`);
        }
        if (!fs.existsSync(keyPath)) {
            throw new Error(`TLS private key not found at ${keyPath}`);
        }
        return {
            cert: fs.readFileSync(certPath),
            key: fs.readFileSync(keyPath),
            minVersion: 'TLSv1.2',
            ciphers: [
                'ECDHE-RSA-AES128-GCM-SHA256',
                'ECDHE-RSA-AES256-GCM-SHA384',
                'ECDHE-RSA-AES128-SHA256',
                'ECDHE-RSA-AES256-SHA384',
            ].join(':'),
            secureOptions: require('crypto').constants.SSL_OP_NO_TLSv1 |
                require('crypto').constants.SSL_OP_NO_TLSv1_1,
        };
    }
    generateSelfSignedCert(certDir = './certs') {
        const { execSync } = require('child_process');
        if (!fs.existsSync(certDir)) {
            fs.mkdirSync(certDir, { recursive: true });
        }
        const keyPath = path.join(certDir, 'key.pem');
        const certPath = path.join(certDir, 'cert.pem');
        try {
            execSync(`openssl genrsa -out ${keyPath} 2048`, { stdio: 'inherit' });
            execSync(`openssl req -new -x509 -key ${keyPath} -out ${certPath} -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`, { stdio: 'inherit' });
            console.log('Self-signed certificate generated successfully');
            console.log(`Certificate: ${certPath}`);
            console.log(`Private key: ${keyPath}`);
            return { certPath, keyPath };
        }
        catch (error) {
            console.error('Failed to generate self-signed certificate:', error);
            throw error;
        }
    }
    validateTlsConfig() {
        const errors = [];
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        const useTls = this.configService.get('USE_TLS') === 'true';
        if (isProduction && !useTls) {
            errors.push('TLS must be enabled in production');
        }
        if (useTls) {
            const certPath = this.configService.get('TLS_CERT_PATH');
            const keyPath = this.configService.get('TLS_KEY_PATH');
            if (!certPath) {
                errors.push('TLS_CERT_PATH must be configured when TLS is enabled');
            }
            else if (!fs.existsSync(certPath)) {
                errors.push(`TLS certificate not found at ${certPath}`);
            }
            if (!keyPath) {
                errors.push('TLS_KEY_PATH must be configured when TLS is enabled');
            }
            else if (!fs.existsSync(keyPath)) {
                errors.push(`TLS private key not found at ${keyPath}`);
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    getSecurityHeaders() {
        return {
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'",
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        };
    }
};
exports.TlsService = TlsService;
exports.TlsService = TlsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TlsService);
//# sourceMappingURL=tls.service.js.map