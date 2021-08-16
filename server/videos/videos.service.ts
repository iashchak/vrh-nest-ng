import { Injectable } from '@nestjs/common';
import { MongooseCrudService } from 'server/mongoose-crud-service';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class VideosService extends MongooseCrudService<Video> {
  constructor(
    @InjectRepository(Video) protected readonly repo: MongoRepository<Video>
  ) {
    super(repo);
  }
}
