import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Video } from './entities/video.entity';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [TypegooseModule.forFeature([Video])]
})
export class VideosModule {}
