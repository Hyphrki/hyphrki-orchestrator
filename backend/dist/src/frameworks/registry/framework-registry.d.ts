import { IFrameworkAdapter, FrameworkType, FrameworkMetadata } from '../types/framework.types';
export declare class FrameworkRegistry {
    private readonly logger;
    private readonly adapters;
    private readonly frameworkMetadata;
    registerAdapter(adapter: IFrameworkAdapter): void;
    unregisterAdapter(frameworkType: FrameworkType): void;
    getAdapter(frameworkType: FrameworkType): IFrameworkAdapter | undefined;
    getAllAdapters(): IFrameworkAdapter[];
    getSupportedFrameworks(): FrameworkType[];
    getFrameworkMetadata(frameworkType: FrameworkType): FrameworkMetadata | undefined;
    getAllFrameworkMetadata(): FrameworkMetadata[];
    isFrameworkSupported(frameworkType: FrameworkType): boolean;
    initializeAllFrameworks(): Promise<void>;
    shutdownAllFrameworks(): Promise<void>;
    validateFrameworkSupport(frameworkType: FrameworkType): void;
}
