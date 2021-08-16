import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongooseCrudService } from 'server/mongoose-crud-service';
import { MongoRepository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class MessageService extends MongooseCrudService<Message> {
  constructor(
    @InjectRepository(Room) protected readonly roomRepo: MongoRepository<Room>,
    @InjectRepository(Message) protected readonly repo: MongoRepository<Message>
  ) {
    super(repo);
  }

  async getByParent(roomId: string, limit: number = 25) {
    const room = await this.roomRepo.findOne(roomId);
    return this.repo.find({ where: { room: { $eq: room } }, take: limit });
  }
}
