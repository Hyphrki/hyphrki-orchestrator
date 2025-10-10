"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const api_1 = require("@opentelemetry/api");
let TracingInterceptor = class TracingInterceptor {
    intercept(context, next) {
        const tracer = api_1.trace.getTracer('orchestrator-backend', '1.0.0');
        const span = tracer.startSpan(`${context.getClass().name}.${context.getHandler().name}`);
        const request = context.switchToHttp().getRequest();
        if (request) {
            span.setAttribute('http.method', request.method);
            span.setAttribute('http.url', request.url);
            span.setAttribute('http.user_agent', request.get('User-Agent'));
            if (request.correlationId) {
                span.setAttribute('correlation.id', request.correlationId);
            }
            if (request.user) {
                span.setAttribute('user.id', request.user.id);
                span.setAttribute('user.email', request.user.email);
            }
        }
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                span.setStatus({ code: api_1.SpanStatusCode.OK });
                span.end();
            },
            error: (error) => {
                span.setStatus({
                    code: api_1.SpanStatusCode.ERROR,
                    message: error.message,
                });
                span.recordException(error);
                span.end();
            },
        }));
    }
};
exports.TracingInterceptor = TracingInterceptor;
exports.TracingInterceptor = TracingInterceptor = __decorate([
    (0, common_1.Injectable)()
], TracingInterceptor);
//# sourceMappingURL=tracing.interceptor.js.map