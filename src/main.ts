import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ); // global pipe to validate all incoming requests

  app.useGlobalInterceptors(new TransformInterceptor()); // global interceptor to transform all outgoing responses

  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Taskly Nest.js App')
    .setDescription(
      `Nest.js app that exposes REST APIs for managing user's tasks.`,
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
