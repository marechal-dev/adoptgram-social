import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

import { User, UserProps } from './user';

export interface AdministratorProps extends UserProps {
  name: string;
}

export class Administrator extends User<AdministratorProps> {
  public static create(
    props: Optional<AdministratorProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const administrator = new Administrator(
      {
        username: props.username,
        email: props.email,
        password: props.password,
        name: props.name,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id,
    );

    return administrator;
  }

  public get name() {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
    this.touch();
  }
}
