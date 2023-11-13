import { FetchManyCommonUsersUseCase } from '@Domain/social-network/application/use-cases/fetch-many-common-users';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { FetchManyDTO } from '../dtos/fetch-many.dto';
import { RolesGuard } from '../guards/roles.guard';
import { CommonUserPresenter } from '../presenters/common-user-presenter';

@Controller('/common-users')
@UsePipes(ZodValidationPipe)
export class FetchManyCommonUsersController {
  public constructor(
    private readonly fetchManyCommonUsers: FetchManyCommonUsersUseCase,
  ) {}

  @Get()
  @AllowedRoles('Admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiTags('Common User')
  public async handle(@Query() paginationParams: FetchManyDTO) {
    const result = await this.fetchManyCommonUsers.execute(paginationParams);

    if (result.isLeft()) {
      throw new InternalServerErrorException('Erro catastrófico');
    }

    const pagedList = result.value.pagedList;

    return {
      items: pagedList.items.map(CommonUserPresenter.toHTTP),
      totalCount: pagedList.totalCount,
      currentPage: pagedList.currentPage,
      pageSize: pagedList.pageSize,
      hasNextPage: pagedList.hasNextPage,
      hasPreviousPage: pagedList.hasPreviousPage,
    };
  }
}
