import { ConfigService } from '@nestjs/config';
export declare class EncryptionService {
    private configService;
    private readonly algorithm;
    private readonly keyLength;
    private readonly ivLength;
    private readonly tagLength;
    constructor(configService: ConfigService);
    generateKey(): string;
    private getMasterKey;
    encrypt(plaintext: string): string;
    decrypt(encryptedData: string): string;
    hash(data: string, saltRounds?: number): Promise<string>;
    generateToken(length?: number): string;
    generateSecurePassword(length?: number): string;
    validatePasswordStrength(password: string): {
        valid: boolean;
        errors: string[];
    };
}
