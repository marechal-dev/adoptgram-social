interface AddressProps {
  firstLine: string;
  secondLine?: string;
  number: string;
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
}

/**
 * 5 digits + 1 dash + 3 digits
 */
const CEP_LENGTH = 5 + 1 + 3;
const CEP_FORMAT_REGEXP = /[0-9]{5}[-]{1}[0-9]{3}/;

export class Address {
  private readonly props: AddressProps;

  private constructor(props: AddressProps) {
    this.props = props;
  }

  public static create(props: AddressProps) {
    if (!this.isCepLengthValid(props.cep)) {
      throw new Error('Invalid CEP length');
    }

    if (!this.isCepFormatValid(props.cep)) {
      throw new Error('Invalid CEP format');
    }

    const address = new Address(props);

    return address;
  }

  private static isCepLengthValid(value: string): boolean {
    return value.length === CEP_LENGTH;
  }

  private static isCepFormatValid(value: string): boolean {
    return CEP_FORMAT_REGEXP.test(value);
  }

  public toValue(): AddressProps {
    return this.props;
  }
}
