import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class Video {
  @ApiProperty()
  @IsString()
  @prop({ required: true })
  name!: string;
}
