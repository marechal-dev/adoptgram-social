import { PagedList } from '@Core/repositories/paged-list';
import { Either, right } from '@Core/types/either';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { Injectable } from '@nestjs/common';
import { OrganizationsRepository } from '../repositories/organizations-repository';

interface FetchManyOrganizationsUseCaseRequest {
  page: number;
  pageSize: number;
}

type FetchManyOrganizationsUseCaseResponse = Either<
  null,
  {
    pagedList: PagedList<Organization>;
  }
>;

@Injectable()
export class FetchManyOrganizationsUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
  }: FetchManyOrganizationsUseCaseRequest): Promise<FetchManyOrganizationsUseCaseResponse> {
    const { items, totalCount } = await this.organizationsRepository.fetchMany({
      page,
      pageSize,
    });

    return right({
      pagedList: new PagedList(items, page, pageSize, totalCount),
    });
  }
}
