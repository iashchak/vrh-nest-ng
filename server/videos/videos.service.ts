import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { MongooseCrudService } from 'server/mongoose-crud-service';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService extends MongooseCrudService<Video> {
  constructor(@InjectModel(Video) public model: ReturnModelType<typeof Video>) {
    super(model);
  }
}
