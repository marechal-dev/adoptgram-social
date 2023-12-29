import { Entity } from '@Core/entities/entity';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

import { PetEnergyLevel } from './enums/pet-energy-level';
import { PetSize } from './enums/pet-size';

export interface PetProps {
  name: string;
  bio?: string | null;
  age: number;
  profilePictureURL: string;
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
        profilePictureURL: props.profilePictureURL,
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

  public get name() {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  public get bio() {
    return this.props.bio;
  }

  public set bio(value: string | null | undefined) {
    this.props.bio = value;
    this.touch();
  }

  public get age() {
    return this.props.age;
  }

  public set age(value: number) {
    this.props.age = value;
    this.touch();
  }

  public get profilePictureURL() {
    return this.props.profilePictureURL;
  }

  public set profilePictureURL(value: string) {
    this.props.profilePictureURL = value;
    this.touch();
  }

  public get isCastrated() {
    return this.props.isCastrated;
  }

  public set isCastrated(value: boolean) {
    this.props.isCastrated = value;
    this.touch();
  }

  public get requireMedicalAttention() {
    return this.props.requireMedicalAttention;
  }

  public set requireMedicalAttention(value: boolean) {
    this.props.requireMedicalAttention = value;
    this.touch();
  }

  public get isVaccinated() {
    return this.props.isVaccinated;
  }

  public set isVaccinated(value: boolean) {
    this.props.isVaccinated = value;
    this.touch();
  }

  public get size() {
    return this.props.size;
  }

  public set size(value: PetSize) {
    this.props.size = value;
    this.touch();
  }

  public get energyLevel() {
    return this.props.energyLevel;
  }

  public get ownerOrganizationID() {
    return this.props.ownerOrganizationID;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
