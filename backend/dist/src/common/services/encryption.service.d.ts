import { ConfigService } from '@nestjs/config';
export declare class EncryptionService {
    private configService;
    private readonly logger;
    private readonly algorithm;
    private readonly key;
    private readonly ivLength;
    constructor(configService: ConfigService);
    encrypt(text: string): string;
    decrypt(encryptedText: string): string;
    isEncrypted(text: string): boolean;
    encryptSensitiveValues(obj: Record<string, any>, sensitiveKeys: string[]): Record<string, any>;
    decryptEncryptedValues(obj: Record<string, any>): Record<string, any>;
    generateSecureRandom(length?: number): string;
    hash(text: string, algorithm?: string): string;
    verifyHash(text: string, hash: string, algorithm?: string): boolean;
}
