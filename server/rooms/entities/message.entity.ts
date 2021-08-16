import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Room } from './room.entity';

@Entity()
export class Message {
  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: string;

  @ApiProperty()
  @IsString()
  @Column()
  message!: String;

  @ApiProperty()
  @ManyToOne(() => User, (user: User) => user.messages)
  user?: User;

  @ApiProperty()
  @OneToMany(() => Room, (room: User) => room.messages)
  room?: Room;

  @ApiProperty()
  @Column({ default: Date.now })
  created_at!: Date;

  @ApiProperty()
  @Column({ default: Date.now })
  updated_at!: Date;
}
