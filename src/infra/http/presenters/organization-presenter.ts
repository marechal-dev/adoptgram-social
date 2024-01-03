import { Organization } from '@Domain/social-network/enterprise/entities/organization';

export class OrganizationPresenter {
  public static toHTTP(organization: Organization) {
    return {
      id: organization.id.toString(),
      username: organization.username,
      title: organization.title,
      bio: organization.bio,
      cnpj: organization.cnpj.toString(),
      representativeName: organization.representativeName,
      whatsapp: organization.whatsapp,
      telephone: organization.telephoneNumber,
      pixKey: organization.pixKey,
      profilePictureUrl: organization.profilePictureUrl,
      address: organization.address,
      cep: organization.cep,
      city: organization.city,
      state: organization.state,
    };
  }
}
