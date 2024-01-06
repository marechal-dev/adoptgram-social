import { FindPostDetailsByIdUseCase } from '@Domain/social-network/application/use-cases/find-post-details-by-id';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { PostDetailsPresenter } from '../presenters/post-deitails-presenter';

@Controller('/posts/:id/details')
export class FindPostDetailsByIdController {
  public constructor(
    private readonly findPostDetailsByID: FindPostDetailsByIdUseCase,
  ) {}

  @Get()
  @AllowedRoles('CommonUser', 'Organization', 'Admin')
  @UseGuards(RolesGuard)
  @ApiTags('Post')
  @ApiBearerAuth()
  public async handle(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.findPostDetailsByID.execute({ id });

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }

    const post = PostDetailsPresenter.toHTTP(result.value.post);

    return {
      post,
    };
  }
}
