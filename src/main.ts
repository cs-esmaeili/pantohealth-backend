import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  if (process.env.NODE_ENV !== 'production') {
    
    const config = new DocumentBuilder()
      .setTitle('PANTOhealth IoT API')
      .setDescription('IoT X-ray signals with RabbitMQ & MongoDB')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }
  await app.listen(3001);
  console.log('Swagger UI -> http://localhost:3001/api');
  console.log('OpenAPI JSON -> http://localhost:3001/api-json');
}
bootstrap();
