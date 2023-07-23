import { Optional } from '@Core/types/optional';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Cpf } from './value-objects/cpf';
import { Follow } from './follow';
import { User, UserProps } from './user';

interface CommonUserProps extends UserProps {
  firstName: string;
  surname: string;
  cpf: Cpf;
  following: Follow[];
}

export class CommonUser extends User<CommonUserProps> {
  public static create(
    props: Optional<CommonUserProps, 'following'>,
    id?: UniqueEntityId,
    createdAt?: Date,
    updatedAt?: Date,
  ): CommonUser {
    const commonUser = new CommonUser(
      {
        ...props,
        following: props.following ?? [],
      },
      id,
      createdAt,
      updatedAt,
    );

    return commonUser;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public set firstName(value: string) {
    this.props.firstName = value;
    this.touch();
  }

  public get surname(): string {
    return this.props.surname;
  }

  public set surname(value: string) {
    this.props.surname = value;
    this.touch();
  }

  public get fullName(): string {
    return `${this.props.firstName} ${this.props.surname}`;
  }

  public get cpf(): Cpf {
    return this.props.cpf;
  }

  public set cpf(cpf: Cpf) {
    this.props.cpf = cpf;
    this.touch();
  }

  public get following(): Follow[] {
    return this.props.following;
  }

  public follow(follow: Follow): void {
    this.props.following.push(follow);
  }
}
