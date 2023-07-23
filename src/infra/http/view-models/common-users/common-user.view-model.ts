import { CommonUser } from '@Domain/enterprise/entities/common-user';

export type CommonUserHttpViewModel = {
  username: string;
  firstName: string;
  surname: string;
  fullName: string;
  cpf: string;
};

export class CommonUserViewModel {
  public static toHttp(commonUser: CommonUser): CommonUserHttpViewModel {
    return {
      username: commonUser.username,
      firstName: commonUser.firstName,
      surname: commonUser.surname,
      fullName: commonUser.fullName,
      cpf: commonUser.cpf.toString(),
    };
  }
}
