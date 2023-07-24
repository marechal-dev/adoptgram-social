import { UsePipes, Controller, Post, UseFilters, Body } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { DomainExceptionFilter } from '../exception-filters/domain-exception.filter';
import { ZodValidationExceptionFilter } from '../exception-filters/zod-validation-exception.filter';
import { CreateOrganizationUseCase } from '@Application/use-cases/create-organization';
import { CreateOrganizationDto } from '../dtos/organizations/create';
import {
  OrganizationHttpViewModel,
  OrganizationViewModel,
} from '../view-models/organizations/organization.view-model';

@UsePipes(ZodValidationPipe)
@UseFilters(DomainExceptionFilter, ZodValidationExceptionFilter)
@Controller('organizations')
export class OrganizationsController {
  public constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
  ) {}

  @Post()
  public async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationHttpViewModel> {
    const { profile } = await this.createOrganizationUseCase.execute(
      createOrganizationDto,
    );

    return OrganizationViewModel.toHttp(profile);
  }
}
