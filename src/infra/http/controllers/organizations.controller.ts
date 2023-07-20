import { UsePipes, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

@UsePipes(ZodValidationPipe)
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
