import { CreatePostUseCase } from '@Domain/social-network/application/use-cases/create-post';
import { CurrentUser } from '@Infra/auth/decorators/current-user.decorator';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { RolesGuard } from '../guards/roles.guard';
import { PostPresenter } from '../presenters/post-presenter';

@Controller('/posts')
export class CreatePostController {
  public constructor(private readonly createPost: CreatePostUseCase) {}

  @Post()
  @AllowedRoles('Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Post')
  @ApiBearerAuth()
  public async handle(
    @CurrentUser() currentUser: UserPayload,
    @Body() body: CreatePostDTO,
  ) {
    const result = await this.createPost.execute({
      organizationID: currentUser.sub,
      textContent: body.textContent,
      mediasMetadatas: body.mediasMetadatas,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new BadRequestException(error.message);
    }

    const post = PostPresenter.toHTTP(result.value.post);

    return {
      post,
    };
  }
}
