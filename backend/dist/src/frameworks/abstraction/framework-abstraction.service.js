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
var FrameworkAbstractionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameworkAbstractionService = void 0;
const common_1 = require("@nestjs/common");
const framework_registry_1 = require("../registry/framework-registry");
let FrameworkAbstractionService = FrameworkAbstractionService_1 = class FrameworkAbstractionService {
    frameworkRegistry;
    logger = new common_1.Logger(FrameworkAbstractionService_1.name);
    constructor(frameworkRegistry) {
        this.frameworkRegistry = frameworkRegistry;
    }
    async validateWorkflow(frameworkType, workflowData) {
        this.frameworkRegistry.validateFrameworkSupport(frameworkType);
        const adapter = this.frameworkRegistry.getAdapter(frameworkType);
        if (!adapter) {
            throw new common_1.NotFoundException(`Framework adapter for ${frameworkType} not found`);
        }
        try {
            return await adapter.validateWorkflow(workflowData);
        }
        catch (error) {
            this.logger.error(`Workflow validation failed for ${frameworkType}:`, error);
            return {
                valid: false,
                errors: [error.message || 'Validation failed'],
            };
        }
    }
    async executeWorkflow(frameworkType, input, context) {
        this.frameworkRegistry.validateFrameworkSupport(frameworkType);
        const adapter = this.frameworkRegistry.getAdapter(frameworkType);
        if (!adapter) {
            throw new common_1.NotFoundException(`Framework adapter for ${frameworkType} not found`);
        }
        this.logger.log(`Executing workflow with ${frameworkType}`, {
            executionId: context.executionId,
            workflowId: context.workflowId,
            agentId: context.agentId,
        });
        try {
            const startTime = Date.now();
            const result = await adapter.executeWorkflow(input.workflowData, input.inputData, context);
            const executionTime = Date.now() - startTime;
            this.logger.log(`Workflow execution completed for ${frameworkType}`, {
                executionId: context.executionId,
                success: result.success,
                executionTime,
            });
            return {
                ...result,
                executionTime,
            };
        }
        catch (error) {
            this.logger.error(`Workflow execution failed for ${frameworkType}:`, {
                executionId: context.executionId,
                error: error.message,
            });
            return {
                success: false,
                output: null,
                executionTime: Date.now() - Date.now(),
                resourceUsage: {
                    cpuTime: 0,
                    memoryPeak: 0,
                },
                steps: [],
                error: {
                    message: error.message || 'Execution failed',
                    code: 'EXECUTION_ERROR',
                    details: error,
                },
            };
        }
    }
    async getExecutionStatus(frameworkType, executionId) {
        this.frameworkRegistry.validateFrameworkSupport(frameworkType);
        const adapter = this.frameworkRegistry.getAdapter(frameworkType);
        if (!adapter) {
            throw new common_1.NotFoundException(`Framework adapter for ${frameworkType} not found`);
        }
        try {
            return await adapter.getExecutionStatus(executionId);
        }
        catch (error) {
            this.logger.error(`Failed to get execution status for ${frameworkType}:`, error);
            throw error;
        }
    }
    async cancelExecution(frameworkType, executionId) {
        this.frameworkRegistry.validateFrameworkSupport(frameworkType);
        const adapter = this.frameworkRegistry.getAdapter(frameworkType);
        if (!adapter) {
            throw new common_1.NotFoundException(`Framework adapter for ${frameworkType} not found`);
        }
        try {
            await adapter.cancelExecution(executionId);
            this.logger.log(`Cancelled execution ${executionId} for ${frameworkType}`);
        }
        catch (error) {
            this.logger.error(`Failed to cancel execution for ${frameworkType}:`, error);
            throw error;
        }
    }
    async getResourceRequirements(frameworkType, workflowData) {
        this.frameworkRegistry.validateFrameworkSupport(frameworkType);
        const adapter = this.frameworkRegistry.getAdapter(frameworkType);
        if (!adapter) {
            throw new common_1.NotFoundException(`Framework adapter for ${frameworkType} not found`);
        }
        try {
            return await adapter.getResourceRequirements(workflowData);
        }
        catch (error) {
            this.logger.error(`Failed to get resource requirements for ${frameworkType}:`, error);
            return {
                cpu: 1,
                memory: 512,
            };
        }
    }
    getSupportedFrameworks() {
        return this.frameworkRegistry.getSupportedFrameworks();
    }
    getFrameworkCapabilities(frameworkType) {
        const metadata = this.frameworkRegistry.getFrameworkMetadata(frameworkType);
        if (!metadata) {
            throw new common_1.NotFoundException(`Framework ${frameworkType} not found`);
        }
        return metadata.capabilities;
    }
    translateError(frameworkType, error) {
        const translations = {
            langgraph: this.translateLangGraphError,
            agno: this.translateAgnoError,
            crewai: this.translateCrewAIError,
            n8n: this.translateN8nError,
        };
        const translator = translations[frameworkType] || this.translateGenericError;
        return translator.call(this, error);
    }
    translateGenericError(error) {
        return {
            message: error.message || 'Unknown error occurred',
            code: 'FRAMEWORK_ERROR',
            frameworkSpecific: error,
        };
    }
    translateLangGraphError(error) {
        if (error.message?.includes('state')) {
            return {
                message: 'Workflow state management error',
                code: 'LANGGRAPH_STATE_ERROR',
                frameworkSpecific: error,
            };
        }
        return this.translateGenericError(error);
    }
    translateAgnoError(error) {
        if (error.message?.includes('instantiation')) {
            return {
                message: 'Agent instantiation failed',
                code: 'AGNO_INSTANTIATION_ERROR',
                frameworkSpecific: error,
            };
        }
        return this.translateGenericError(error);
    }
    translateCrewAIError(error) {
        if (error.message?.includes('coordination')) {
            return {
                message: 'Multi-agent coordination failed',
                code: 'CREWAI_COORDINATION_ERROR',
                frameworkSpecific: error,
            };
        }
        return this.translateGenericError(error);
    }
    translateN8nError(error) {
        if (error.message?.includes('workflow')) {
            return {
                message: 'Workflow validation or execution error',
                code: 'N8N_WORKFLOW_ERROR',
                frameworkSpecific: error,
            };
        }
        return this.translateGenericError(error);
    }
};
exports.FrameworkAbstractionService = FrameworkAbstractionService;
exports.FrameworkAbstractionService = FrameworkAbstractionService = FrameworkAbstractionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [framework_registry_1.FrameworkRegistry])
], FrameworkAbstractionService);
//# sourceMappingURL=framework-abstraction.service.js.map