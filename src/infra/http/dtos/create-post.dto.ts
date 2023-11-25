import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createPostSchema = z.object({
  textContent: z
    .string()
    .min(10, 'A descrição está muito curta')
    .max(560, 'A descrição está muito longa'),
  mediasMetadatas: z
    .array(
      z.object({
        url: z.string().min(1),
        type: z.enum(['Image', 'Video'] as const),
      }),
    )
    .min(1, 'É necessário enviar ao menos uma imagem ou vídeo'),
});

export class CreatePostDTO extends createZodDto(createPostSchema) {}
