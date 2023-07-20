import { HttpStatus } from '@nestjs/common';

export class DomainException extends Error {
  private readonly _status: HttpStatus;

  public constructor(message: string, status: HttpStatus) {
    super(message);
    this._status = status;
  }

  public get status(): HttpStatus {
    return this._status;
  }
}
