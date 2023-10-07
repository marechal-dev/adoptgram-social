import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class AlreadyFollowingOrganizationException
  extends Error
  implements UseCaseException
{
  public constructor() {
    super('Already following this Organization');
  }
}
