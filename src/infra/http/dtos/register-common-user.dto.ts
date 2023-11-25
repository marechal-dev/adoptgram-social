import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const registerCommonUserSchema = z.object({
  username: z
    .string()
    .min(6, 'Seu nome de usuário deve ter no mínimo 6 caracteres')
    .max(24, 'Seu nome de usuário deve ter no máximo 24 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .password()
    .min(8, 'Sua senha deve ter no mínimo 8 caracteres')
    .max(128, 'Sua senha deve ter no máximo 128 caracteres'),
  name: z
    .string()
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(64, 'O nome deve ter no máximo 64 caracteres'),
  cpf: z
    .string()
    .regex(
      /([0-9]{3}.{1}[0-9]{3}.{1}[0-9]{3})-{1}([0-9]{2})/,
      'CPF com formato inválido',
    ),
});

export class RegisterCommonUserDTO extends createZodDto(
  registerCommonUserSchema,
) {}
