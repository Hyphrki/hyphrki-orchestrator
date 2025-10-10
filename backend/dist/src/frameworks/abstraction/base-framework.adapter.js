"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFrameworkAdapter = void 0;
const common_1 = require("@nestjs/common");
class BaseFrameworkAdapter {
    frameworkType;
    metadata;
    logger;
    constructor(frameworkType, metadata) {
        this.frameworkType = frameworkType;
        this.metadata = metadata;
        this.logger = new common_1.Logger(`${this.constructor.name}(${frameworkType})`);
    }
    createErrorResult(message, code, executionTime = 0) {
        return {
            success: false,
            output: null,
            executionTime,
            resourceUsage: {
                cpuTime: 0,
                memoryPeak: 0,
            },
            steps: [],
            error: {
                message,
                code,
            },
        };
    }
    createSuccessResult(output, executionTime, steps, resourceUsage) {
        return {
            success: true,
            output,
            executionTime,
            resourceUsage,
            steps,
        };
    }
    validateRequiredFields(workflowData, requiredFields) {
        const errors = [];
        for (const field of requiredFields) {
            if (!workflowData || !(field in workflowData)) {
                errors.push(`Missing required field: ${field}`);
            }
        }
        return errors;
    }
    validateWorkflowStructure(workflowData) {
        const errors = [];
        if (!workflowData) {
            errors.push('Workflow data is required');
            return { valid: false, errors };
        }
        if (typeof workflowData !== 'object') {
            errors.push('Workflow data must be an object');
            return { valid: false, errors };
        }
        return { valid: errors.length === 0, errors };
    }
    async executeWithTimeout(operation, timeoutMs, executionId) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error(`Execution timeout after ${timeoutMs}ms`));
            }, timeoutMs);
            operation()
                .then((result) => {
                clearTimeout(timeout);
                resolve(result);
            })
                .catch((error) => {
                clearTimeout(timeout);
                reject(error);
            });
        });
    }
    logExecutionStart(context) {
        this.logger.log(`Starting execution ${context.executionId}`, {
            workflowId: context.workflowId,
            agentId: context.agentId,
            correlationId: context.correlationId,
        });
    }
    logExecutionComplete(context, success, executionTime) {
        this.logger.log(`Completed execution ${context.executionId}`, {
            success,
            executionTime,
            correlationId: context.correlationId,
        });
    }
    logExecutionError(context, error) {
        this.logger.error(`Execution ${context.executionId} failed`, {
            error: error.message,
            correlationId: context.correlationId,
            stack: error.stack,
        });
    }
}
exports.BaseFrameworkAdapter = BaseFrameworkAdapter;
//# sourceMappingURL=base-framework.adapter.js.map