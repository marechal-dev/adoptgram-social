import { AlreadyFollowingOrganizationException } from '@Domain/social-network/application/use-cases/exceptions/already-following-organization-exception';
import { CommonUserNotFoundException } from '@Domain/social-network/application/use-cases/exceptions/common-user-not-found-exception';
import { OrganizationNotFoundException } from '@Domain/social-network/application/use-cases/exceptions/organization-not-found-exception';
import { FollowOrganizationUseCase } from '@Domain/social-network/application/use-cases/follow-organization';
import { CurrentUser } from '@Infra/auth/decorators/current-user.decorator';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/follows')
@UsePipes(ZodValidationPipe)
export class FollowOrganizationController {
  public constructor(
    private readonly followOrganization: FollowOrganizationUseCase,
  ) {}

  @Post('/:organizationID/follow')
  @AllowedRoles('CommonUser')
  @UseGuards(RolesGuard)
  public async handle(
    @Param('organizationID') organizationID: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const result = await this.followOrganization.execute({
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
        case AlreadyFollowingOrganizationException:
          throw new BadRequestException({
            status: 'Bad Request',
            message: error.message,
          });
      }
    }
  }
}
