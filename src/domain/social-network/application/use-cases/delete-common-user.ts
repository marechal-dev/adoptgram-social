import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';
import { CommonUsersRepository } from '../repositories/common-users-repository';
import { CommonUserNotFoundException } from './exceptions/common-user-not-found-exception';

interface DeleteCommonUserUseCaseRequest {
  commonUserID: string;
}

type DeleteCommonUserUseCaseResponse = Either<
  CommonUserNotFoundException,
  null
>;

@Injectable()
export class DeleteCommonUserUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
  ) {}

  public async execute({
    commonUserID,
  }: DeleteCommonUserUseCaseRequest): Promise<DeleteCommonUserUseCaseResponse> {
    const commonUser = await this.commonUsersRepository.findById(commonUserID);

    if (!commonUser) {
      return left(new CommonUserNotFoundException(commonUserID));
    }

    await this.commonUsersRepository.delete(commonUserID);

    return right(null);
  }
}
