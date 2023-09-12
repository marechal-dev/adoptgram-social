import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class OrganizationAlreadyExistsException
  extends Error
  implements UseCaseException
{
  public constructor(identifier: string) {
    super(`Organization ${identifier} already exists`);
  }
}
