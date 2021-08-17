import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsUrl } from 'class-validator';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class VideoSource {
  @ObjectIdColumn()
  @Transform((value) => value.toString(), {
    toPlainOnly: true,
    toClassOnly: true,
  })
  _id!: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  size!: number;

  @ApiProperty()
  @IsString()
  @Column()
  src!: string;

  @ApiProperty()
  @Column()
  @ManyToOne(() => Video, (video: Video) => video.sources)
  video!: Video;
}
