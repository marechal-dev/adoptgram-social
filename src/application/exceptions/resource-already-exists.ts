import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@Core/exceptions/domain-exception';

export class ResourceAlreadyExistsException extends DomainException {
  public constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
