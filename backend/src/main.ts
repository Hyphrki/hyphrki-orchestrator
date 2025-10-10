import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TlsService } from './security/tls/tls.service';
import { AuthorizationGuard } from './security/authorization/authorization.guard';
import { LoggingService } from './logging/logging.service';
import { TracingInterceptor } from './tracing/tracing.interceptor';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  console.log('Starting NestJS application...');
  console.log('PORT:', process.env.PORT);
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  console.log('Creating NestJS app...');
  const app = await NestFactory.create(AppModule);
  console.log('NestJS app created successfully');

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  const port = parseInt(process.env.PORT ?? '3000');
  console.log(`Starting server on port ${port}`);
  await app.listen(port);
  console.log(`Application started successfully on port ${port}`);
}
bootstrap();
