import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@Core/exceptions/domain-exception';

export class ResourceNotFoundException extends DomainException {
  public constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
