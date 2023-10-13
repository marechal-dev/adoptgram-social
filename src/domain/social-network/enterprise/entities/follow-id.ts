import { UniqueEntityID } from '@Core/entities/unique-entity-id';

export class FollowID extends UniqueEntityID {
  private readonly _composedID: string;

  public constructor(
    commonUserID: UniqueEntityID,
    organizationID: UniqueEntityID,
  ) {
    const composedID = `${commonUserID.toString()}${organizationID.toString()}`;

    super(composedID);
    this._composedID = composedID;
  }

  public get composedID(): string {
    return this.composedID;
  }

  public override equals(id: FollowID): boolean {
    return this._composedID === id.composedID;
  }
}
