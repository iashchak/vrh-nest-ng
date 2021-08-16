import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message])],
  controllers: [RoomsController],
  providers: [RoomsService, MessageService],
  exports: [RoomsService, MessageService],
})
export class RoomsModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes(RoomsController);
  // }
}
