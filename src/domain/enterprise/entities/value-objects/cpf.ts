export class Cpf {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static createFromText(text: string): Cpf {
    if (!this.isLengthValid(text)) {
      throw new Error('Invalid length for CPF');
    }

    if (!this.isFormatValid(text)) {
      throw new Error('Invalid format for CPF');
    }

    const cpf = new Cpf(text);

    return cpf;
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
