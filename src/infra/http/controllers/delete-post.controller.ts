import { DeletePostUseCase } from '@Domain/social-network/application/use-cases/delete-post';
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

@Controller('/posts')
export class DeletePostController {
  public constructor(private readonly deletePost: DeletePostUseCase) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @AllowedRoles('Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Post')
  @ApiBearerAuth()
  public async handle(@Param('id', ParseUUIDPipe) postID: string) {
    const result = await this.deletePost.execute({
      postID,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new NotFoundException(error.message);
    }
  }
}
