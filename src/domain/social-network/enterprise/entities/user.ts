import { Entity } from '@Core/entities/entity';

export interface UserProps {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export abstract class User<TProps extends UserProps> extends Entity<TProps> {
  public get username() {
    return this.props.username;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  protected touch(): void {
    this.props.updatedAt = new Date();
  }
}
