import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToMany, ObjectIdColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from './message.entity';

@Entity()
export class Room {
  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: string;

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

  @ManyToMany(() => User, (user: User) => user.rooms)
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
