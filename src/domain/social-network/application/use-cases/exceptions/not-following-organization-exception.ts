import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class NotFollowingOrganizationException
  extends Error
  implements UseCaseException
{
  public constructor() {
    super("You're already not following this Organization");
  }
}
