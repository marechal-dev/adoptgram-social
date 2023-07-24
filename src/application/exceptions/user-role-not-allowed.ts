import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@Core/exceptions/domain-exception';

export class UserRoleNotAllowedException extends DomainException {
  public constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
