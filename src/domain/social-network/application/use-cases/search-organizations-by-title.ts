import { PagedList } from '@Core/repositories/paged-list';
import { Either, right } from '@Core/types/either';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { Injectable } from '@nestjs/common';
import { OrganizationsRepository } from '../repositories/organizations-repository';

interface SearchOrganizationsByTitleUseCaseRequest {
  query: string;
  paginationParams: {
    page: number;
    pageSize: number;
  };
}

type SearchOrganizationsByTitleUseCaseResponse = Either<
  null,
  PagedList<Organization>
>;

@Injectable()
export class SearchOrganizationsByTitleUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    query,
    paginationParams,
  }: SearchOrganizationsByTitleUseCaseRequest): Promise<SearchOrganizationsByTitleUseCaseResponse> {
    const organizations = await this.organizationsRepository.findManyByTitle(
      query,
      paginationParams,
    );

    return right(organizations);
  }
}
