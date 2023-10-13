import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { CommonUserAlreadyExistsException } from '@Domain/social-network/application/use-cases/exceptions/common-user-already-exists';
import { RegisterCommonUserUseCase } from '@Domain/social-network/application/use-cases/register-common-user';
import { InvalidCpfException } from '@Domain/social-network/enterprise/entities/exceptions/invalid-cpf';
import { IsPublicRoute } from '@Infra/auth/decorators/is-public-route.decorator';
import { RegisterCommonUserDTO } from '../dtos/register-common-user.dto';

@Controller('/common-users')
@IsPublicRoute()
@UsePipes(ZodValidationPipe)
export class RegisterCommonUserController {
  public constructor(
    private readonly registerCommonUser: RegisterCommonUserUseCase,
  ) {}

  @Post()
  public async handle(@Body() body: RegisterCommonUserDTO) {
    const result = await this.registerCommonUser.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidCpfException:
          throw new BadRequestException({
            status: 'Bad Request',
            message: 'CPF inválido',
          });
        case CommonUserAlreadyExistsException:
          throw new ConflictException({
            status: 'Conflict',
            message: error.message,
          });
      }
    }
  }
}
