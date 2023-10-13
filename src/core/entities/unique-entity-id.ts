import { randomUUID } from 'node:crypto';

export class UniqueEntityID {
  private value: string;

  public constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  public toString(): string {
    return this.value;
  }

  public toValue(): string {
    return this.value;
  }

  public equals(id: UniqueEntityID): boolean {
    return id.toValue() === this.value;
  }
}
