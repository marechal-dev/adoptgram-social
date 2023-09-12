import { Optional } from '@Core/types/optional';
import { User, UserProps } from './user';
import { Cpf } from './value-objects/cpf';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';

export interface CommonUserProps extends UserProps {
  name: string;
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

  public get cpf() {
    return this.props.cpf;
  }
}
