import { DomainException } from '@Core/exceptions/domain-exception';

export class InvalidCpfException extends Error implements DomainException {
  public constructor() {
    super('Invalid CPF');
  }
}
