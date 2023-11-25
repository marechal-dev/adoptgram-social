import { UniqueEntityID } from '@Core/entities/unique-entity-id';

export class TagID extends UniqueEntityID {
  private readonly _composedID: string;

  public constructor(postID: UniqueEntityID, petID: UniqueEntityID) {
    const composedID = `${postID.toString()}${petID.toString()}`;

    super(composedID);
    this._composedID = composedID;
  }

  public get composedID(): string {
    return this.composedID;
  }

  public override equals(id: TagID): boolean {
    return this._composedID === id.composedID;
  }
}
