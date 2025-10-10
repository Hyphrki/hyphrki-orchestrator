"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FrameworkRegistry_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameworkRegistry = void 0;
const common_1 = require("@nestjs/common");
let FrameworkRegistry = FrameworkRegistry_1 = class FrameworkRegistry {
    logger = new common_1.Logger(FrameworkRegistry_1.name);
    adapters = new Map();
    frameworkMetadata = new Map();
    registerAdapter(adapter) {
        if (this.adapters.has(adapter.frameworkType)) {
            throw new Error(`Framework adapter for ${adapter.frameworkType} is already registered`);
        }
        this.adapters.set(adapter.frameworkType, adapter);
        this.frameworkMetadata.set(adapter.frameworkType, adapter.metadata);
        this.logger.log(`Registered framework adapter: ${adapter.frameworkType}`);
    }
    unregisterAdapter(frameworkType) {
        if (!this.adapters.has(frameworkType)) {
            this.logger.warn(`Framework adapter for ${frameworkType} is not registered`);
            return;
        }
        this.adapters.delete(frameworkType);
        this.frameworkMetadata.delete(frameworkType);
        this.logger.log(`Unregistered framework adapter: ${frameworkType}`);
    }
    getAdapter(frameworkType) {
        return this.adapters.get(frameworkType);
    }
    getAllAdapters() {
        return Array.from(this.adapters.values());
    }
    getSupportedFrameworks() {
        return Array.from(this.adapters.keys());
    }
    getFrameworkMetadata(frameworkType) {
        return this.frameworkMetadata.get(frameworkType);
    }
    getAllFrameworkMetadata() {
        return Array.from(this.frameworkMetadata.values());
    }
    isFrameworkSupported(frameworkType) {
        return this.adapters.has(frameworkType);
    }
    async initializeAllFrameworks() {
        const initPromises = Array.from(this.adapters.values()).map(async (adapter) => {
            try {
                await adapter.initialize({});
                this.logger.log(`Initialized framework: ${adapter.frameworkType}`);
            }
            catch (error) {
                this.logger.error(`Failed to initialize framework ${adapter.frameworkType}:`, error);
                throw error;
            }
        });
        await Promise.all(initPromises);
    }
    async shutdownAllFrameworks() {
        const shutdownPromises = Array.from(this.adapters.values()).map(async (adapter) => {
            try {
                await adapter.shutdown();
                this.logger.log(`Shutdown framework: ${adapter.frameworkType}`);
            }
            catch (error) {
                this.logger.error(`Failed to shutdown framework ${adapter.frameworkType}:`, error);
            }
        });
        await Promise.all(shutdownPromises);
    }
    validateFrameworkSupport(frameworkType) {
        if (!this.isFrameworkSupported(frameworkType)) {
            throw new Error(`Framework ${frameworkType} is not supported or registered`);
        }
    }
};
exports.FrameworkRegistry = FrameworkRegistry;
exports.FrameworkRegistry = FrameworkRegistry = FrameworkRegistry_1 = __decorate([
    (0, common_1.Injectable)()
], FrameworkRegistry);
//# sourceMappingURL=framework-registry.js.map