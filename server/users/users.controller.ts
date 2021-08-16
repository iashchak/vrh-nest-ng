import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpException,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from './entities/user.entity';

import { UsersService } from './users.service';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(readonly service: UsersService) {}
}
