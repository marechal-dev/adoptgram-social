import { AuditableEntity } from '@Core/entities/auditable-entity';

export interface UserProps {
  email: string;
  passwordHash: string;
  whatsappCellphone: string;
}

export abstract class User<
  TProps extends UserProps,
> extends AuditableEntity<TProps> {
  public get email(): string {
    return this.props.email;
  }

  public set email(value: string) {
    this.props.email = value;
    this.touch();
  }

  public get passwordHash(): string {
    return this.props.passwordHash;
  }

  public set passwordHash(value: string) {
    this.props.passwordHash = value;
    this.touch();
  }

  public get whatsappCellphone(): string {
    return this.props.email;
  }

  public set whatsappCellphone(value: string) {
    this.props.email = value;
    this.touch();
  }
}
