import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@Core/exceptions/domain-exception';

export class IncorrectEmailOrPasswordException extends DomainException {
  public constructor() {
    super('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
  }
}
