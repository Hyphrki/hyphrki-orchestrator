import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export interface LogContext {
    correlationId?: string;
    userId?: string;
    organizationId?: string;
    agentId?: string;
    workflowId?: string;
    executionId?: string;
    [key: string]: any;
}
export declare class LoggingService implements LoggerService {
    private configService;
    private winstonLogger;
    private context;
    constructor(configService: ConfigService);
    private initializeLogger;
    setCorrelationId(correlationId: string): void;
    setUserContext(userId: string, organizationId?: string): void;
    setAgentContext(agentId: string): void;
    setWorkflowContext(workflowId: string): void;
    setExecutionContext(executionId: string): void;
    clearContext(): void;
    getContext(): LogContext;
    private createLogEntry;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug(message: any, ...optionalParams: any[]): void;
    verbose(message: any, ...optionalParams: any[]): void;
    logRequest(method: string, url: string, statusCode: number, responseTime: number, userAgent?: string): void;
    logAuth(event: string, userId?: string, success?: boolean, metadata?: any): void;
    logAgentExecution(agentId: string, executionId: string, status: string, duration?: number, metadata?: any): void;
    logWorkflowExecution(workflowId: string, executionId: string, status: string, duration?: number, metadata?: any): void;
    logSecurity(event: string, severity: 'low' | 'medium' | 'high' | 'critical', metadata?: any): void;
    logPerformance(operation: string, duration: number, metadata?: any): void;
}
