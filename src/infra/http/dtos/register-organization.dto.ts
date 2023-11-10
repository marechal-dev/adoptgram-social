import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const registerOrganizationSchema = z.object({
  username: z
    .string()
    .min(6, 'Seu nome de usuário deve ter no mínimo 6 caracteres')
    .max(24, 'Seu nome de usuário deve ter no máximo 24 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .password()
    .min(8, 'Sua senha deve ter no mínimo 8 caracteres')
    .max(128, 'Sua senha deve ter no máximo 128 caracteres'),
  title: z
    .string()
    .min(12, 'O nome da Organização deve ter no mínimo 12 caracteres')
    .max(264, 'O nome da Organização deve ter no máximo 264 caracteres'),
  representativeName: z
    .string()
    .min(
      2,
      'O nome do Representante da Organização deve ter no mínimo 2 caraceteres',
    )
    .max(
      64,
      'O nome do Representante da Organização deve ter no máximo 64 caraceteres',
    ),
  cnpj: z
    .string()
    .regex(
      /(?<Subscription>[0-9]{2}.{1}[0-9]{3}.{1}[0-9]{3})\/{1}(?<CompanyTypeIdentifier>0001|0002)-{1}(?<VerifierDigits>[0-9]{2})/,
      'CNPJ com formato inválido',
    ),
  whatsapp: z
    .string()
    .regex(
      /(?<DDD>\([0-9]{2}\)) {1}(?<Number>9{1}[0-9]{4}-{1}[0-9]{4})/,
      'Número de WhatsApp com formato inválido',
    ),
  telephoneNumber: z
    .string()
    .regex(
      /(?<DDD>\([0-9]{2}\)) {1}(?<Number>[0-9]{4}-{1}[0-9]{4})/,
      'Número de Telefone com formato inválido',
    )
    .optional()
    .describe(
      'O número de Telefone é opcional, uma vez que o WhatsApp da Organização já é obrigatório.',
    ),
  pixKey: z
    .string()
    .min(14, 'A Chave Pix deve ter no mínimo 14 caracteres')
    .optional()
    .describe('A Chave Pix é opcional por motivos de LGPD.'),
  city: z.string(),
  state: z.string(),
});

export class RegisterOrganizationDTO extends createZodDto(
  registerOrganizationSchema,
) {}
