import 'dotenv/config';

import { z } from 'zod';

const envSchemaValidator = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'] as const)
    .default('production'),
  PORT: z.coerce.number().default(3000),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
});

const validation = envSchemaValidator.safeParse(process.env);

if (!validation.success) {
  throw new Error(`Incorrect Environment Variables\n${process.env}`);
}

export const env = validation.data;
