import { Injectable, Logger } from '@nestjs/common';
import {
  IFrameworkAdapter,
  FrameworkType,
  FrameworkMetadata,
} from '../types/framework.types';

@Injectable()
export class FrameworkRegistry {
  private readonly logger = new Logger(FrameworkRegistry.name);
  private readonly adapters = new Map<FrameworkType, IFrameworkAdapter>();
  private readonly frameworkMetadata = new Map<
    FrameworkType,
    FrameworkMetadata
  >();

  registerAdapter(adapter: IFrameworkAdapter): void {
    if (this.adapters.has(adapter.frameworkType)) {
      throw new Error(
        `Framework adapter for ${adapter.frameworkType} is already registered`,
      );
    }

    this.adapters.set(adapter.frameworkType, adapter);
    this.frameworkMetadata.set(adapter.frameworkType, adapter.metadata);
    this.logger.log(`Registered framework adapter: ${adapter.frameworkType}`);
  }

  unregisterAdapter(frameworkType: FrameworkType): void {
    if (!this.adapters.has(frameworkType)) {
      this.logger.warn(
        `Framework adapter for ${frameworkType} is not registered`,
      );
      return;
    }

    this.adapters.delete(frameworkType);
    this.frameworkMetadata.delete(frameworkType);
    this.logger.log(`Unregistered framework adapter: ${frameworkType}`);
  }

  getAdapter(frameworkType: FrameworkType): IFrameworkAdapter | undefined {
    return this.adapters.get(frameworkType);
  }

  getAllAdapters(): IFrameworkAdapter[] {
    return Array.from(this.adapters.values());
  }

  getSupportedFrameworks(): FrameworkType[] {
    return Array.from(this.adapters.keys());
  }

  getFrameworkMetadata(
    frameworkType: FrameworkType,
  ): FrameworkMetadata | undefined {
    return this.frameworkMetadata.get(frameworkType);
  }

  getAllFrameworkMetadata(): FrameworkMetadata[] {
    return Array.from(this.frameworkMetadata.values());
  }

  isFrameworkSupported(frameworkType: FrameworkType): boolean {
    return this.adapters.has(frameworkType);
  }

  async initializeAllFrameworks(): Promise<void> {
    const initPromises = Array.from(this.adapters.values()).map(
      async (adapter) => {
        try {
          await adapter.initialize({});
          this.logger.log(`Initialized framework: ${adapter.frameworkType}`);
        } catch (error) {
          this.logger.error(
            `Failed to initialize framework ${adapter.frameworkType}:`,
            error,
          );
          throw error;
        }
      },
    );

    await Promise.all(initPromises);
  }

  async shutdownAllFrameworks(): Promise<void> {
    const shutdownPromises = Array.from(this.adapters.values()).map(
      async (adapter) => {
        try {
          await adapter.shutdown();
          this.logger.log(`Shutdown framework: ${adapter.frameworkType}`);
        } catch (error) {
          this.logger.error(
            `Failed to shutdown framework ${adapter.frameworkType}:`,
            error,
          );
        }
      },
    );

    await Promise.all(shutdownPromises);
  }

  validateFrameworkSupport(frameworkType: FrameworkType): void {
    if (!this.isFrameworkSupported(frameworkType)) {
      throw new Error(
        `Framework ${frameworkType} is not supported or registered`,
      );
    }
  }
}
