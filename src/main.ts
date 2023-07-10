import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import env from '@Configs/env';
import corsOptions from '@Configs/cors';

import { AppModule } from './app.module';
import { setupDevelopmentConfigs } from '@Configs/setup-dev';

const APP_HOST = '0.0.0.0';

async function bootstrap() {
  const isDevEnv = env.NODE_ENV === 'development';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: isDevEnv ? true : false,
    }),
  );

  app.enableCors(corsOptions);

  app.setGlobalPrefix('api');

  if (isDevEnv) {
    setupDevelopmentConfigs(app);
  }

  await app.listen(env.PORT, APP_HOST);
}

bootstrap();
