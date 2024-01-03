import { SearchManyOrganizationsUseCase } from '@Domain/social-network/application/use-cases/search-many-organizations';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { SearchManyOrganizationsDTO } from '../dtos/search-many-organizations.dto';
import { RolesGuard } from '../guards/roles.guard';
import { OrganizationPresenter } from '../presenters/organization-presenter';

@Controller('/organizations/text-search')
export class SearchManyOrganizationsController {
  public constructor(
    private readonly searchManyOrganizations: SearchManyOrganizationsUseCase,
  ) {}

  @Get()
  @AllowedRoles('Admin', 'CommonUser', 'Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Organization')
  @ApiBearerAuth()
  public async handle(@Query() queryParams: SearchManyOrganizationsDTO) {
    const result = await this.searchManyOrganizations.execute({
      query: queryParams.query,
    });

    if (result.isLeft()) {
      throw new InternalServerErrorException('Erro catastrófico');
    }

    const mappedData = result.value.queryResult.map(
      OrganizationPresenter.toHTTP,
    );

    return {
      queryResult: mappedData,
    };
  }
}
