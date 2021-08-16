import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'server/users/entities/user.entity';
import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Message {

  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: ObjectID;
  
  @ApiProperty()
  @IsString()
  @Column()
  message!: String;

  @ApiProperty()
  @ManyToOne((type) => User, (user) => user.messages)
  user?: User;

  @ApiProperty()
  @OneToMany((type) => Room, (room) => room.messages)
  room?: Room;

  @ApiProperty()
  @Column({ default: Date.now })
  created_at!: Date;

  @ApiProperty()
  @Column({ default: Date.now })
  updated_at!: Date;
}
