import {
  UsePipes,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  UseFilters,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { CreateCommonUserDto } from '../dtos/common-users/create-common-user.dto';
import { DomainExceptionFilter } from '../exception-filters/domain-exception.filter';
import { ZodValidationExceptionFilter } from '../exception-filters/zod-validation-exception.filter';

@UsePipes(ZodValidationPipe)
@UseFilters(DomainExceptionFilter, ZodValidationExceptionFilter)
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
