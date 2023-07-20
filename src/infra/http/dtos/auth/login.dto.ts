import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const loginSchema = z.object({
  email: z.string().email('E-mail informado tem formato inválido.'),
  password: z
    .password()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(64, 'A senha deve ter no máximo 64 caracteres.')
    .atLeastOne('digit', 'A senha deve ter no mínimo 1 dígito.')
    .atLeastOne('special', 'A senha deve ter no mínimo 1 caractere especial.')
    .atLeastOne('lowercase', 'A senha deve ter no mínimo 1 letra minúscula.')
    .atLeastOne('uppercase', 'A senha deve ter no mínimo 1 letra maiúscula.')
    .describe(
      'The password should be 8-64 characters long, with at least one digit, special character, uppercase and lowercase character.',
    ),
  kind: z
    .enum(['Admin', 'CommonUser', 'Organization'] as const)
    .describe(
      'The kind is a pre-defined enum, it is either "Admin", "CommonUser" or "Organization".',
    ),
});

export class LoginDto extends createZodDto(loginSchema) {}
