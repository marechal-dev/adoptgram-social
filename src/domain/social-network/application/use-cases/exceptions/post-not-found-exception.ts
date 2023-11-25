import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class PostNotFoundException extends Error implements UseCaseException {
  public constructor(identifier: string) {
    super(`Post ${identifier} não encontrado`);
  }
}
