import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateOrganizationUseCase } from '@Application/use-cases/create-organization';
import { CreateOrganizationDto } from '../dtos/organizations/create';
import {
  OrganizationHttpViewModel,
  OrganizationViewModel,
} from '../view-models/organizations/organization.view-model';

@Controller('organizations')
@ApiTags('organizations')
export class OrganizationsController {
  public constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Organization successfully created.',
  })
  public async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationHttpViewModel> {
    const { profile } = await this.createOrganizationUseCase.execute(
      createOrganizationDto,
    );

    return OrganizationViewModel.toHttp(profile);
  }
}
