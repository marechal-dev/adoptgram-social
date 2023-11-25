import { CreatePostUseCase } from '@Domain/social-network/application/use-cases/create-post';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/posts')
export class CreatePostController {
  public constructor(private readonly createPost: CreatePostUseCase) {}

  @Post()
  @AllowedRoles('Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Post')
  @ApiBearerAuth()
  public async execute() {}
}
