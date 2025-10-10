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
exports.TracingService = void 0;
const common_1 = require("@nestjs/common");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_jaeger_1 = require("@opentelemetry/exporter-jaeger");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const config_1 = require("@nestjs/config");
let TracingService = class TracingService {
    configService;
    sdk;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        await this.initializeTracing();
    }
    async initializeTracing() {
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        const jaegerEndpoint = this.configService.get('JAEGER_ENDPOINT') || 'http://localhost:14268/api/traces';
        if (!isProduction && !this.configService.get('ENABLE_TRACING')) {
            console.log('Tracing disabled in development. Set ENABLE_TRACING=true to enable.');
            return;
        }
        const exporter = new exporter_jaeger_1.JaegerExporter({
            endpoint: jaegerEndpoint,
        });
        this.sdk = new sdk_node_1.NodeSDK({
            serviceName: 'orchestrator-backend',
            traceExporter: exporter,
            instrumentations: [
                (0, auto_instrumentations_node_1.getNodeAutoInstrumentations)({
                    '@opentelemetry/instrumentation-fs': {
                        enabled: !isProduction,
                    },
                    '@opentelemetry/instrumentation-http': {
                        enabled: true,
                    },
                    '@opentelemetry/instrumentation-pg': {
                        enabled: true,
                    },
                    '@opentelemetry/instrumentation-redis': {
                        enabled: true,
                    },
                }),
            ],
        });
        try {
            await this.sdk.start();
            console.log('OpenTelemetry tracing initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize OpenTelemetry tracing:', error);
        }
    }
    async onModuleDestroy() {
        if (this.sdk) {
            await this.sdk.shutdown();
        }
    }
};
exports.TracingService = TracingService;
exports.TracingService = TracingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TracingService);
//# sourceMappingURL=tracing.service.js.map