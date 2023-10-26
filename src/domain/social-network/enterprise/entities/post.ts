import { UniqueEntityID } from '@Core/entities/unique-entity-id';

export interface PostProps {
  organizationID: UniqueEntityID;
  textDescription: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Post {}
