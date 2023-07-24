import { UsePipes, Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { CreateCommonUserDto } from '../dtos/common-users/create-common-user.dto';
import { DomainExceptionFilter } from '../exception-filters/domain-exception.filter';
import { ZodValidationExceptionFilter } from '../exception-filters/zod-validation-exception.filter';
import { CreateCommonUserUseCase } from '@Application/use-cases/create-common-user';
import {
  CommonUserHttpViewModel,
  CommonUserViewModel,
} from '../view-models/common-users/common-user.view-model';

@UsePipes(ZodValidationPipe)
@UseFilters(DomainExceptionFilter, ZodValidationExceptionFilter)
@Controller('common-users')
export class CommonUsersController {
  public constructor(
    private readonly createCommonUserUseCase: CreateCommonUserUseCase,
  ) {}

  @Post()
  public async create(
    @Body() createCommonUserDto: CreateCommonUserDto,
  ): Promise<CommonUserHttpViewModel> {
    const { profile } = await this.createCommonUserUseCase.execute(
      createCommonUserDto,
    );

    return CommonUserViewModel.toHttp(profile);
  }
}
