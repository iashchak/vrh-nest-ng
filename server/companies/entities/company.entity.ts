import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class Company {
  @IsString()
  @prop({ required: true })
  name!: string;
}
