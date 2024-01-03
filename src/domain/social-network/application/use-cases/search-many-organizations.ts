import { Either, right } from '@Core/types/either';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { Injectable } from '@nestjs/common';

import { OrganizationsRepository } from '../repositories/organizations-repository';

interface SearchManyOrganizationsUseCaseRequest {
  query: string;
}

type FetchManyOrganizationsUseCaseResponse = Either<
  null,
  {
    queryResult: Organization[];
  }
>;

@Injectable()
export class SearchManyOrganizationsUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    query,
  }: SearchManyOrganizationsUseCaseRequest): Promise<FetchManyOrganizationsUseCaseResponse> {
    const queryResult = await this.organizationsRepository.searchMany(query);

    return right({
      queryResult,
    });
  }
}
