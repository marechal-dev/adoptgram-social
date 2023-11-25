import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

import { User, UserProps } from './user';
import { Cpf } from './value-objects/cpf';

export interface CommonUserProps extends UserProps {
  name: string;
  profilePictureUrl?: string | null;
  cpf: Cpf;
}

export class CommonUser extends User<CommonUserProps> {
  public static create(
    props: Optional<CommonUserProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const commonUser = new CommonUser(
      {
        username: props.username,
        email: props.email,
        password: props.password,
        name: props.name,
        cpf: props.cpf,
        profilePictureUrl: props.profilePictureUrl,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id,
    );

    return commonUser;
  }

  public get name() {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  public get cpf() {
    return this.props.cpf;
  }

  public set cpf(value: Cpf) {
    this.props.cpf = value;
    this.touch();
  }
}
