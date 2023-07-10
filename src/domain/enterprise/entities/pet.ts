import { AuditableEntity } from '@Core/entities/auditable-entity';
import { PetSize } from './enums/pet-size';
import { PetEnergyLevel } from './enums/pet-energy-level';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { AdoptionRequirement } from './adoption-requirement';
import { Optional } from '@Core/types/optional';

interface PetProps {
  name: string;
  bio: string;
  age: number;
  isCastrated: boolean;
  requireMedicalAttention: boolean;
  isVaccinated: boolean;
  size: PetSize;
  energyLevel: PetEnergyLevel;
  adoptionRequirements: AdoptionRequirement[];
}

export class Pet extends AuditableEntity<PetProps> {
  public static create(
    props: Optional<PetProps, 'adoptionRequirements'>,
    id?: UniqueEntityId,
    createdAt?: Date,
    updatedAt?: Date,
  ): Pet {
    const pet = new Pet(
      {
        ...props,
        adoptionRequirements: props.adoptionRequirements ?? [],
      },
      id,
      createdAt,
      updatedAt,
    );

    return pet;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  public get bio(): string {
    return this.props.bio;
  }

  public set bio(bio: string) {
    this.props.bio = bio;
    this.touch();
  }

  public get age(): number {
    return this.props.age;
  }

  public set age(age: number) {
    this.props.age = age;
    this.touch();
  }

  public get isCastrated(): boolean {
    return this.props.isCastrated;
  }

  public set isCastrated(isCastrated: boolean) {
    this.props.isCastrated = isCastrated;
    this.touch();
  }

  public get requireMedicalAttention(): boolean {
    return this.props.requireMedicalAttention;
  }

  public set requireMedicalAttention(requireMedicalAttention: boolean) {
    this.props.requireMedicalAttention = requireMedicalAttention;
    this.touch();
  }

  public get size(): PetSize {
    return this.props.size;
  }

  public set size(size: PetSize) {
    this.props.size = size;
    this.touch();
  }

  public get energyLevel(): PetEnergyLevel {
    return this.props.energyLevel;
  }

  public set energyLevel(energyLevel: PetEnergyLevel) {
    this.props.energyLevel = energyLevel;
    this.touch();
  }

  public get adoptionRequirements(): AdoptionRequirement[] {
    return this.props.adoptionRequirements;
  }

  public addAdoptionRequirement(
    adoptionRequirement: AdoptionRequirement,
  ): void {
    this.props.adoptionRequirements.push(adoptionRequirement);
  }
}
