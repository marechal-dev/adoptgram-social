import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createOrganizationSchema = z.object({
  username: z
    .string()
    .min(6, 'Seu nome de usuário deve ter no mínimo 6 caracteres.'),
  email: z.string().email('E-mail informado tem formato inválido.'),
  password: z
    .password()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(64, 'A senha deve ter no máximo 64 caracteres.')
    .describe(
      'The desired password should be 8-64 characters long, with at least one digit, special character, uppercase and lowercase character.',
    ),
  title: z.string().min(4).max(120),
  representativeName: z.string().min(2),
  whatsapp: z
    .string()
    .regex(
      /\([0-9]{2}\)\s{1}[\9]{1}[0-9]{4}[-]{1}[0-9]{4}/,
      'Formato do número de WhatsApp inválido',
    ),
  residentialPhone: z
    .string()
    .regex(
      /\([0-9]{2}\)\s{1}[0-9]{4}[-]{1}[0-9]{4}/,
      'Formato do Telefone Residencial inválido',
    )
    .optional(),
  address: z.object({
    firstLine: z.string(),
    secondLine: z.string().optional(),
    number: z.string(),
    cep: z.string().regex(/[0-9]{5}[-]{1}[0-9]{3}/, 'CEP inválido'),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
  }),
  pixKey: z.string().optional(),
});

export class CreateOrganizationDto extends createZodDto(
  createOrganizationSchema,
) {}
