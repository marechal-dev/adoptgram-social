import { CommonUserNotFoundException } from '@Domain/social-network/application/use-cases/exceptions/common-user-not-found-exception';
import { NotFollowingOrganizationException } from '@Domain/social-network/application/use-cases/exceptions/not-following-organization-exception';
import { OrganizationNotFoundException } from '@Domain/social-network/application/use-cases/exceptions/organization-not-found-exception';
import { UnfollowOrganizationUseCase } from '@Domain/social-network/application/use-cases/unfollow-organization';
import { CurrentUser } from '@Infra/auth/decorators/current-user.decorator';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/follows')
@UsePipes(ZodValidationPipe)
export class UnfollowOrganizationController {
  public constructor(
    private readonly unfollowOrganization: UnfollowOrganizationUseCase,
  ) {}

  @Delete('/:organizationID/unfollow')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AllowedRoles('CommonUser')
  @UseGuards(RolesGuard)
  public async handle(
    @Param('organizationID') organizationID: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const result = await this.unfollowOrganization.execute({
      organizationID,
      commonUserID: currentUser.sub,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case OrganizationNotFoundException:
        case CommonUserNotFoundException:
          throw new NotFoundException({
            status: 'Not Found',
            message: error.message,
          });
        case NotFollowingOrganizationException:
          throw new BadRequestException({
            status: 'Bad Request',
            message: error.message,
          });
      }
    }
  }
}
