import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const method = req.method;
    const route = req.route?.path || req.path || '/unknown';

    // Increment in-flight requests
    this.metricsService.setHttpRequestsInFlight(method, 1);

    // Track response
    res.on('finish', () => {
      const duration = (Date.now() - startTime) / 1000; // Convert to seconds
      const statusCode = res.statusCode.toString();

      // Record metrics
      this.metricsService.incrementHttpRequests(method, route, statusCode);
      this.metricsService.recordHttpRequestDuration(method, route, statusCode, duration);

      // Decrement in-flight requests
      this.metricsService.setHttpRequestsInFlight(method, -1);
    });

    next();
  }
}
