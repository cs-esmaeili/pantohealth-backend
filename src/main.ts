import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      // فقط فیلدهای تعریف‌شده رو قبول کن
    forbidNonWhitelisted: true, // فیلد اضافی بده → خطا
    transform: true,      // تبدیل نوع‌ها به صورت خودکار
  }));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
