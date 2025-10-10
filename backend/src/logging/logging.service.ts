import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as winston from 'winston';
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

@Injectable()
export class LoggingService implements LoggerService {
  private winstonLogger: winston.Logger;
  private context: LogContext = {};

  constructor(private configService: ConfigService) {
    this.initializeLogger();
  }

  private initializeLogger() {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const logLevel = this.configService.get<string>('LOG_LEVEL') || 'info';

    const transports: winston.transport[] = [
      // Console transport
      new winston.transports.Console({
        level: logLevel,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json(),
        ),
      }),
    ];

    // Add file transport for production
    if (isProduction) {
      transports.push(
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
      );
    }

    this.winstonLogger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: { service: 'orchestrator' },
      transports,
    });
  }


  /**
   * Set correlation ID for current request
   */
  setCorrelationId(correlationId: string) {
    this.context.correlationId = correlationId;
  }

  /**
   * Set user context
   */
  setUserContext(userId: string, organizationId?: string) {
    this.context.userId = userId;
    if (organizationId) {
      this.context.organizationId = organizationId;
    }
  }

  /**
   * Set agent context
   */
  setAgentContext(agentId: string) {
    this.context.agentId = agentId;
  }

  /**
   * Set workflow context
   */
  setWorkflowContext(workflowId: string) {
    this.context.workflowId = workflowId;
  }

  /**
   * Set execution context
   */
  setExecutionContext(executionId: string) {
    this.context.executionId = executionId;
  }

  /**
   * Clear context
   */
  clearContext() {
    this.context = {};
  }

  /**
   * Get current context
   */
  getContext(): LogContext {
    return { ...this.context };
  }

  /**
   * Create log entry with context and sensitive data filtering
   */
  private createLogEntry(level: string, message: any, meta?: any) {
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

    const filterObject = (obj: any): any => {
      if (!obj || typeof obj !== 'object') return obj;

      const filtered = { ...obj };
      for (const key of Object.keys(filtered)) {
        if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
          filtered[key] = '[FILTERED]';
        } else if (typeof filtered[key] === 'object') {
          filtered[key] = filterObject(filtered[key]);
        }
      }
      return filtered;
    };

    // Ensure message is always a string
    let messageStr: string;
    if (typeof message === 'string') {
      messageStr = message;
    } else if (typeof message === 'object' && message !== null) {
      // For objects, stringify them to avoid Winston expanding them
      messageStr = JSON.stringify(filterObject(message));
    } else {
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

  log(message: any, ...optionalParams: any[]) {
    this.winstonLogger.info(this.createLogEntry('info', message, optionalParams[0]));
  }

  error(message: any, ...optionalParams: any[]) {
    this.winstonLogger.error(this.createLogEntry('error', message, optionalParams[0]));
  }

  warn(message: any, ...optionalParams: any[]) {
    this.winstonLogger.warn(this.createLogEntry('warn', message, optionalParams[0]));
  }

  debug(message: any, ...optionalParams: any[]) {
    this.winstonLogger.debug(this.createLogEntry('debug', message, optionalParams[0]));
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.winstonLogger.verbose(this.createLogEntry('verbose', message, optionalParams[0]));
  }

  /**
   * Log HTTP requests
   */
  logRequest(method: string, url: string, statusCode: number, responseTime: number, userAgent?: string) {
    this.winstonLogger.info(this.createLogEntry('info', 'HTTP Request', {
      method,
      url,
      statusCode,
      responseTime: `${responseTime}ms`,
      userAgent,
      type: 'http_request',
    }));
  }

  /**
   * Log authentication events
   */
  logAuth(event: string, userId?: string, success: boolean = true, metadata?: any) {
    this.winstonLogger.info(this.createLogEntry('info', `Auth ${event}`, {
      userId,
      success,
      type: 'auth',
      ...metadata,
    }));
  }

  /**
   * Log agent execution events
   */
  logAgentExecution(agentId: string, executionId: string, status: string, duration?: number, metadata?: any) {
    this.winstonLogger.info(this.createLogEntry('info', 'Agent Execution', {
      agentId,
      executionId,
      status,
      duration: duration ? `${duration}ms` : undefined,
      type: 'agent_execution',
      ...metadata,
    }));
  }

  /**
   * Log workflow execution events
   */
  logWorkflowExecution(workflowId: string, executionId: string, status: string, duration?: number, metadata?: any) {
    this.winstonLogger.info(this.createLogEntry('info', 'Workflow Execution', {
      workflowId,
      executionId,
      status,
      duration: duration ? `${duration}ms` : undefined,
      type: 'workflow_execution',
      ...metadata,
    }));
  }

  /**
   * Log security events
   */
  logSecurity(event: string, severity: 'low' | 'medium' | 'high' | 'critical', metadata?: any) {
    const level = severity === 'critical' || severity === 'high' ? 'error' : 'warn';
    this.winstonLogger.log(level, this.createLogEntry(level, `Security ${event}`, {
      severity,
      type: 'security',
      ...metadata,
    }));
  }

  /**
   * Log performance metrics
   */
  logPerformance(operation: string, duration: number, metadata?: any) {
    this.winstonLogger.info(this.createLogEntry('info', 'Performance', {
      operation,
      duration: `${duration}ms`,
      type: 'performance',
      ...metadata,
    }));
  }
}
