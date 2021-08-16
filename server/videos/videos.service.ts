import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MongooseCrudService } from '../mongoose-crud-service';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService extends MongooseCrudService<Video> {
  constructor(
    @InjectRepository(Video) protected readonly repo: MongoRepository<Video>
  ) {
    super(repo);
  }
}
