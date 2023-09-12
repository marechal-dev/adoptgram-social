import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class CommonUserAlreadyExistsException
  extends Error
  implements UseCaseException
{
  public constructor(identifier: string) {
    super(`User ${identifier} already exists`);
  }
}
