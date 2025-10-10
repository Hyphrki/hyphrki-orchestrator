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
exports.LoggingService = void 0;
const common_1 = require("@nestjs/common");
const winston = __importStar(require("winston"));
const config_1 = require("@nestjs/config");
let LoggingService = class LoggingService {
    configService;
    winstonLogger;
    context = {};
    constructor(configService) {
        this.configService = configService;
        this.initializeLogger();
    }
    initializeLogger() {
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        const logLevel = this.configService.get('LOG_LEVEL') || 'info';
        const transports = [
            new winston.transports.Console({
                level: logLevel,
                format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
            }),
        ];
        if (isProduction) {
            transports.push(new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
                format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
            }), new winston.transports.File({
                filename: 'logs/combined.log',
                format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
            }));
        }
        this.winstonLogger = winston.createLogger({
            level: logLevel,
            format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
            defaultMeta: { service: 'orchestrator' },
            transports,
        });
    }
    setCorrelationId(correlationId) {
        this.context.correlationId = correlationId;
    }
    setUserContext(userId, organizationId) {
        this.context.userId = userId;
        if (organizationId) {
            this.context.organizationId = organizationId;
        }
    }
    setAgentContext(agentId) {
        this.context.agentId = agentId;
    }
    setWorkflowContext(workflowId) {
        this.context.workflowId = workflowId;
    }
    setExecutionContext(executionId) {
        this.context.executionId = executionId;
    }
    clearContext() {
        this.context = {};
    }
    getContext() {
        return { ...this.context };
    }
    createLogEntry(level, message, meta) {
        const sensitiveKeys = [
            'password',
            'passwordHash',
            'token',
            'access_token',
            'refresh_token',
            'secret',
            'key',
            'api_key',
            'encryption_key',
            'jwt_secret',
            'database_url',
            'redis_url',
        ];
        const filterObject = (obj) => {
            if (!obj || typeof obj !== 'object')
                return obj;
            const filtered = { ...obj };
            for (const key of Object.keys(filtered)) {
                if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
                    filtered[key] = '[FILTERED]';
                }
                else if (typeof filtered[key] === 'object') {
                    filtered[key] = filterObject(filtered[key]);
                }
            }
            return filtered;
        };
        let messageStr;
        if (typeof message === 'string') {
            messageStr = message;
        }
        else if (typeof message === 'object' && message !== null) {
            messageStr = JSON.stringify(filterObject(message));
        }
        else {
            messageStr = String(message);
        }
        const logEntry = {
            level,
            message: messageStr,
            ...this.context,
            ...filterObject(meta || {}),
        };
        return logEntry;
    }
    log(message, ...optionalParams) {
        this.winstonLogger.info(this.createLogEntry('info', message, optionalParams[0]));
    }
    error(message, ...optionalParams) {
        this.winstonLogger.error(this.createLogEntry('error', message, optionalParams[0]));
    }
    warn(message, ...optionalParams) {
        this.winstonLogger.warn(this.createLogEntry('warn', message, optionalParams[0]));
    }
    debug(message, ...optionalParams) {
        this.winstonLogger.debug(this.createLogEntry('debug', message, optionalParams[0]));
    }
    verbose(message, ...optionalParams) {
        this.winstonLogger.verbose(this.createLogEntry('verbose', message, optionalParams[0]));
    }
    logRequest(method, url, statusCode, responseTime, userAgent) {
        this.winstonLogger.info(this.createLogEntry('info', 'HTTP Request', {
            method,
            url,
            statusCode,
            responseTime: `${responseTime}ms`,
            userAgent,
            type: 'http_request',
        }));
    }
    logAuth(event, userId, success = true, metadata) {
        this.winstonLogger.info(this.createLogEntry('info', `Auth ${event}`, {
            userId,
            success,
            type: 'auth',
            ...metadata,
        }));
    }
    logAgentExecution(agentId, executionId, status, duration, metadata) {
        this.winstonLogger.info(this.createLogEntry('info', 'Agent Execution', {
            agentId,
            executionId,
            status,
            duration: duration ? `${duration}ms` : undefined,
            type: 'agent_execution',
            ...metadata,
        }));
    }
    logWorkflowExecution(workflowId, executionId, status, duration, metadata) {
        this.winstonLogger.info(this.createLogEntry('info', 'Workflow Execution', {
            workflowId,
            executionId,
            status,
            duration: duration ? `${duration}ms` : undefined,
            type: 'workflow_execution',
            ...metadata,
        }));
    }
    logSecurity(event, severity, metadata) {
        const level = severity === 'critical' || severity === 'high' ? 'error' : 'warn';
        this.winstonLogger.log(level, this.createLogEntry(level, `Security ${event}`, {
            severity,
            type: 'security',
            ...metadata,
        }));
    }
    logPerformance(operation, duration, metadata) {
        this.winstonLogger.info(this.createLogEntry('info', 'Performance', {
            operation,
            duration: `${duration}ms`,
            type: 'performance',
            ...metadata,
        }));
    }
};
exports.LoggingService = LoggingService;
exports.LoggingService = LoggingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggingService);
//# sourceMappingURL=logging.service.js.map