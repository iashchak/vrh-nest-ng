import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { User } from 'server/users/entities/user.entity';

export class Message {

  id!: ObjectId;
  _id!: ObjectId;
  
  @ApiProperty()
  @IsString()
  @prop({ required: true })
  message!: String;

  @ApiProperty()
  @prop({ ref: () => User })
  user?: Ref<User>;

  @ApiProperty()
  @prop({ required: true })
  date!: Date;

  @ApiProperty()
  @prop({ required: true, default: Date.now })
  created_at!: Date;
  
  @ApiProperty()
  @prop({ required: true, default: Date.now })
  updated_at!: Date;
}
