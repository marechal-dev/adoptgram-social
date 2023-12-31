import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

import { User, UserProps } from './user';
import { Cnpj } from './value-objects/cnpj';

export interface OrganizationProps extends UserProps {
  title: string;
  representativeName: string;
  bio?: string | null;
  pixKey?: string | null;
  whatsapp: string;
  telephoneNumber?: string | null;
  profilePictureUrl?: string | null;
  address: string;
  cep: string;
  city: 'RG' | 'PEL';
  state: 'RS';
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
        profilePictureUrl: props.profilePictureUrl,
        address: props.address,
        cep: props.cep,
        city: props.city,
        state: props.state,
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

  public set title(value: string) {
    this.props.title = value;
    this.touch();
  }

  public get representativeName() {
    return this.props.representativeName;
  }

  public set representativeName(value: string) {
    this.props.representativeName = value;
    this.touch();
  }

  public get bio() {
    return this.props.bio;
  }

  public set bio(value: string | null | undefined) {
    this.props.bio = value;
    this.touch();
  }

  public get pixKey() {
    return this.props.pixKey;
  }

  public set pixKey(value: string | null | undefined) {
    this.props.pixKey = value;
    this.touch();
  }

  public get whatsapp() {
    return this.props.whatsapp;
  }

  public set whatsapp(value: string) {
    this.props.whatsapp = value;
    this.touch();
  }

  public get telephoneNumber() {
    return this.props.telephoneNumber;
  }

  public set telephoneNumber(value: string | null | undefined) {
    this.props.telephoneNumber = value;
    this.touch();
  }

  public get cnpj() {
    return this.props.cnpj;
  }

  public set cnpj(value: Cnpj) {
    this.props.cnpj = value;
    this.touch();
  }

  public get profilePictureUrl() {
    return this.props.profilePictureUrl;
  }

  public set profilePictureUrl(value: string | null | undefined) {
    this.props.profilePictureUrl = value;
    this.touch();
  }

  public get address() {
    return this.props.address;
  }

  public set address(value: string) {
    this.props.address = value;
    this.touch();
  }

  public get cep() {
    return this.props.cep;
  }

  public set cep(value: string) {
    this.props.cep = value;
    this.touch();
  }

  public get city() {
    return this.props.city;
  }

  public set city(value: 'RG' | 'PEL') {
    this.props.city = value;
    this.touch();
  }

  public get state() {
    return this.props.state;
  }

  public set state(value: 'RS') {
    this.props.state = value;
    this.touch();
  }
}
