import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createPetSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome do Pet deve ter no mínimo 2 caracteres.')
    .max(128, 'O nome do Pet deve ter no máximo 128 caracteres.'),
  bio: z
    .string()
    .min(24, 'A bio do Pet deve ter no mínimo 24 caracteres.')
    .max(256, 'A bio do Pet deve ter no máximo 256 caracteres.')
    .optional(),
  age: z
    .number()
    .int('A idade do Pet não pode ser fracionária.')
    .nonnegative('A idade do Pet não pode ser negativa.'),
  profilePictureURL: z.string().url(),
  isCastrated: z.boolean(),
  requireMedicalAttention: z.boolean(),
  isVaccinated: z.boolean(),
  size: z.enum(['Small', 'Medium', 'Big'] as const),
  energyLevel: z.enum([
    'VeryLow',
    'Low',
    'Medium',
    'High',
    'VeryHigh',
  ] as const),
});

export class CreatePetDTO extends createZodDto(createPetSchema) {}
