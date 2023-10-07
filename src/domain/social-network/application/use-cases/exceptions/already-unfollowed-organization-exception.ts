import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class AlreadyUnfollowedOrganizationException
  extends Error
  implements UseCaseException
{
  public constructor() {
    super('Already unfollowed this Organization');
  }
}
