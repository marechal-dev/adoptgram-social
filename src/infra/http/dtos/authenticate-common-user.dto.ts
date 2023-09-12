import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const authenticateCommonUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthenticateCommonUserDto extends createZodDto(
  authenticateCommonUserSchema,
) {}
