import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createCommentSchema = z.object({
  postID: z.string().uuid(),
  content: z.string().min(5),
});

export class CreateCommentDTO extends createZodDto(createCommentSchema) {}
