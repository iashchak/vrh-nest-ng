import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Company {
  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: string;

  @ApiProperty()
  @IsString()
  @Column()
  name!: string;
}
