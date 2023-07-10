import { randomUUID } from 'node:crypto';

export class UniqueEntityId {
  private readonly value: string;

  public constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  public get toValue(): string {
    return this.value;
  }

  public get toString(): string {
    return this.value;
  }
}
