import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import fastifyCompress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';

import env from '@Configs/env';
import { corsOptions } from '@Configs/cors';
import { compressionConfigs } from '@Configs/compression';
import { cookieConfigs } from '@Configs/cookies';
import { setupDevelopmentConfigs } from '@Configs/setup-dev';

import { AppModule } from './app.module';

const APP_HOST = '0.0.0.0';

async function bootstrap() {
  const isDevEnv = env.NODE_ENV === 'development';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await Promise.all([
    app.register(fastifyCompress, compressionConfigs),
    app.register(fastifyCookie, cookieConfigs),
    app.register(fastifyHelmet),
  ]);

  app.enableCors(corsOptions);

  app.setGlobalPrefix('api');

  if (isDevEnv) {
    setupDevelopmentConfigs(app);
  }

  await app.listen(env.PORT, APP_HOST);
}

bootstrap();
