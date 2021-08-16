import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MongooseCrudService } from '../mongoose-crud-service';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService extends MongooseCrudService<Room> {
  constructor(
    @InjectRepository(Room) protected readonly repo: MongoRepository<Room>,
    @InjectRepository(Message)
    protected readonly messageRepo: MongoRepository<Message>
  ) {
    super(repo);
  }

  async addMessage(id: string, message: string) {
    const room = await this.repo.findOne(id);
    if (!room) {
      throw new Error('Room not found');
    }
    const createdMessage = await this.messageRepo.create({ message });
    room.messages?.push(createdMessage);
    return this.repo.save(room);
  }
}
