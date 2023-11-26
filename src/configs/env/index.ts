import 'dotenv/config';

import { z } from 'zod';

export const envSchemaValidator = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'] as const)
    .default('production'),
  PORT: z.coerce.number().default(3000),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  REDIS_HOST: z.string().ip().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_DB: z.coerce.number().default(0),
});

const validation = envSchemaValidator.safeParse(process.env);

if (!validation.success) {
  throw new Error(`Incorrect Environment Variables\n${process.env}`);
}

export const env = validation.data;
