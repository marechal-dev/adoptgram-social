import { CreateCommentUseCase } from '@Domain/social-network/application/use-cases/create-comment';
import { CurrentUser } from '@Infra/auth/decorators/current-user.decorator';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { CreateCommentDTO } from '../dtos/create-comment.dto';
import { RolesGuard } from '../guards/roles.guard';
import { CommentPresenter } from '../presenters/comment-presenter';

@Controller('/comments')
@UsePipes(ZodValidationPipe)
export class CreateCommentController {
  public constructor(private readonly createComment: CreateCommentUseCase) {}

  @Post()
  @AllowedRoles('CommonUser')
  @UseGuards(RolesGuard)
  @ApiTags('Comment')
  @ApiBearerAuth()
  public async handle(
    @Body() body: CreateCommentDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const result = await this.createComment.execute({
      creatorID: currentUser.sub,
      postID: body.postID,
      content: body.content,
    });

    if (result.isLeft()) {
      const error = result.value.message;

      throw new NotFoundException(error);
    }

    const comment = CommentPresenter.toHTTP(result.value.comment);

    return {
      comment,
    };
  }
}
