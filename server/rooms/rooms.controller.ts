import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  HttpException,
  HttpStatus,
  Put,
  Req,
} from '@nestjs/common';
import { Room } from './entities/room.entity';

import { RoomsService } from './rooms.service';


@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  async show(@Req() req: Request & { params: { id: string } }): Promise<Room> {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    const room = await this.roomsService.findById(id);
    if (!room)
      throw new HttpException(
        `The room with the id: ${id} does not exists`,
        HttpStatus.BAD_REQUEST
      );

    return room;
  }

  @Post()
  async create(@Body() body: Room): Promise<Room> {
    if (!body || (body && Object.keys(body).length === 0))
      throw new HttpException('Missing informations', HttpStatus.BAD_REQUEST);

    const room = await this.roomsService.create(body);

    return room;
  }

  @Put(':id')
  async update(@Req() req: Request & { params: { id: string }; body: Room }) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    await this.roomsService.update(id, req.body);
  }

  @Delete(':id')
  public async delete(@Req() req: Request & { params: { id: string } }) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    await this.roomsService.delete(id);
  }
}
