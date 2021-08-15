import { Injectable } from '@nestjs/common';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private readonly roomModel: ReturnModelType<typeof Room>) {}

  async create(room: Room): Promise<DocumentType<Room>> {
    const createdRoom = new this.roomModel(room);
    return createdRoom.save();
  }

  async addMessage(message: Message, id: string) {
    const room = await this.findById(id);
    room?.messages?.push(message);
    room?.save();
  }

  async findMessages(id: string, limit: number) {
    let room = await this.findWithLimit(id, limit);

    // Create the user room, if isn't already exist
    if (!room) {
      const userRoom = new this.roomModel({ _id: id, name: id, is_user: true });
      room = await this.create(userRoom);
    }

    return room?.messages;
  }

  async findAll(options?: any): Promise<Room[]> {
    return this.roomModel.find(options).exec();
  }

  async findWithLimit(id: string, limit: number): Promise<DocumentType<Room> | null> {
    return this.roomModel
      .findById(id)
      .slice('messages', limit)
      // .populate('messages.user', { _id: 1, username: 1, email: 1 })
      .exec();
  }

  async findById(id: string): Promise<DocumentType<Room> | null> {
    return this.roomModel.findById(id).exec();
  }

  async findOne(options?: any, fields?: any): Promise<DocumentType<Room> | null> {
    return this.roomModel.findOne(options, fields).exec();
  }

  async update(id: string, newValue: Room): Promise<DocumentType<Room> | null> {
    return this.roomModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: string): Promise<DocumentType<Room> | null> {
    return this.roomModel.findByIdAndRemove(id).exec();
  }
}