import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class IncorrectCredentialsException
  extends Error
  implements UseCaseException
{
  public constructor() {
    super('Incorrect e-mail or password');
  }
}
