import { Injectable, OnModuleInit } from '@nestjs/common';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TracingService implements OnModuleInit {
  private sdk: NodeSDK;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeTracing();
  }

  private async initializeTracing() {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const jaegerEndpoint = this.configService.get<string>('JAEGER_ENDPOINT') || 'http://localhost:14268/api/traces';

    if (!isProduction && !this.configService.get<string>('ENABLE_TRACING')) {
      console.log('Tracing disabled in development. Set ENABLE_TRACING=true to enable.');
      return;
    }

    // Configure Jaeger exporter
    const exporter = new JaegerExporter({
      endpoint: jaegerEndpoint,
    });

    // Initialize the SDK
    this.sdk = new NodeSDK({
      serviceName: 'orchestrator-backend',
      traceExporter: exporter,
      instrumentations: [
        getNodeAutoInstrumentations({
          // Disable file system instrumentation in production for performance
          '@opentelemetry/instrumentation-fs': {
            enabled: !isProduction,
          },
          // Configure HTTP instrumentation
          '@opentelemetry/instrumentation-http': {
            enabled: true,
          },
          // Configure database instrumentation
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
    } catch (error) {
      console.error('Failed to initialize OpenTelemetry tracing:', error);
    }
  }

  async onModuleDestroy() {
    if (this.sdk) {
      await this.sdk.shutdown();
    }
  }
}
