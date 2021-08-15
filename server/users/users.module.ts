import { Module, MiddlewareConsumer } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './entities/user.entity';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
