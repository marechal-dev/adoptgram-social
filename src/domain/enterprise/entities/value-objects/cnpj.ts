export class Cnpj {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static createFromText(value: string): Cnpj {
    if (!this.isLengthValid(value)) {
      // Do something
    }

    if (!this.isFormatValid(value)) {
      // Do something
    }

    const cnpj = new Cnpj(value);

    return cnpj;
  }

  private static isLengthValid(value: string): boolean {
    // 14 digits, 2 dots, 1 slash, 1 dash
    const CNPJ_TOTAL_LENGTH = 14 + 2 + 1 + 1;

    return value.length === CNPJ_TOTAL_LENGTH;
  }

  private static isFormatValid(value: string): boolean {
    const CPNJ_FORMAT_REGEXP =
      /[0-9]{2}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[\/]{1}[0-9]{4}[-]{1}[0-9]{2}/;

    return CPNJ_FORMAT_REGEXP.test(value);
  }

  public toValue(): string {
    return this._value;
  }

  public toString(): string {
    return this._value;
  }
}
