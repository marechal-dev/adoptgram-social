import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const searchManyOrganizationsSchema = z.object({
  query: z.string(),
});

export class SearchManyOrganizationsDTO extends createZodDto(
  searchManyOrganizationsSchema,
) {}
