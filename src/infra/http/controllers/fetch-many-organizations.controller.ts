import { FetchManyOrganizationsUseCase } from '@Domain/social-network/application/use-cases/fetch-many-organizations';
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
import { OrganizationPresenter } from '../presenters/organization-presenter';

@Controller('/organizations')
@UsePipes(ZodValidationPipe)
export class FetchManyOrganizationsController {
  public constructor(
    private readonly fetchManyOrganizations: FetchManyOrganizationsUseCase,
  ) {}

  @Get()
  @AllowedRoles('Admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiTags('Organization')
  public async handle(@Query() paginationParams: FetchManyDTO) {
    const result = await this.fetchManyOrganizations.execute(paginationParams);

    if (result.isLeft()) {
      throw new InternalServerErrorException('Erro catastrófico');
    }

    const pagedList = result.value.pagedList;

    return {
      items: pagedList.items.map(OrganizationPresenter.toHTTP),
      totalCount: pagedList.totalCount,
      currentPage: pagedList.currentPage,
      pageSize: pagedList.pageSize,
      hasNextPage: pagedList.hasNextPage,
      hasPreviousPage: pagedList.hasPreviousPage,
    };
  }
}
