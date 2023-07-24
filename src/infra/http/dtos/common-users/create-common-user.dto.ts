import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createCommonUserSchema = z.object({
  username: z
    .string()
    .min(6, 'Seu nome de usuário deve ter no mínimo 6 caracteres.'),
  email: z.string().email('E-mail informado tem formato inválido.'),
  password: z
    .password()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(64, 'A senha deve ter no máximo 64 caracteres.')
    .describe('The desired password should be 8-64 characters long.'),
  firstName: z.string().min(2, 'O nome informado é muito curto.'),
  surname: z.string().min(2, 'O sobrenome informado é muito curto.'),
  cpf: z
    .string()
    .min(11 + 2 + 1, 'CPF com tamanho inválido.')
    .regex(
      /[0-9]{3}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[-]{1}[0-9]{2}/,
      'CPF com formato inválido.',
    )
    .describe(
      `The CPF is validated agains a RegExp that checks the format with dots and dashes. So it expects to be an input string of ${
        11 + 2 + 1
      } length`,
    ),
});

export class CreateCommonUserDto extends createZodDto(createCommonUserSchema) {}
