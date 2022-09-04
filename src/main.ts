import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    // 전역에서 유효성 검사 패키지 활성화
    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix('v1', { exclude: ['graphql'] });

    await app.listen(4000);

    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
