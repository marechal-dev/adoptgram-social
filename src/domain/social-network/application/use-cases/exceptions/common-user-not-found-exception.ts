import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class CommonUserNotFoundException
  extends Error
  implements UseCaseException
{
  public constructor(identifier: string) {
    super(`Common User ${identifier} not found`);
  }
}
