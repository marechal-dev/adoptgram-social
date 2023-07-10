import 'dotenv/config';

import { z } from 'zod';

const envSchemaValidator = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'] as const)
    .default('production'),
  PORT: z.coerce.number().default(3000),
  MAILER_EDGE_FUNCTION_URL: z.string().url(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
});

const validation = envSchemaValidator.safeParse(process.env);

if (!validation.success) {
  console.error('Incorrect env variables');
  process.exit(1);
}

const env = validation.data;

export default env;
