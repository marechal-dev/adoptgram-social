import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'A senha não pode ter menos de 8 caracteres')
    .max(128, 'A senha não pode ter mais de 128 caracteres'),
});

export class AuthenticateDTO extends createZodDto(authenticateSchema) {}
