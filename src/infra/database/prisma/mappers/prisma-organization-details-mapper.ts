import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { OrganizationDetails } from '@Domain/social-network/enterprise/entities/value-objects/organization-details';
import {
  Follow as PrismaFollow,
  Media as PrismaMedia,
  Organization as PrismaOrganization,
  Pet as PrismaPet,
  Post as PrismaPost,
} from '@prisma/client';

import { PrismaOrganizationMapper } from './prisma-organization-mapper';
import { PrismaPetMapper } from './prisma-pet-mapper';
import { PrismaPostWithMediasMapper } from './prisma-post-with-medias-mapper';

type PrismaPostWithMedias = PrismaPost & {
  medias: PrismaMedia[];
};

type PrismaOrganizationDetails = PrismaOrganization & {
  followers: PrismaFollow[];
  posts: PrismaPostWithMedias[];
  availablePets: PrismaPet[];
};

export class PrismaOrganizationDetailsMapper {
  public static toDomain(raw: PrismaOrganizationDetails): OrganizationDetails {
    const organization = PrismaOrganizationMapper.toDomain({
      id: raw.id,
      title: raw.title,
      bio: raw.bio,
      address: raw.address,
      representativeName: raw.representativeName,
      pixKey: raw.pixKey,
      cep: raw.cep,
      city: raw.city,
      cnpj: raw.cnpj,
      createdAt: raw.createdAt,
      email: raw.email,
      password: raw.password,
      profilePictureUrl: raw.profilePictureUrl,
      state: raw.state,
      telephoneNumber: raw.telephoneNumber,
      updatedAt: raw.updatedAt,
      username: raw.username,
      whatsapp: raw.whatsapp,
    });

    return OrganizationDetails.create({
      id: new UniqueEntityID(raw.id),
      followersCount: raw.followers.length,
      organization,
      pets: raw.availablePets.map(PrismaPetMapper.toDomain),
      posts: raw.posts.map(PrismaPostWithMediasMapper.toDomain),
    });
  }
}
