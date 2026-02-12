import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    await app.listen(5001);
}

bootstrap().catch((error) => {
    console.error(error); // eslint-disable-line
    process.exit(1);
});
