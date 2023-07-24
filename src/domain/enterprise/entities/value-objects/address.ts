import { Entity } from '@Core/entities/entity';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';

export interface AddressProps {
  firstLine: string;
  secondLine?: string | null;
  number: string;
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
}

export class Address extends Entity<AddressProps> {
  public static create(props: AddressProps, id?: UniqueEntityId) {
    if (!this.isCepLengthValid(props.cep)) {
      throw new Error('Invalid CEP length');
    }

    if (!this.isCepFormatValid(props.cep)) {
      throw new Error('Invalid CEP format');
    }

    const address = new Address(props, id);

    return address;
  }

  private static isCepLengthValid(value: string): boolean {
    /**
     * 5 digits + 1 dash + 3 digits
     */
    const CEP_LENGTH = 5 + 1 + 3;

    return value.length === CEP_LENGTH;
  }

  private static isCepFormatValid(value: string): boolean {
    const CEP_FORMAT_REGEXP = /[0-9]{5}[-]{1}[0-9]{3}/;

    return CEP_FORMAT_REGEXP.test(value);
  }

  public get firstLine(): string {
    return this.props.firstLine;
  }

  public get secondLine(): string | null | undefined {
    return this.props.secondLine;
  }

  public get number(): string {
    return this.props.number;
  }

  public get cep(): string {
    return this.props.cep;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public get city(): string {
    return this.props.city;
  }

  public get state(): string {
    return this.props.state;
  }

  public toValue(): AddressProps {
    return this.props;
  }
}
