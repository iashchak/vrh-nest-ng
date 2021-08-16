import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Entity, Column, ObjectIdColumn, PrimaryColumn, ObjectID } from 'typeorm';

@Entity()
export class Company {

  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: ObjectID;
  
  @ApiProperty()
  @IsString()
  @Column()
  name!: string;
}
