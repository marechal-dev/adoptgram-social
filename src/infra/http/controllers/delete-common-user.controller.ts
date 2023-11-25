import { DeleteCommonUserUseCase } from '@Domain/social-network/application/use-cases/delete-common-user';
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

@Controller('/common-users')
export class DeleteCommonUserController {
  public constructor(
    private readonly deleteCommonUser: DeleteCommonUserUseCase,
  ) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AllowedRoles('Admin', 'CommonUser')
  @UseGuards(RolesGuard)
  @ApiTags('Common User')
  @ApiBearerAuth()
  public async handle(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.deleteCommonUser.execute({
      commonUserID: id,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new NotFoundException(error.message);
    }
  }
}
