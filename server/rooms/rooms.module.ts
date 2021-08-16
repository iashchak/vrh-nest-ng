import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';
import { MessageService } from './message.service';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

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
