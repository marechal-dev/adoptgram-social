import { DeleteOrganizationUseCase } from '@Domain/social-network/application/use-cases/delete-organization';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/organizations')
export class DeleteOrganizationController {
  public constructor(
    private readonly deleteOrganization: DeleteOrganizationUseCase,
  ) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AllowedRoles('Admin', 'Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Organization')
  @ApiBearerAuth()
  public async handle(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.deleteOrganization.execute({
      organizationID: id,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new NotFoundException(error.message);
    }
  }
}
