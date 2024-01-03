import { OrganizationDetails } from '@Domain/social-network/enterprise/entities/value-objects/organization-details';

import { PetPresenter } from './pet-presenter';
import { PostWithMediasPresenter } from './post-with-medias-presenter';

export class OrganizationDetailsPresenter {
  public static toHTTP(details: OrganizationDetails) {
    return {
      id: details.id.toString(),
      title: details.title,
      bio: details.bio,
      cnpj: details.cnpj.toValue(),
      followersCount: details.followersCount,
      representativeName: details.representativeName,
      whatsapp: details.whatsapp,
      telephone: details.telephone,
      pixKey: details.pixKey,
      profilePictureUrl: details.profilePictureURL,
      posts: details.posts.map(PostWithMediasPresenter.toHTTP),
      availablePets: details.availablePets.map(PetPresenter.toHTTP),
    };
  }
}
