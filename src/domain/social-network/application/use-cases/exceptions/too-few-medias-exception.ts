import { UseCaseException } from '@Core/exceptions/use-case-exception';

export class TooFewMediasException extends Error implements UseCaseException {
  public constructor() {
    super('É necessário enviar ao menos uma imagem ou vídeo');
  }
}
