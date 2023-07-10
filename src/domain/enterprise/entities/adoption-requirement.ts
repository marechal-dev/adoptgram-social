import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Entity } from '@Core/entities/entity';
import { AdoptionRequirementType } from './enums/adoption-requirement-type';

interface AdoptionRequirementProps {
  info: string;
  requirementType: AdoptionRequirementType;
  petId: UniqueEntityId;
}

export class AdoptionRequirement extends Entity<AdoptionRequirementProps> {
  public static create(
    props: AdoptionRequirementProps,
    id?: UniqueEntityId,
  ): AdoptionRequirement {
    const adoptionRequirement = new AdoptionRequirement(props, id);

    return adoptionRequirement;
  }

  public get info(): string {
    return this.props.info;
  }

  public get requirementType(): AdoptionRequirementType {
    return this.props.requirementType;
  }

  public get petId(): UniqueEntityId {
    return this.petId;
  }
}
