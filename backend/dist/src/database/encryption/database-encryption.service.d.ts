import { EncryptionService } from '../../security/encryption/encryption.service';
export declare class DatabaseEncryptionService {
    private encryptionService;
    private readonly encryptedFields;
    constructor(encryptionService: EncryptionService);
    encryptData(model: string, data: any): any;
    decryptData(model: string, data: any): any;
    isEncryptedField(model: string, field: string): boolean;
    encryptField(model: string, field: string, value: string): string;
    decryptField(model: string, field: string, value: string): string;
    getEncryptionStats(): {
        encryptedModels: string[];
        totalEncryptedFields: number;
        encryptionEnabled: boolean;
    };
    validateEncryptionConfig(): {
        valid: boolean;
        errors: string[];
    };
}
