import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare const TRACE_KEY = "trace";
export declare const Trace: (name?: string) => import("@nestjs/common").CustomDecorator<string>;
export declare class TracingGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
