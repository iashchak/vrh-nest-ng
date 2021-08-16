import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: '_id',
      type: 'string',
      primary: true,
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(readonly service: UsersService) {}
}
