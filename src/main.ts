import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // global pipe to validate all incoming requests

  app.useGlobalInterceptors(new TransformInterceptor()); // global interceptor to transform all outgoing responses
  await app.listen(3000);
}
bootstrap();
