import { UseCaseException } from './use-case-exception';

export class ResourceNotFoundException
  extends Error
  implements UseCaseException
{
  public constructor(identifier: string) {
    super(`Resource ${identifier} not found`);
  }
}
