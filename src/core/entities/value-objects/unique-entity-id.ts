import { randomUUID } from 'node:crypto';

export class UniqueEntityId {
  private readonly value: string;

  public constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  public toValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
