"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingGuard = exports.Trace = exports.TRACE_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const api_1 = require("@opentelemetry/api");
exports.TRACE_KEY = 'trace';
const Trace = (name) => (0, common_2.SetMetadata)(exports.TRACE_KEY, name);
exports.Trace = Trace;
let TracingGuard = class TracingGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const traceName = this.reflector.get(exports.TRACE_KEY, context.getHandler());
        if (traceName) {
            const tracer = api_1.trace.getTracer('orchestrator-backend', '1.0.0');
            const span = tracer.startSpan(traceName);
            const request = context.switchToHttp().getRequest();
            if (request) {
                request.tracingSpan = span;
            }
            const response = context.switchToHttp().getResponse();
            if (response) {
                const originalEnd = response.end;
                response.end = function (...args) {
                    span.end();
                    originalEnd.apply(this, args);
                };
            }
        }
        return true;
    }
};
exports.TracingGuard = TracingGuard;
exports.TracingGuard = TracingGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], TracingGuard);
//# sourceMappingURL=tracing.guard.js.map