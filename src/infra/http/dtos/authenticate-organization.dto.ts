import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const authenticateOrganizationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthenticateOrganizationDto extends createZodDto(
  authenticateOrganizationSchema,
) {}
