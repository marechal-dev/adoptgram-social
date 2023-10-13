import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<TProps> {
  private _id: UniqueEntityID;
  protected props: TProps;

  protected constructor(props: TProps, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  public get id() {
    return this._id;
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id.toString() === this._id.toString()) {
      return true;
    }

    return false;
  }
}
