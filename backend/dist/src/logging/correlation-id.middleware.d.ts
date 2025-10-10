import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';
declare global {
    namespace Express {
        interface Request {
            correlationId: string;
        }
    }
}
export declare class CorrelationIdMiddleware implements NestMiddleware {
    private loggingService;
    constructor(loggingService: LoggingService);
    use(req: Request, res: Response, next: NextFunction): void;
}
