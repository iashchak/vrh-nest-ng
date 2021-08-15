import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class User {
  
  id!: ObjectId;
  _id!: ObjectId;

  @ApiProperty()
  @IsString()
  @prop({ required: true })
  name!: string;

  @ApiProperty()
  @IsString()
  @prop({ required: true, unique: true })
  username!: string;

  @ApiProperty()
  @IsString()
  @prop({ required: true, unique: true })
  email!: string;

  @ApiProperty()
  @prop({ required: true })
  admin!: boolean;

  @ApiProperty()
  @prop({ required: true, default: Date.now })
  created_at!: Date;

  @ApiProperty()
  @prop({ required: true, default: Date.now })
  updated_at!: Date;
}
