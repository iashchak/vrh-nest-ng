import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'server/users/entities/user.entity';
import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Room {

  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: ObjectID;
  
  @ApiProperty()
  @IsString()
  @Column()
  name!: String;

  @ApiProperty()
  @IsString()
  @Column()
  description?: String;

  @ApiProperty()
  @Column({ default: false })
  is_user!: Boolean;

  @ApiProperty()
  @Column({ default: false })
  is_private!: Boolean;

  @ManyToMany(() => User, (user) => user.rooms)
  users?: User;

  @ApiProperty()
  @OneToMany(() => Message, (message) => message.room)
  messages?: Message[];

  @ApiProperty()
  @Column({ default: Date.now })
  created_at!: Date;

  @ApiProperty()
  @Column({ default: Date.now })
  updated_at!: Date;
}
