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
import { Crud, CrudController, GetManyDefaultResponse } from '@nestjsx/crud';
import { Room } from './entities/room.entity';

import { RoomsService } from './rooms.service';

@Crud({
  model: {
    type: Room,
  },
})
@Controller('rooms')
export class RoomsController implements CrudController<Room> {
  constructor(readonly service: RoomsService) {}
}
