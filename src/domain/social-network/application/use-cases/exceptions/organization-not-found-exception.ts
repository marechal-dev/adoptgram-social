import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class OrganizationNotFoundException
  extends Error
  implements UseCaseException
{
  public constructor(identifier: string) {
    super(`Organization ${identifier} not found`);
  }
}
