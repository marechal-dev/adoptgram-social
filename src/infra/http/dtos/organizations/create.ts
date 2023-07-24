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
    .describe('The desired password should be 8-64 characters long.'),
  title: z.string().min(4).max(120),
  representativeName: z.string().min(2),
  whatsapp: z
    .string()
    .regex(
      /\([0-9]{2}\)\s{1}[\9]{1}[0-9]{4}[-]{1}[0-9]{4}/,
      'Formato do número de WhatsApp inválido',
    )
    .describe(
      'The WhatsApp cellphone is validated against a RegExp to check for a valid brazilian format.',
    ),
  residentialPhone: z
    .string()
    .regex(
      /\([0-9]{2}\)\s{1}[0-9]{4}[-]{1}[0-9]{4}/,
      'Formato do Telefone Residencial inválido',
    )
    .optional()
    .describe(
      'The Residential Phone is validated against a RegExp to check for a valid brazilian format. It is optional.',
    ),
  address: z.object({
    firstLine: z.string().min(2),
    secondLine: z.string().min(2).optional(),
    number: z
      .string()
      .min(1)
      .describe(
        'This field is required to be a string since some places can have a residence number like "123a"',
      ),
    cep: z
      .string()
      .regex(/[0-9]{5}[-]{1}[0-9]{3}/, 'CEP inválido')
      .describe('CEP is validated against a RegExp.'),
    neighborhood: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2),
  }),
  pixKey: z
    .string()
    .min(2)
    .optional()
    .describe(
      'The Pix Key has no RegExp validation since it is a variable field (could be UUID, could be CPF, CNPJ...). It is optional.',
    ),
});

export class CreateOrganizationDto extends createZodDto(
  createOrganizationSchema,
) {}
