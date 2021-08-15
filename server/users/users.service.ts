import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.UserModel(user);
    return createdUser.save();
  }

  async findAll(options?: any): Promise<User[]> {
    return this.UserModel.find(options).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.UserModel.findById(id).exec();
  }

  async findOne(
    options: any,
    fields?: any
  ): Promise<User | null> {
    return this.UserModel.findOne(options, fields).exec();;
  }

  async update(id: number, newValue: User): Promise<User | null> {
    return this.UserModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: number): Promise<User | null> {
    return this.UserModel.findByIdAndRemove(id).exec();
  }
}
