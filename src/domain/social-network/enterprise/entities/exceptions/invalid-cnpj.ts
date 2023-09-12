import { DomainException } from '@Core/exceptions/domain-exception';

export class InvalidCnpjException extends Error implements DomainException {
  public constructor() {
    super('Invalid CNPJ');
  }
}
