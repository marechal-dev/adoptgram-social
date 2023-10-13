import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { env } from '@Configs/env';
import { setupDevelopmentConfigs } from '@Configs/setup-dev';

import { AppModule } from './app.module';
import { ZodValidationExceptionFilter } from './http/exception-filters/zod-validation-exception.filter';

async function bootstrap() {
  const APP_HOST = '0.0.0.0';

  const isDevEnv = env.NODE_ENV === 'development';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new ZodValidationExceptionFilter());

  if (isDevEnv) {
    setupDevelopmentConfigs(app);
  }

  await app.listen(env.PORT, APP_HOST);
}

bootstrap();
