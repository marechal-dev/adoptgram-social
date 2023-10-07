import { Entity } from '@Core/entities/entity';
import { PetSize } from './enums/pet-size';
import { PetEnergyLevel } from './enums/pet-energy-level';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

export interface PetProps {
  name: string;
  bio?: string | null;
  age: number;
  isCastrated: boolean;
  requireMedicalAttention: boolean;
  isVaccinated: boolean;
  size: PetSize;
  energyLevel: PetEnergyLevel;
  ownerOrganizationID: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Pet extends Entity<PetProps> {
  public static create(
    props: Optional<PetProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const pet = new Pet(
      {
        name: props.name,
        bio: props.bio,
        age: props.age,
        isCastrated: props.isCastrated,
        requireMedicalAttention: props.requireMedicalAttention,
        isVaccinated: props.isVaccinated,
        size: props.size,
        energyLevel: props.energyLevel,
        ownerOrganizationID: props.ownerOrganizationID,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id,
    );

    return pet;
  }
}
