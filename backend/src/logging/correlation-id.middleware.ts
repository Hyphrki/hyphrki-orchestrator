import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LoggingService } from './logging.service';

// Extend Express Request to include correlationId
declare global {
  namespace Express {
    interface Request {
      correlationId: string;
    }
  }
}

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Generate or extract correlation ID
    const correlationId = req.headers['x-correlation-id'] as string ||
                         req.headers['x-request-id'] as string ||
                         uuidv4();

    // Set correlation ID on request object
    req.correlationId = correlationId;

    // Set correlation ID in logging context
    this.loggingService.setCorrelationId(correlationId);

    // Add correlation ID to response headers
    res.setHeader('x-correlation-id', correlationId);

    // Log the incoming request
    const startTime = Date.now();
    const userAgent = req.get('User-Agent');

    this.loggingService.logRequest(
      req.method,
      req.url,
      0, // Status code will be logged in finish event
      0, // Duration will be calculated in finish event
      userAgent
    );

    // Log response when request finishes
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      this.loggingService.logRequest(
        req.method,
        req.url,
        res.statusCode,
        duration,
        userAgent
      );
    });

    next();
  }
}
