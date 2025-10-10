"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_module_1 = require("../database/database.module");
const encryption_service_1 = require("./encryption/encryption.service");
const tls_service_1 = require("./tls/tls.service");
const database_encryption_service_1 = require("../database/encryption/database-encryption.service");
const authorization_service_1 = require("./authorization/authorization.service");
const authorization_guard_1 = require("./authorization/authorization.guard");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, database_module_1.DatabaseModule],
        providers: [
            encryption_service_1.EncryptionService,
            tls_service_1.TlsService,
            database_encryption_service_1.DatabaseEncryptionService,
            authorization_service_1.AuthorizationService,
            authorization_guard_1.AuthorizationGuard,
        ],
        exports: [
            encryption_service_1.EncryptionService,
            tls_service_1.TlsService,
            database_encryption_service_1.DatabaseEncryptionService,
            authorization_service_1.AuthorizationService,
            authorization_guard_1.AuthorizationGuard,
        ],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map