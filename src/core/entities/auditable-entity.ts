import { Entity } from './entity';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export abstract class AuditableEntity<TProps> extends Entity<TProps> {
  private readonly _createdAt: Date;
  private _updatedAt?: Date;

  protected constructor(
    props: TProps,
    id?: UniqueEntityId,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(props, id);
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
