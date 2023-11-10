import { DeletePetUseCase } from '@Domain/social-network/application/use-cases/delete-pet';
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

@Controller('/pets')
export class DeletePetController {
  public constructor(private readonly deletePet: DeletePetUseCase) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AllowedRoles('Admin', 'CommonUser', 'Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Pet')
  @ApiBearerAuth()
  public async handle(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.deletePet.execute({
      id,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new NotFoundException(error.message);
    }
  }
}
