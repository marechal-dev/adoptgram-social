import { Organization } from '@Domain/enterprise/entities/organization';

export type OrganizationAddressHttpViewModel = {
  firstLine: string;
  secondLine?: string | null;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
};

export type OrganizationHttpViewModel = {
  username: string;
  title: string;
  representativeName: string;
  whatsapp: string;
  pixKey?: string | null;
  address: OrganizationAddressHttpViewModel;
};

export class OrganizationViewModel {
  public static toHttp(organization: Organization): OrganizationHttpViewModel {
    return {
      username: organization.username,
      title: organization.title,
      representativeName: organization.representativeName,
      whatsapp: organization.whatsapp,
      pixKey: organization.pixKey,
      address: {
        firstLine: organization.address.firstLine,
        secondLine: organization.address.secondLine,
        number: organization.address.number,
        neighborhood: organization.address.neighborhood,
        city: organization.address.city,
        state: organization.address.state,
        cep: organization.address.cep,
      },
    };
  }
}
