import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { User, UserProps } from './user';
import { Address } from './value-objects/address';
import { Cnpj } from './value-objects/cnpj';
import { Pet } from './pet';
import { Optional } from '@Core/types/optional';
import { Follow } from './follow';

interface OrganizationProps extends UserProps {
  title: string;
  cnpj: Cnpj;
  bio?: string;
  residentialPhone?: string;
  address: Address;
  pixKey?: string;
  availablePets: Pet[];
  followers: Follow[];
}

export class Organization extends User<OrganizationProps> {
  public static create(
    props: Optional<OrganizationProps, 'availablePets' | 'followers'>,
    id?: UniqueEntityId,
    createdAt?: Date,
    updatedAt?: Date,
  ): Organization {
    const org = new Organization(
      {
        ...props,
        availablePets: props.availablePets ?? [],
        followers: props.followers ?? [],
      },
      id,
      createdAt,
      updatedAt,
    );

    return org;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  public get cnpj(): Cnpj {
    return this.props.cnpj;
  }

  public get bio(): string | undefined {
    return this.props.bio;
  }

  public set bio(bio: string | undefined) {
    this.props.bio = bio;
    this.touch();
  }

  public get residentialPhone(): string | undefined {
    return this.props.residentialPhone;
  }

  public set residentialPhone(residentialPhone: string | undefined) {
    this.props.residentialPhone = residentialPhone;
    this.touch();
  }

  public get address(): Address {
    return this.props.address;
  }

  public set address(address: Address) {
    this.props.address = address;
    this.touch();
  }

  public get pixKey(): string | undefined {
    return this.props.pixKey;
  }

  public set pixKey(pixKey: string | undefined) {
    this.props.pixKey = pixKey;
    this.touch();
  }
}
