import { Optional } from '@Core/types/optional';
import { User, UserProps } from './user';
import { Cnpj } from './value-objects/cnpj';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';

export interface OrganizationProps extends UserProps {
  title: string;
  representativeName: string;
  bio?: string | null;
  pixKey?: string | null;
  whatsapp: string;
  telephoneNumber?: string | null;
  cnpj: Cnpj;
}

export class Organization extends User<OrganizationProps> {
  public static create(
    props: Optional<OrganizationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Organization {
    const organization = new Organization(
      {
        username: props.username,
        email: props.email,
        password: props.password,
        title: props.title,
        representativeName: props.representativeName,
        bio: props.bio,
        cnpj: props.cnpj,
        pixKey: props.pixKey,
        whatsapp: props.whatsapp,
        telephoneNumber: props.telephoneNumber,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id,
    );

    return organization;
  }

  public get title() {
    return this.props.title;
  }

  public get representativeName() {
    return this.props.representativeName;
  }

  public get bio() {
    return this.props.bio;
  }

  public get pixKey() {
    return this.props.pixKey;
  }

  public get whatsapp() {
    return this.props.whatsapp;
  }

  public get telephoneNumber() {
    return this.props.telephoneNumber;
  }

  public get cnpj() {
    return this.props.cnpj;
  }
}
