import { AuditableEntity } from '@Core/entities/auditable-entity';

export interface UserProps {
  username: string;
  email: string;
  passwordHash: string;
  profilePictureUrl?: string;
}

export abstract class User<
  TProps extends UserProps,
> extends AuditableEntity<TProps> {
  public get username(): string {
    return this.props.username;
  }

  public set username(username: string) {
    this.props.username = username;
    this.touch();
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  public get passwordHash(): string {
    return this.props.passwordHash;
  }

  public set passwordHash(passwordHash: string) {
    this.props.passwordHash = passwordHash;
    this.touch();
  }

  public get profilePictureUrl(): string | undefined {
    return this.props.profilePictureUrl;
  }

  public set profilePictureUrl(profilePictureUrl: string | undefined) {
    this.props.profilePictureUrl = profilePictureUrl;
    this.touch();
  }
}
