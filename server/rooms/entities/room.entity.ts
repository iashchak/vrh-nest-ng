import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { User } from 'server/users/entities/user.entity';
import { Message } from './message.entity';

export class Room {
  
  id!: ObjectId;
  _id!: ObjectId;
  
  @ApiProperty()
  @IsString()
  @prop({ required: true })
  name!: String;
  
  @ApiProperty()
  @IsString()
  @prop({ required: true })
  description?: String;
  
  @ApiProperty()
  @prop({ required: true, default: false })
  is_user!: Boolean;
  
  @ApiProperty()
  @prop({ required: true, default: false })
  is_private!: Boolean;
  
  @ApiProperty()
  @prop({ ref: () => User, default: () => ([]) })
  users?: Ref<User>[];
  
  @ApiProperty()
  @prop({ ref: () => Message, default: () => ([]) })
  messages?: Ref<Message>[];
  
  @ApiProperty()
  @prop({ required: true, default: Date.now })
  created_at!: Date;
  
  @ApiProperty()
  @prop({ required: true, default: Date.now })
  updated_at!: Date;
}
