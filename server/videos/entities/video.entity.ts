import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

export interface VideoSource {
  size: number;
  src: string;
}

@Entity()
export class Video {
  @ObjectIdColumn()
  @Transform((value) => value.toString(), { toPlainOnly: true })
  _id!: string;

  @ApiProperty()
  @IsString()
  @Column()
  title!: string;

  @ApiProperty()
  @IsString()
  @Column()
  description!: string;

  @ApiProperty()
  @IsString()
  @Column()
  slug!: string;

  @ApiProperty()
  @IsUrl()
  @Column()
  preview!: string;

  @ApiProperty()
  @Column()
  sources!: VideoSource[];
}
