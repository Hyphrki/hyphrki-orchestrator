import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

export const TRACE_KEY = 'trace';
export const Trace = (name?: string) => SetMetadata(TRACE_KEY, name);

@Injectable()
export class TracingGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const traceName = this.reflector.get<string>(TRACE_KEY, context.getHandler());

    if (traceName) {
      const tracer = trace.getTracer('orchestrator-backend', '1.0.0');
      const span = tracer.startSpan(traceName);

      // Store span in request for later use
      const request = context.switchToHttp().getRequest();
      if (request) {
        (request as any).tracingSpan = span;
      }

      // End span when request finishes
      const response = context.switchToHttp().getResponse();
      if (response) {
        const originalEnd = response.end;
        response.end = function(...args: any[]) {
          span.end();
          originalEnd.apply(this, args);
        };
      }
    }

    return true; // Always allow
  }
}
