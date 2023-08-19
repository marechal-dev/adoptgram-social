import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateCommonUserDto } from '../dtos/common-users/create-common-user.dto';
import { CreateCommonUserUseCase } from '@Application/use-cases/create-common-user';
import {
  CommonUserHttpViewModel,
  CommonUserViewModel,
} from '../view-models/common-users/common-user.view-model';

@Controller('common-users')
@ApiTags('common-users')
export class CommonUsersController {
  public constructor(
    private readonly createCommonUserUseCase: CreateCommonUserUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Common User successfully created.',
  })
  public async create(
    @Body() createCommonUserDto: CreateCommonUserDto,
  ): Promise<CommonUserHttpViewModel> {
    const { profile } = await this.createCommonUserUseCase.execute(
      createCommonUserDto,
    );

    return CommonUserViewModel.toHttp(profile);
  }
}
