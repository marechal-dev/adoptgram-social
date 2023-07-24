import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Optional } from '@Core/types/optional';
import { Address } from './value-objects/address';
import { Pet } from './pet';
import { Follow } from './follow';
import { User, UserProps } from './user';

interface OrganizationProps extends UserProps {
  title: string;
  bio?: string | null;
  representativeName: string;
  whatsapp: string;
  residentialPhone?: string | null;
  address: Address;
  pixKey?: string | null;
  availablePets: Pet[];
  follows: Follow[];
}

export class Organization extends User<OrganizationProps> {
  public static create(
    props: Optional<OrganizationProps, 'availablePets' | 'follows'>,
    id?: UniqueEntityId,
    createdAt?: Date,
    updatedAt?: Date,
  ): Organization {
    const org = new Organization(
      {
        ...props,
        availablePets: props.availablePets ?? [],
        follows: props.follows ?? [],
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

  public get bio(): string | null | undefined {
    return this.props.bio;
  }

  public set bio(bio: string | null | undefined) {
    this.props.bio = bio;
    this.touch();
  }

  public get representativeName(): string {
    return this.props.representativeName;
  }

  public set representativeName(representativeName: string) {
    this.props.representativeName = representativeName;
    this.touch();
  }

  public get whatsapp(): string {
    return this.props.whatsapp;
  }

  public set whatsapp(whatsapp: string) {
    this.props.whatsapp = whatsapp;
    this.touch();
  }

  public get residentialPhone(): string | null | undefined {
    return this.props.residentialPhone;
  }

  public set residentialPhone(residentialPhone: string | null | undefined) {
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

  public get pixKey(): string | null | undefined {
    return this.props.pixKey;
  }

  public set pixKey(pixKey: string | null | undefined) {
    this.props.pixKey = pixKey;
    this.touch();
  }

  public addPet(pet: Pet): void {
    this.props.availablePets.push(pet);
  }

  public removePet(petId: UniqueEntityId): void {
    const index = this.props.availablePets.findIndex(
      (item) => item.id.toString() === petId.toString(),
    );

    if (index >= 0) {
      this.props.availablePets.splice(index, 1);
    }
  }
}
