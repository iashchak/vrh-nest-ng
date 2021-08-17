import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';

@ApiTags('rooms')
@Crud({
  model: {
    type: Room,
  },
  params: {
    id: {
      field: '_id',
      type: 'string',
      primary: true,
    },
  },
})
@Controller('rooms')
export class RoomsController implements CrudController<Room> {
  constructor(readonly service: RoomsService) {}
}
