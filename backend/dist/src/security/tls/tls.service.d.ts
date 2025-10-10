import { ConfigService } from '@nestjs/config';
export declare class TlsService {
    private configService;
    constructor(configService: ConfigService);
    getTlsOptions(): {
        cert: NonSharedBuffer;
        key: NonSharedBuffer;
        minVersion: string;
        ciphers: string;
        secureOptions: number;
    } | null;
    generateSelfSignedCert(certDir?: string): {
        certPath: string;
        keyPath: string;
    };
    validateTlsConfig(): {
        valid: boolean;
        errors: string[];
    };
    getSecurityHeaders(): {
        'Strict-Transport-Security': string;
        'X-Content-Type-Options': string;
        'X-Frame-Options': string;
        'X-XSS-Protection': string;
        'Referrer-Policy': string;
        'Content-Security-Policy': string;
        'Permissions-Policy': string;
    };
}
