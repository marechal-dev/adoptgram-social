import {
  UsePipes,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { DomainExceptionFilter } from '../exception-filters/domain-exception.filter';
import { ZodValidationExceptionFilter } from '../exception-filters/zod-validation-exception.filter';

@UsePipes(ZodValidationPipe)
@UseFilters(DomainExceptionFilter, ZodValidationExceptionFilter)
@Controller('orgs')
export class OrganizationsController {
  @Get()
  public async fetch() {
    //
  }

  @Get(':id')
  public async getById() {
    //
  }

  @Get(':id/posts')
  public async getPostsById() {
    //
  }

  @Get('search')
  public async search() {
    //
  }

  @Post()
  public async create() {
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
