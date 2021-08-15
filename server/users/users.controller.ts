import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from './entities/user.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async show(@Req() req: Request): Promise<User> {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    const user = await this.usersService.findById(id);
    if (!user)
      throw new HttpException(
        `The user with the id: ${id} does not exists`,
        HttpStatus.BAD_REQUEST
      );

    return user;
  }

  @Post()
  async create(@Body() body: User) {
    if (!body || (body && Object.keys(body).length === 0))
      throw new HttpException('Missing informations', HttpStatus.BAD_REQUEST);

    await this.usersService.create(body);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    await this.usersService.update(+id, req.body);
  }

  @Delete(':id')
  public async delete(@Req() req: Request) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    await this.usersService.delete(+id);
  }
}
