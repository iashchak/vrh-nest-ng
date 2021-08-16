import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Message } from 'server/rooms/entities/message.entity';
import { Room } from 'server/rooms/entities/room.entity';
import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {

  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: ObjectID;
  
  @ApiProperty()
  @IsString()
  @Column({})
  name!: string;

  @ApiProperty()
  @IsString()
  @Column({ unique: true })
  username!: string;

  @ApiProperty()
  @IsString()
  @Column({ unique: true })
  email!: string;

  @ApiProperty()
  @Column({})
  admin!: boolean;

  @ApiProperty()
  @Column({ default: Date.now })
  created_at!: Date;

  @ApiProperty()
  @Column({ default: Date.now })
  updated_at!: Date;

  @ApiProperty()
  @ManyToMany(() => Room, (room) => room.users)
  rooms?: Room[];

  @ApiProperty()
  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];
}
