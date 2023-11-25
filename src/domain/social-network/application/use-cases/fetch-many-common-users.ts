import { PagedList } from '@Core/repositories/paged-list';
import { Either, right } from '@Core/types/either';
import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';
import { Injectable } from '@nestjs/common';

import { CommonUsersRepository } from '../repositories/common-users-repository';

interface FetchManyCommonUsersUseCaseRequest {
  page: number;
  pageSize: number;
}

type FetchManyCommonUsersUseCaseResponse = Either<
  null,
  {
    pagedList: PagedList<CommonUser>;
  }
>;

@Injectable()
export class FetchManyCommonUsersUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
  ) {}

  public async execute({
    page,
    pageSize,
  }: FetchManyCommonUsersUseCaseRequest): Promise<FetchManyCommonUsersUseCaseResponse> {
    const { items, totalCount } = await this.commonUsersRepository.fetchMany({
      page,
      pageSize,
    });

    return right({
      pagedList: new PagedList(items, page, pageSize, totalCount),
    });
  }
}
