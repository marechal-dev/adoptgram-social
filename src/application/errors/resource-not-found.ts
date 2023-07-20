export class ResourceNotFoundError extends Error {
  public constructor(message: string) {
    super(message);
  }
}
