import { CreatePostUseCase } from '@Domain/social-network/application/use-cases/create-post';
import { CurrentUser } from '@Infra/auth/decorators/current-user.decorator';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { RolesGuard } from '../guards/roles.guard';

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
  ) {}
}
