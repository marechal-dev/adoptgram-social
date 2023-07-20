import {
  UsePipes,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { CreateCommonUserDto } from '../dtos/common-users/create-common-user.dto';

@UsePipes(ZodValidationPipe)
@Controller('common-users')
export class CommonUsersController {
  @Get()
  public async fetch() {
    //
  }

  @Get(':id')
  public async getById() {
    //
  }

  @Get('search')
  public async search() {
    //
  }

  @Post()
  public async create(@Body() createCommonUserDto: CreateCommonUserDto) {
    //
  }

  @Put(':id')
  public async update() {
    //
  }

  @Delete(':id')
  public async delete() {
    //
  }
}
