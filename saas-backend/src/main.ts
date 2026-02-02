import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
  });

  await app.listen(3001, '0.0.0.0');  // ← This forces IPv4 binding
  console.log('🚀 Backend running on http://0.0.0.0:3001');
  console.log('🚀 Also accessible on http://localhost:3001');
  console.log('🚀 Also accessible on http://127.0.0.1:3001');
}
bootstrap();