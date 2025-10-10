import { Module, Global } from '@nestjs/common';
import { TracingService } from './tracing.service';
import { TracingInterceptor } from './tracing.interceptor';
import { TracingGuard } from './tracing.guard';

@Global()
@Module({
  providers: [TracingService, TracingInterceptor, TracingGuard],
  exports: [TracingService, TracingInterceptor, TracingGuard],
})
export class TracingModule {}
