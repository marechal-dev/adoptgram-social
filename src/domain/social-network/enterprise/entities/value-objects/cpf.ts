import { Either, left, right } from '@Core/types/either';
import { InvalidCpfException } from '../exceptions/invalid-cpf';

type CreateCpfFromTextResult = Either<InvalidCpfException, Cpf>;

export class Cpf {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(text: string) {
    return new Cpf(text);
  }

  public static createFromText(text: string): CreateCpfFromTextResult {
    if (!this.isLengthValid(text)) {
      return left(new InvalidCpfException());
    }

    if (!this.isFormatValid(text)) {
      return left(new InvalidCpfException());
    }

    const cpf = new Cpf(text);

    return right(cpf);
  }

  public get value(): string {
    return this._value;
  }

  public toString(): string {
    return this._value;
  }

  private static isLengthValid(value: string): boolean {
    const TOTAL_CPF_LENGTH = 11 + 2 + 1; // 11 digits, 2 dots, 1 dash
    return value.length === TOTAL_CPF_LENGTH;
  }

  private static isFormatValid(value: string): boolean {
    const CPF_REGEXP = /[0-9]{3}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[-]{1}[0-9]{2}/;

    return CPF_REGEXP.test(value);
  }
}
