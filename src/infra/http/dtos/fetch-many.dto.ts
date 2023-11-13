import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const fetchManySchema = z.object({
  page: z.coerce.number().nonnegative().min(1).default(1),
  pageSize: z.coerce.number().nonnegative().min(20).default(20),
});

export class FetchManyDTO extends createZodDto(fetchManySchema) {}
