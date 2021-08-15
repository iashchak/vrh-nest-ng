import { Controller } from '@nestjs/common';
import { Crud, CrudController, CrudService } from '@nestjsx/crud';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';

@Crud({
  model: {
    type: Video
  }
})
@Controller('videos')
export class VideosController implements CrudController<Video> {
  constructor(readonly service: VideosService) {}
}
