import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

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
