import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';
import { OneToMany } from 'typeorm';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { VideoSource } from './video-source.entity';

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
  @OneToMany(() => VideoSource, (videoSource: VideoSource) => videoSource.video)
  sources!: VideoSource[];

  @ApiProperty()
  @Column()
  release!: Date;
}
