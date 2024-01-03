import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { ValueObject } from '@Core/entities/value-object';

import { Organization } from '../organization';
import { Pet } from '../pet';

import { PostWithMedias } from './post-with-medias';

export interface OrganizationDetailsProps {
  id: UniqueEntityID;
  organization: Organization;
  followersCount: number;
  posts: PostWithMedias[];
  pets: Pet[];
}

export class OrganizationDetails extends ValueObject<OrganizationDetailsProps> {
  public static create(props: OrganizationDetailsProps) {
    return new OrganizationDetails(props);
  }

  public get id() {
    return this.props.id;
  }

  public get title() {
    return this.props.organization.title;
  }

  public get bio() {
    return this.props.organization.bio;
  }

  public get followersCount() {
    return this.props.followersCount;
  }

  public get cnpj() {
    return this.props.organization.cnpj;
  }

  public get representativeName() {
    return this.props.organization.representativeName;
  }

  public get whatsapp() {
    return this.props.organization.whatsapp;
  }

  public get telephone() {
    return this.props.organization.telephoneNumber;
  }

  public get pixKey() {
    return this.props.organization.pixKey;
  }

  public get profilePictureURL() {
    return this.props.organization.profilePictureUrl;
  }

  public get posts() {
    return this.props.posts;
  }

  public get availablePets() {
    return this.props.pets;
  }
}
