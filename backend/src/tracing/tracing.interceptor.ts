import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { trace, Span, SpanStatusCode } from '@opentelemetry/api';

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const tracer = trace.getTracer('orchestrator-backend', '1.0.0');
    const span = tracer.startSpan(`${context.getClass().name}.${context.getHandler().name}`);

    // Add context information to the span
    const request = context.switchToHttp().getRequest();
    if (request) {
      span.setAttribute('http.method', request.method);
      span.setAttribute('http.url', request.url);
      span.setAttribute('http.user_agent', request.get('User-Agent'));

      // Add correlation ID if available
      if (request.correlationId) {
        span.setAttribute('correlation.id', request.correlationId);
      }

      // Add user information if available
      if (request.user) {
        span.setAttribute('user.id', request.user.id);
        span.setAttribute('user.email', request.user.email);
      }
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          span.setStatus({ code: SpanStatusCode.OK });
          span.end();
        },
        error: (error) => {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message,
          });
          span.recordException(error);
          span.end();
        },
      }),
    );
  }
}
