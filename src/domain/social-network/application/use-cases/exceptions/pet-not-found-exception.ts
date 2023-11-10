import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class PetNotFoundException extends Error implements UseCaseException {
  public constructor(identifier: string) {
    super(`Pet ${identifier} not found`);
  }
}
