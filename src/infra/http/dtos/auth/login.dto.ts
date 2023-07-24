import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const loginSchema = z.object({
  email: z.string().email('E-mail informado tem formato inválido.'),
  password: z
    .password()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(64, 'A senha deve ter no máximo 64 caracteres.')
    .describe('The password should be 8-64 characters long.'),
  kind: z
    .enum(['CommonUser', 'Organization'] as const)
    .describe(
      'The kind is a pre-defined enum, it is either "CommonUser" or "Organization".',
    ),
});

export class LoginDto extends createZodDto(loginSchema) {}
